import React from 'react';
import './App.scss';
import Vitals from './components/Vitals';
import Jokes from './components/Jokes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dummyData from './assets/chart-data.json';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday'; // ES 2015
import isYesterday from 'dayjs/plugin/isYesterday'; // ES 2015
import '@mantine/core/styles.css';
dayjs.extend(isYesterday);
/* eslint-disable @typescript-eslint/no-explicit-any */
dayjs.extend(isToday);
import 'dayjs/locale/zh-cn'; // import locale

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
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

export type Test = {
  Timestamp: string;
  valueInMgPerDl: number;
};

dayjs.extend(customParseFormat);
dayjs.locale('de-de'); // use locale
const queryClient = new QueryClient();

const App: React.FC = () => {
  const dateTick = (
    v: number,
    c: number,
    i: number,
    x: number,
    y: number,
    date: string,
    time: string
  ) => {
    let newX;
    if (i === v - 1) {
      newX = c - 44;
    } else {
      newX = x - 22;
    }
    return (
      <foreignObject
        x={newX}
        y={y + 4}
        width={44}
        height={44}
        viewBox='0 0 1024 1024'
        fill='#666'
      >
        <div data-xmlns='http://www.w3.org/1999/xhtml'>
          <span className='chart__label-x'>{time}</span>
          <small className='chart__date'>{date}</small>
        </div>
      </foreignObject>
    );
  };

  type ChartPayload = {
    coordinate: number;
    index: number;
    offset: number;
    value: string;
  };

  const formatTimestamp = ({
    visibleTicksCount,
    index,
    x,
    y,
    payload,
  }: {
    visibleTicksCount: number;
    index: number;
    x: number;
    y: number;
    payload: ChartPayload;
  }) => {
    const date = dayjs(payload.value);
    const coordinate = payload.coordinate;

    if (date.isToday()) {
      return dateTick(
        visibleTicksCount,
        coordinate,
        index,
        x,
        y,
        'today',
        date.format('HH:mm')
      );
    } else if (date.isYesterday()) {
      return dateTick(
        visibleTicksCount,
        coordinate,
        index,
        x,
        y,
        'yesterday',
        date.format('HH:mm')
      );
    } else {
      return dateTick(
        visibleTicksCount,
        coordinate,
        index,
        x,
        y,
        date.format('D.M'),
        date.format('HH:mm')
      );
    }
  };

  // className: "recharts-xAxis xAxis"
  // fill: "#666"
  // height: 30
  // index: 0
  // orientation: "bottom"
  // payload: Object { coordinate: 173.1818181818182, value: "2024-07-04T13:00:00Z", index: 3, … }
  // stroke: "none"
  // textAnchor: "middle"
  // tickFormatter: undefined
  // verticalAnchor: "start"
  // visibleTicksCount: 3
  // width: 635
  // x: 173.1818181818182
  // y: 278

  const CustomTooltip = ({
    active,
    a,
  }: {
    active: any;
    a: any;
    label: any;
  }) => {
    if (active && a && a.length) {
      const time = dayjs(a[0].payload.Timestamp);
      const date = dayjs(a[0].payload.Timestamp);
      return (
        <div className='custom-tooltip'>
          <div>
            <small className='chart__date'>{date.format('D.M')}</small>
            <span className='chart__label-x'>{time.format('HH:mm')}</span>
          </div>
          <p className='value'>{a[0].value} mg/dL</p>
        </div>
      );
    }

    return null;
  };

  type ChartData = {
    Timestamp: string;
    ValueInMgPerDl: number;
  };

  const findClosestDateToToday = (data: ChartData[]) => {
    const todayStart = dayjs().startOf('day');
    console.log('today', todayStart);

    // Filter dates that are from today
    const todaysDates = data.filter((item) =>
      dayjs(item.Timestamp).isSame(todayStart, 'day')
    );

    console.log('filtered', todaysDates);

    if (todaysDates.length === 0) return undefined;

    // Find the closest date from today
    const closest: ChartData[] = todaysDates.sort((a, b) => {
      return Date.parse(a.Timestamp) > Date.parse(b.Timestamp) ? 1 : 0;
    });

    console.log('closest', closest);
    console.warn('clossssse', closest[0]);
    return closest[0].Timestamp;
  };
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
              data={dummyData}
              margin={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey='Timestamp' tick={(a) => formatTimestamp(a)} />

              <YAxis
                domain={['dataMin - 30', 'dataMax + 30']}
                mirror
                tickLine={false}
                axisLine={false}
                tickFormatter={(tick, index) => (index !== 0 ? tick : '')}
              />
              <Tooltip
                content={({ active, label, payload }) => (
                  <CustomTooltip a={payload} active={active} label={label} />
                )}
              />
              <ReferenceLine
                x={findClosestDateToToday(dummyData)}
                stroke='purple'
                label={{
                  value: 'TODAY',
                  fill: 'purple',
                }}
                strokeOpacity={0.5}
                fill='purple'
              />
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
