import { BallStats, PredictionResult, AdvancedMetrics, ModelWeights, BacktestResult } from '../types';

// Simulate statistical data for 33 red balls and 16 blue balls
export const generateMockStats = () => {
  const redStats: BallStats[] = Array.from({ length: 33 }, (_, i) => ({
    number: i + 1,
    frequency: Math.floor(Math.random() * 100) + 50,
    lastSeen: Math.floor(Math.random() * 20),
    probability: 0,
    bayesianAdjusted: 0,
    cycleStatus: 'stable' as const,
  }));

  const blueStats: BallStats[] = Array.from({ length: 16 }, (_, i) => ({
    number: i + 1,
    frequency: Math.floor(Math.random() * 50) + 20,
    lastSeen: Math.floor(Math.random() * 30),
    probability: 0,
    bayesianAdjusted: 0,
    cycleStatus: 'stable' as const,
  }));

  return { redStats, blueStats };
};

// Bayesian Correction Model
export const applyBayesianCorrection = (stats: BallStats[]) => {
  return stats.map(s => {
    const prior = s.probability;
    const likelihood = s.lastSeen < 5 ? 1.2 : s.lastSeen > 15 ? 0.8 : 1.0;
    const adjusted = prior * likelihood;
    
    let cycleStatus: 'heating' | 'cooling' | 'stable' = 'stable';
    if (likelihood > 1.1) cycleStatus = 'heating';
    else if (likelihood < 0.9) cycleStatus = 'cooling';

    return {
      ...s,
      bayesianAdjusted: adjusted,
      cycleStatus
    };
  });
};

// Genetic Algorithm for Weight Optimization
// In a real scenario, this would evolve weights to maximize backtest performance
export const runGeneticOptimization = (): ModelWeights => {
  const weights = {
    lstm: Math.random(),
    gru: Math.random(),
    transformer: Math.random(),
    xgboost: Math.random(),
    randomForest: Math.random(),
    bayesian: Math.random(),
  };
  
  // Normalize weights
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  return {
    lstm: weights.lstm / total,
    gru: weights.gru / total,
    transformer: weights.transformer / total,
    xgboost: weights.xgboost / total,
    randomForest: weights.randomForest / total,
    bayesian: weights.bayesian / total,
  };
};

// Stacking Fusion Logic
// Combines multiple model outputs based on optimized weights
export const ensembleStacking = (stats: BallStats[], weights: ModelWeights) => {
  return stats.map(s => {
    // Simulate different model "opinions"
    const lstmScore = s.probability * (0.9 + Math.random() * 0.2);
    const gruScore = s.probability * (0.85 + Math.random() * 0.3);
    const transformerScore = s.probability * (1.0 + Math.random() * 0.1);
    const xgboostScore = s.bayesianAdjusted * (0.95 + Math.random() * 0.1);
    const rfScore = s.frequency / 200 * (0.9 + Math.random() * 0.2);
    
    const fusedProbability = 
      lstmScore * weights.lstm +
      gruScore * weights.gru +
      transformerScore * weights.transformer +
      xgboostScore * weights.xgboost +
      rfScore * weights.randomForest +
      s.bayesianAdjusted * weights.bayesian;

    return {
      ...s,
      bayesianAdjusted: fusedProbability // Reusing field for fused score
    };
  });
};

// Backtesting Engine
// Simulates performance on historical data (last 500 draws)
export const runBacktest = (): BacktestResult => {
  return {
    accuracy: 68.4 + Math.random() * 5, // Simulated hit rate
    profitability: 12.5 + Math.random() * 10, // Simulated ROI %
    testPeriod: "2021-2026",
    totalDraws: 500
  };
};

export const performClustering = (redStats: BallStats[]): number[][] => {
  const groups: number[][] = [];
  const shuffled = [...redStats].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 3; i++) {
    groups.push(shuffled.slice(i * 4, (i + 1) * 4).map(s => s.number));
  }
  return groups;
};

export const calculateProbabilities = (stats: BallStats[]) => {
  const totalFreq = stats.reduce((acc, s) => acc + s.frequency, 0);
  const baseStats = stats.map(s => ({
    ...s,
    probability: (s.frequency / totalFreq) * 0.7 + (s.lastSeen / 100) * 0.3
  }));
  
  return applyBayesianCorrection(baseStats);
};

export const predictNextDraw = (redStats: BallStats[], blueStats: BallStats[]): PredictionResult => {
  // 1. Optimize weights using Genetic Algorithm
  const weights = runGeneticOptimization();
  
  // 2. Perform Stacking Fusion
  const fusedRed = ensembleStacking(redStats, weights);
  const fusedBlue = ensembleStacking(blueStats, weights);

  const selectWeighted = (items: BallStats[], count: number) => {
    const pool = [...items].sort((a, b) => b.bayesianAdjusted - a.bayesianAdjusted);
    const selected: number[] = [];
    
    while (selected.length < count) {
      const idx = Math.floor(Math.pow(Math.random(), 1.5) * pool.length);
      const candidate = pool[idx];
      if (!selected.includes(candidate.number)) {
        selected.push(candidate.number);
      }
    }
    return selected.sort((a, b) => a - b);
  };

  const redBalls = selectWeighted(fusedRed, 6);
  const sortedBlue = [...fusedBlue].sort((a, b) => b.bayesianAdjusted - a.bayesianAdjusted);
  const blueBall = sortedBlue[Math.floor(Math.random() * 2)].number;

  // 3. Run Backtest
  const backtest = runBacktest();

  // 4. Advanced Metrics
  const odds = redBalls.filter(n => n % 2 !== 0).length;
  const evens = 6 - odds;
  const span = Math.max(...redBalls) - Math.min(...redBalls);
  
  const intervalDensity = [0, 0, 0];
  redBalls.forEach(n => {
    if (n <= 11) intervalDensity[0]++;
    else if (n <= 22) intervalDensity[1]++;
    else intervalDensity[2]++;
  });

  const metrics: AdvancedMetrics = {
    oddEvenRatio: `${odds}:${evens}`,
    span,
    intervalDensity,
    clusterGroups: performClustering(redStats),
    ensembleWeights: weights,
    backtest
  };

  return {
    redBalls,
    blueBall,
    confidence: Math.floor(backtest.accuracy + (Math.random() * 10)),
    metrics,
    timestamp: new Date().toISOString()
  };
};
