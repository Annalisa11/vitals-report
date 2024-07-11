/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import isBetween from 'dayjs/plugin/isBetween';
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
  ReferenceArea,
} from 'recharts';
import { useHistory } from '../hooks/useHistory.ts';
import '../styles/GlucoseChart.scss';
import { VitalsType } from '../App.tsx';
import NightLogo from '../assets/moon.svg?react';

dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isBetween);
dayjs.locale('de');

const GlucoseChart: React.FC = () => {
  type ChartPayload = {
    coordinate: number;
    index: number;
    offset: number;
    value: string;
  };

  type ChartData = {
    Timestamp: string;
    ValueInMgPerDl: number;
  };

  const NIGHT_START_HOUR = 23;
  const NIGHT_END_HOUR = 6;
  const { data: history } = useHistory();
  const showExtraChartContent = true;
  const data = history;

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
          <span className='tick__time'>{time}</span>
          <small className='tick__date'>{date}</small>
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
    /* eslint-disable @typescript-eslint/no-explicit-any */
    payload: any;
  }) => {
    if (active && payload && payload.length) {
      const time = dayjs(payload[0].payload.Timestamp);
      const date = dayjs(payload[0].payload.Timestamp);

      return (
        <div className='custom-tooltip'>
          <div className='custom-tooltip__label'>{time.format('HH:mm')}</div>
          <div className='custom-tooltip__value'>
            {payload[0].value} <small>mg/dL</small>
          </div>
        </div>
      );
    }
    return null;
  };

  const findClosestDateToToday = (
    data: VitalsType[] | ChartData[] | undefined
  ) => {
    if (!data) {
      return;
    }
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

  const findNightTime = (
    data: VitalsType[] | ChartData[] | undefined,
    instance: 'first' | 'last'
  ) => {
    if (!data) {
      return;
    }
    const todayStart = dayjs().startOf('day');
    const todayNightStart = todayStart.set('hour', NIGHT_START_HOUR);
    const todayNightEnd = todayStart.add(1, 'day').set('hour', NIGHT_END_HOUR);

    const yesterdayNightStart = todayStart
      .subtract(1, 'day')
      .set('hour', NIGHT_START_HOUR);
    const yesterdayNightEnd = todayStart.set('hour', NIGHT_END_HOUR);

    const nightDates = data.filter((date) => {
      const currentDate = dayjs(date.Timestamp);
      return (
        currentDate.isBetween(todayNightStart, todayNightEnd, null, '[]') ||
        currentDate.isBetween(
          yesterdayNightStart,
          yesterdayNightEnd,
          null,
          '[]'
        )
      );
    });

    if (nightDates.length === 0) {
      return undefined;
    }

    const first = nightDates[0].Timestamp;
    const last = nightDates[nightDates.length - 1].Timestamp;
    return instance === 'first' ? first : last;
  };

  return (
    <div className='glucose-chart'>
      <h2>Last 12h of David</h2>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart
          data={data}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='Timestamp'
            tickFormatter={(value) => dayjs(value).format('HH:mm')}
            minTickGap={60}
          />
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
          <ReferenceLine y={80} stroke='lightgrey' strokeOpacity={0.5} />
          <ReferenceLine y={130} stroke='lightgrey' strokeOpacity={0.5} />

          {showExtraChartContent && (
            <>
              <ReferenceLine
                x={findClosestDateToToday(data)}
                stroke='lightblue'
                label={{ value: 'TODAY', fill: 'dodgerblue' }}
              />
              <ReferenceArea
                ifOverflow='visible'
                x1={findNightTime(data, 'first')}
                x2={findNightTime(data, 'last')}
                stroke='blue'
                strokeOpacity={0.2}
                fillOpacity={0.2}
                label={(a) => (
                  <NightLogo
                    width={24}
                    height={24}
                    fill='blue'
                    fillOpacity={0.3}
                    x={a.viewBox.x + (a.viewBox.width - 24) / 2}
                    y={a.viewBox.y + 10}
                  />
                )}
              />
            </>
          )}

          <Area
            type='monotone'
            dataKey='ValueInMgPerDl'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GlucoseChart;
