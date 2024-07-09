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

dayjs.extend(isYesterday);
/* eslint-disable @typescript-eslint/no-explicit-any */
dayjs.extend(isToday);
import 'dayjs/locale/zh-cn'; // import locale
import isToday from 'dayjs/plugin/isToday'; // ES 2015
import isYesterday from 'dayjs/plugin/isYesterday'; // ES 2015
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);
dayjs.locale('de-de'); // use locale

const GlucoseChart = () => {
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
  );
};

export default GlucoseChart;
