import React, { useState, useEffect } from 'react';
import { Session, Rep, ShotTarget, DrillType, UserSettings } from './types';
import { getCoachAnalysis } from './services/geminiService';

// Extracted Components
import AppHeader from './components/Layout/AppHeader';
import AppNavigation from './components/Layout/AppNavigation';
import DashboardView from './components/Dashboard/DashboardView';
import NewSessionView from './components/Session/NewSessionView';
import DetailView from './components/Session/DetailView';
import SettingsView from './components/Settings/SettingsView';

const QUOTES = [
  "Hustle and heart set us apart.",
  "Win the day.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Everything is practice. — Pelé",
  "Play with passion. Play to win.",
  "Don’t stop until you’re proud.",
  "Dreams don't work unless you do.",
  "Make each day your masterpiece. — John Wooden",
  "Be so good they can’t ignore you.",
  "Pressure is a privilege. — Billie Jean King",
  "Success is no accident. — Pelé",
  "Leave it all on the pitch.",
  "First to the ball, first to the goal.",
  "Great goals start with great passes.",
  "Play for the name on the front of the jersey.",
  "One goal at a time.",
  "Better every day. Stronger every play.",
  "Soccer is played with your head and your legs.",
  "Believe in the team. Believe in yourself.",
  "Your only limit is you.",
  "Failure is fuel.",
  "Train like a challenger. Play like a champion.",
  "Consistency is key.",
  "Champions keep playing until they get it right. — Billie Jean King",
  "Effort is between you and you.",
  "Don't count the days, make the days count. — Muhammad Ali",
  "The harder the battle, the sweeter the victory.",
  "Go for the goal.",
  "Small steps, big results.",
  "Eyes up. Heart open. Game on."
];

