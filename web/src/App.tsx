import React from 'react';
import './App.scss';
import Vitals from './components/Vitals';
import Jokes from './components/Jokes';
import GlucoseChart from './components/GlucoseChart';
import { useVitals } from './hooks/useVitals';
import AiComment from './components/AiComment';
import GlucoseScoreChart from './components/GlucoseScoreChart';
import { useGlucoseScore } from './hooks/useAIComment';

export type VitalsType = {
  FactoryTimestamp: string;
  Timestamp: string;
  type: number;
  ValueInMgPerDl: number;
  TrendArrow: number;
  TrendMessage: string | null;
  MeasurementColor: number;
  GlucoseUnits: number;
  Value: number;
  isHigh: boolean;
  isLow: boolean;
};

export type GlucoseScore = {
  inRange: number;
  belowRange: number;
  aboveRange: number;
};

const App: React.FC = () => {
  const { data: vitals, isLoading: vitalsLoading } = useVitals();
  const { mutate: mutateGlucoseScore, data: glucoseScoreComment } =
    useGlucoseScore();

  const getGlucoseScore = () => {
    mutateGlucoseScore({ inRange: 20, belowRange: 40, aboveRange: 20 });
  };

  return (
    <div className='app'>
      <header className='app__header'>
        <h1>Best Report EVER</h1>
        <h2>Your daily dose of David</h2>
      </header>
      <main>
        <Vitals vitals={vitals} vitalsLoading={vitalsLoading} />
        <GlucoseChart />
        <div className='glucose-score'>
          <GlucoseScoreChart />
          <button onClick={getGlucoseScore}>get score</button>
          <div>{glucoseScoreComment}</div>
        </div>
        <AiComment vitals={vitals} />
        <Jokes />
      </main>
    </div>
  );
};

export default App;
