import React from 'react';
import './App.scss';
import Vitals from './components/Vitals';
import Jokes from './components/Jokes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlucoseChart from './components/GlucoseChart';

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

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='app'>
        <header className='app-header'>
          <h1>Best Report EVER</h1>
          <h2>Your daily dose of David</h2>
        </header>
        <main>
          <Vitals />
          <GlucoseChart />
          <Jokes />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;
