export interface BallStats {
  number: number;
  frequency: number;
  lastSeen: number;
  probability: number;
  bayesianAdjusted: number;
  cycleStatus: 'heating' | 'cooling' | 'stable';
}

export interface ModelWeights {
  lstm: number;
  gru: number;
  transformer: number;
  xgboost: number;
  randomForest: number;
  bayesian: number;
}

export interface BacktestResult {
  accuracy: number; // Percentage of hits (at least 1 ball)
  profitability: number; // Simulated ROI
  testPeriod: string;
  totalDraws: number;
}

export interface AdvancedMetrics {
  oddEvenRatio: string;
  bigSmallRatio: string;
  span: number;
  sumTrend: number;
  intervalDensity: number[];
  clusterGroups: number[][];
  ensembleWeights: ModelWeights;
  backtest: BacktestResult;
}

export interface PredictionResult {
  redBalls: number[];
  blueBall: number;
  confidence: number;
  metrics: AdvancedMetrics;
  timestamp: string;
}

export interface LotteryData {
  redStats: BallStats[];
  blueStats: BallStats[];
  recentDraws: {
    red: number[];
    blue: number;
    date: string;
  }[];
}