const App: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('striker_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('striker_settings');
    const defaults = {
      appTitle: 'StrikerStats',
      profileImage: null,
      appIcon: null,
      themeColor: '#10b981',
      profileZoom: 1,
      userName: '',
      birthDate: ''
    };
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  });
  
  const [view, setView] = useState<'dashboard' | 'new-session' | 'session-detail' | 'settings'>('dashboard');
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [isCoachAnalyzing, setIsCoachAnalyzing] = useState(false);
  const [coachFeedback, setCoachFeedback] = useState<string | null>(null);

  const [draftRep, setDraftRep] = useState({
    editingId: null as string | null,
    drillType: DrillType.SHOOTING,
    exerciseName: 'Shooting Drill',
    target: ShotTarget.BOTTOM_RIGHT,
    attempts: 10,
    successes: 5,
    distance: '',
    foot: 'R' as 'R' | 'L'
  });

  useEffect(() => {
    localStorage.setItem('striker_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('striker_settings', JSON.stringify(settings));
    document.title = settings.appTitle;
    document.documentElement.style.setProperty('--theme-color', settings.themeColor);
  }, [settings]);

  const calculateAge = (birthday: string) => {
    if (!birthday) return 0;
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const resetDrillForm = (type?: DrillType) => {
    setDraftRep(prev => {
      const targetType = type || prev.drillType;
      return {
        ...prev,
        editingId: null,
        drillType: targetType,
        exerciseName: targetType === prev.drillType ? prev.exerciseName : (targetType === DrillType.SHOOTING ? 'Shooting Drill' : 'Header Practice'),
        target: prev.target,
        foot: prev.foot,
        successes: 5, 
        distance: '',
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'icon') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setSettings(prev => ({
        ...prev,
        [type === 'profile' ? 'profileImage' : 'appIcon']: base64String,
        ...(type === 'profile' ? { profileZoom: 1 } : {})
      }));
    };
    reader.readAsDataURL(file);
  };

  const createNewSession = () => {
    const newSession: Session = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      location: '',
      reps: []
    };
    
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setActiveQuote(randomQuote);
    setActiveSession(newSession);
    setView('new-session');
    setDraftRep({
      editingId: null,
      drillType: DrillType.SHOOTING,
      exerciseName: 'Shooting Drill',
      target: ShotTarget.BOTTOM_RIGHT,
      attempts: 10,
      successes: 5,
      distance: '',
      foot: 'R'
    });
  };

  const addOrUpdateRep = () => {
    if (!activeSession) return;
    const newRep: Rep = {
      id: draftRep.editingId || crypto.randomUUID(),
      drillType: draftRep.drillType,
      exerciseName: draftRep.exerciseName.trim() || (draftRep.drillType === DrillType.SHOOTING ? 'Shooting Drill' : 'Header Practice'),
      timestamp: Date.now(),
      shotsTaken: Math.max(1, draftRep.attempts),
      shotsMade: Math.min(Math.max(0, draftRep.successes), draftRep.attempts),
      distance: draftRep.distance ? Number(draftRep.distance) : undefined,
      ...(draftRep.drillType === DrillType.SHOOTING ? { targetArea: draftRep.target, foot: draftRep.foot } : {})
    };
    let updatedReps = draftRep.editingId 
      ? activeSession.reps.map(r => r.id === draftRep.editingId ? newRep : r)
      : [...activeSession.reps, newRep];
    setActiveSession({ ...activeSession, reps: updatedReps });
    resetDrillForm();
  };

  const editRep = (rep: Rep) => {
    setDraftRep({
      editingId: rep.id,
      drillType: rep.drillType,
      exerciseName: rep.exerciseName,
      attempts: rep.shotsTaken || 0,
      successes: rep.shotsMade || 0,
      distance: rep.distance?.toString() || '',
      target: rep.targetArea || ShotTarget.BOTTOM_RIGHT,
      foot: rep.foot || 'R'
    });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const analyzeSession = async (session: Session) => {
    if (!session) return;
    setIsCoachAnalyzing(true);
    try {
      const age = calculateAge(settings.birthDate);
      const feedback = await getCoachAnalysis(session, settings.userName, age);
      setCoachFeedback(feedback);
    } catch (error) {
      setCoachFeedback("Coach is offline. Keep grinding!");
    } finally {
      setIsCoachAnalyzing(false);
    }
  };

  const calculateSessionStats = (reps: Rep[]) => {
    if (reps.length === 0) return { totalTaken: 0, totalMade: 0, percentage: 0 };
    const shootingReps = reps.filter(r => r.drillType === DrillType.SHOOTING);
    if (shootingReps.length === 0) return { totalTaken: 0, totalMade: 0, percentage: 0 };
    const totalTaken = shootingReps.reduce((sum, r) => sum + (r.shotsTaken || 0), 0);
    const totalMade = shootingReps.reduce((sum, r) => sum + (r.shotsMade || 0), 0);
    return {
      totalTaken,
      totalMade,
      percentage: totalTaken > 0 ? ((totalMade / totalTaken) * 100).toFixed(1) : 0
    };
  };

  const handleShare = (session: Session) => {
    const headers = ["Date", "Location", "Drill", "Foot", "Attempts", "Success", "Accuracy (%)", "Longest(ft)"];
    const rows = session.reps.map(r => {
      const accuracy = (r.shotsTaken && r.shotsTaken > 0) 
        ? ((r.shotsMade || 0) / r.shotsTaken * 100).toFixed(1) 
        : "0.0";
      
      return [
        session.date, 
        session.location, 
        r.exerciseName, 
        r.foot || "", 
        r.shotsTaken, 
        r.shotsMade, 
        accuracy,
        r.distance || ""
      ].join(",");
    });
    
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; 
    a.download = `${settings.appTitle}_${session.date}.csv`; 
    a.click();
  };

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col relative border-x border-slate-200/20">
      <style>{`:root { --theme-color: ${settings.themeColor}; } .bg-theme { background-color: var(--theme-color); } .text-theme { color: var(--theme-color); } .btn-theme { background-color: var(--theme-color); color: white; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); } .btn-theme:active { transform: scale(0.96); box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.1); }`}</style>

      <AppHeader 
        view={view} 
        onBack={() => { setView('dashboard'); setActiveQuote(null); }} 
        onSettings={() => setView('settings')}
        settings={settings}
        activeQuote={activeQuote}
      />

      <main className="flex-1 overflow-y-auto pb-40">
        {view === 'dashboard' && (
          <DashboardView 
            sessions={sessions} 
            onCreateSession={createNewSession}
            onSelectSession={(s) => { setActiveSession(s); setView('session-detail'); setCoachFeedback(null); setActiveQuote(null); }}
            calculateSessionStats={calculateSessionStats}
          />
        )}

        {view === 'new-session' && activeSession && (
          <NewSessionView 
            activeSession={activeSession}
            setActiveSession={setActiveSession}
            draft={draftRep}
            setDraft={(update) => setDraftRep(prev => ({ ...prev, ...update }))}
            onAddRep={addOrUpdateRep}
            onEditRep={editRep}
            onDeleteRep={(id) => setActiveSession({...activeSession, reps: activeSession.reps.filter(r => r.id !== id)})}
            onCancelEdit={() => resetDrillForm()}
            onComplete={() => { setSessions(prev => [activeSession, ...prev]); setView('dashboard'); setActiveSession(null); setActiveQuote(null); }}
          />
        )}

        {view === 'session-detail' && activeSession && (
          <DetailView 
            session={activeSession}
            isCoachAnalyzing={isCoachAnalyzing}
            coachFeedback={coachFeedback}
            onAnalyze={() => analyzeSession(activeSession)}
            onShare={() => handleShare(activeSession)}
            onDelete={() => { if(confirm("Delete?")) { setSessions(prev => prev.filter(s => s.id !== activeSession.id)); setView('dashboard'); } }}
            calculateSessionStats={calculateSessionStats}
          />
        )}

        {view === 'settings' && (
          <SettingsView 
            settings={settings} setSettings={setSettings}
            calculateAge={calculateAge}
            onImageUpload={handleImageUpload}
            onSave={() => setView('dashboard')}
          />
        )}
      </main>

      <AppNavigation 
        activeView={view} 
        onNavigate={setView} 
        onCreateSession={createNewSession} 
      />
    </div>
  );
};

export default App;
