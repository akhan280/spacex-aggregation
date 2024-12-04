export interface Launch {
  name: string;
  date: string;
  rocket: string;
}

export interface LaunchBreakdown {
  name: string;
  count: number;
}

export interface LaunchStats {
  year: number;
  completed: Launch[];
  upcoming: Launch[];
  breakdown: {
    [key: string]: LaunchBreakdown;
  };
} 