import React from 'react';
import './App.scss';
import Vitals from './components/Vitals';
import Jokes from './components/Jokes';
import GlucoseChart from './components/GlucoseChart';
import { useVitals } from './hooks/useVitals';
import AiComment from './components/AiComment';

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

const App: React.FC = () => {
  const { data: vitals, isLoading: vitalsLoading } = useVitals();

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Best Report EVER</h1>
        <h2>Your daily dose of David</h2>
      </header>
      <main>
        <Vitals vitals={vitals} vitalsLoading={vitalsLoading} />
        <GlucoseChart />
        <AiComment vitals={vitals} />
        <Jokes />
      </main>
    </div>
  );
};

export default App;
