
export enum ShotTarget {
  TOP_LEFT = 'Top Left',
  TOP_RIGHT = 'Top Right',
  BOTTOM_LEFT = 'Bottom Left',
  BOTTOM_RIGHT = 'Bottom Right',
  CENTER = 'Center',
  CROSSBAR = 'Crossbar',
  POST = 'Post'
}

export enum DrillType {
  SHOOTING = 'Shooting',
  HEADER = 'Header'
}

export interface Rep {
  id: string;
  drillType: DrillType;
  exerciseName: string;
  // Shared fields (repurposed for Header)
  shotsTaken?: number; // Attempts
  shotsMade?: number;  // Successful Clearances
  distance?: number;   // Longest Clearance in Feet
  // Shooting specific
  targetArea?: ShotTarget;
  // Legacy
  clearedDefensiveThird?: boolean;
  timestamp: number;
}

export interface Session {
  id: string;
  date: string;
  location: string;
  reps: Rep[];
  notes?: string;
}

export interface UserSettings {
  appTitle: string;
  profileImage: string | null;
  appIcon: string | null;
  themeColor: string;
  profileZoom: number;
  userName: string;
  birthDate: string;
}

export interface AppState {
  sessions: Session[];
  activeSessionId: string | null;
  settings: UserSettings;
}
