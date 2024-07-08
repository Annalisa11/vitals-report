import React from 'react';
import './App.scss';
import Vitals from './components/Vitals';
import Jokes from './components/Jokes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import dummyData from './assets/chart-data.json';

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
          <Jokes />
          huhu
          <ResponsiveContainer width={'100%'} height={300}>
            <AreaChart
              width={500}
              height={400}
              data={dummyData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey='Timestamp'
                domain={['auto', 'auto']}
                interval={'equidistantPreserveStart'}
                tickCount={10}
              />

              <YAxis domain={['dataMin - 30', 'dataMax + 30']} />
              <Tooltip />
              <Area
                type='monotone'
                dataKey='ValueInMgPerDl'
                stroke='#82ca9d'
                fillOpacity={1}
                fill='url(#colorUv)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;
