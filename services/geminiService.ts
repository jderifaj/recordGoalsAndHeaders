
import { GoogleGenAI } from "@google/genai";
import { Session, DrillType } from "../types";

export const getCoachAnalysis = async (session: Session, userName: string, age: number): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const drillStats = session.reps.map(r => {
    if (r.drillType === DrillType.SHOOTING) {
      return `- Shooting (${r.exerciseName}): ${r.shotsMade}/${r.shotsTaken} goals to ${r.targetArea}`;
    } else {
      return `- Header (${r.exerciseName}): ${r.shotsMade}/${r.shotsTaken} successful clearances, Longest: ${r.distance || 'N/A'} ft`;
    }
  }).join('\n');

  const ageContext = age > 0 ? `The athlete is ${age} years old.` : 'Age unknown.';
  const nameContext = userName ? `The athlete's name is ${userName}.` : 'The athlete';

  const prompt = `
    As a world-class youth soccer coach, analyze this training session data for ${nameContext}.
    ${ageContext}
    
    Session Date: ${session.date}
    Location: ${session.location}
    Exercises Recorded:
    ${drillStats}
    
    INSTRUCTIONS:
    1. Be highly encouraging and positive. Use ${userName || 'the athlete'}'s name in the feedback.
    2. Provide feedback that is appropriate for their age (don't be overly critical of children, be more technical for adults).
    3. Evaluate if their scores are "good" relative to their age and session type.
    4. Provide 1 actionable tip that makes them want to come back and beat their score.
    5. Keep it to a maximum of 3-4 sentences. 
    6. Ensure the tone makes them feel like a champion in the making.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 250,
      }
    });
    return response.text || "Keep working hard on the pitch!";
  } catch (error) {
    console.error("Coach Analysis Error:", error);
    return `Great effort today${userName ? ', ' + userName : ''}! Your dedication is showing. Focus on your follow-through and you'll be hitting top bins in no time!`;
  }
};
