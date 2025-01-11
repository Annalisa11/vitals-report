export type VitalsType = {
  Timestamp: string;
  ValueInMgPerDl: number;
  TrendArrow: {
    value: number;
    icon: string;
    message: string;
  };
  Value: number;
  isHigh: boolean;
  isLow: boolean;
  guesses?: number;
};

export type GlucoseScore = {
  inRange: number;
  belowRange: number;
  aboveRange: number;
};

export type GlucoseScoreResult = {
  ranges: Range[];
  emoji: number;
};

type Range = {
  name: string;
  value: number;
};

export type User = {
  username: string;
  email?: string; //TODO: make email required, add id??
  rights: Right[];
};

export type Right = 'chart' | 'vitals-details' | 'create-account';
