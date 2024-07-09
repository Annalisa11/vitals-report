import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import 'dayjs/locale/de';
import dummyData from '../assets/chart-data.json';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale('de');

type ChartPayload = {
  coordinate: number;
  index: number;
  offset: number;
  value: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */

type ChartData = {
  Timestamp: string;
  ValueInMgPerDl: number;
};

const renderTick = (x: number, y: number, date: string, time: string) => {
  return (
    <foreignObject
      x={x}
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
  const lastCoordinate = payload.coordinate;
  const date = dayjs(payload.value);
  const formattedDate = date.isToday()
    ? 'today'
    : date.isYesterday()
    ? 'yesterday'
    : date.format('D.M');
  const formattedTime = date.format('HH:mm');

  const newX = index === visibleTicksCount - 1 ? lastCoordinate - 44 : x - 22;

  return renderTick(newX, y, formattedDate, formattedTime);
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean | undefined;
  payload: any;
}) => {
  if (active && payload && payload.length) {
    console.log('tooltip payload', payload);
    const time = dayjs(payload[0].payload.Timestamp);
    const date = dayjs(payload[0].payload.Timestamp);

    return (
      <div className='custom-tooltip'>
        <div>
          <small className='chart__date'>{date.format('D.M')}</small>
          <span className='chart__label-x'>{time.format('HH:mm')}</span>
        </div>
        <p className='value'>{payload[0].value} mg/dL</p>
      </div>
    );
  }
  return null;
};

const findClosestDateToToday = (data: ChartData[]) => {
  const todayStart = dayjs().startOf('day');
  const todaysDates = data.filter((item) =>
    dayjs(item.Timestamp).isSame(todayStart, 'day')
  );

  if (todaysDates.length === 0) return undefined;

  const closest = todaysDates.sort((a, b) =>
    dayjs(a.Timestamp).isAfter(b.Timestamp) ? 1 : -1
  );
  return closest[0].Timestamp;
};

const GlucoseChart: React.FC = () => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart
        data={dummyData}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='Timestamp' tick={formatTimestamp} />
        <YAxis
          domain={['dataMin - 30', 'dataMax + 30']}
          mirror
          tickLine={false}
          axisLine={false}
          tickFormatter={(tick, index) => (index !== 0 ? tick : '')}
        />
        <Tooltip
          content={({ active, payload }) => (
            <CustomTooltip active={active} payload={payload} />
          )}
        />
        <ReferenceLine
          x={findClosestDateToToday(dummyData)}
          stroke='purple'
          label={{ value: 'TODAY', fill: 'purple' }}
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
  );
};

export default GlucoseChart;
