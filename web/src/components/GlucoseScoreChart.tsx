import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { VitalsType } from '../App';
import { useHistory } from '../hooks/useHistory';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p: any;
  value: number;
}

export const CustomizedLabel = ({ p, value }: Props) => {
  return (
    <text
      x={p.x + p.width / 2}
      y={p.y + p.height / 2}
      dy={6}
      fontSize={16}
      fill='white'
      textAnchor='middle' // Ensuring text is centered
    >
      {value > 6 ? `${value.toString().split('.')[0]}%` : ''}
    </text>
  );
};

const GlucoseScoreChart = () => {
  const { data: history } = useHistory();
  const calculateGlucoseRanges = (data: VitalsType[] | undefined) => {
    if (!data) {
      return;
    }
    const totalEntries = data.length;
    const inRange = data.filter(
      (d) => d.ValueInMgPerDl >= 70 && d.ValueInMgPerDl <= 180
    ).length;
    const belowRange = data.filter((d) => d.ValueInMgPerDl < 70).length;
    const aboveRange = data.filter((d) => d.ValueInMgPerDl > 180).length;

    return [
      { name: 'In Range', value: (inRange / totalEntries) * 100 },
      { name: 'Below Range', value: (belowRange / totalEntries) * 100 },
      { name: 'Above Range', value: (aboveRange / totalEntries) * 100 },
    ];
  };

  const glucoseRanges = calculateGlucoseRanges(history);

  const legendFormatter = (value: string) => {
    switch (value) {
      case 'In Range':
        return '🥬 In Range';
      case 'Below Range':
        return '🐬 Below Range';
      case 'Above Range':
        return '✈️ Above Range';
      default:
        return value;
    }
  };

  const COLORS = ['#61bf93', 'dodgerblue', 'blue'];

  return (
    glucoseRanges && (
      <ResponsiveContainer width='100%' height={80}>
        <BarChart
          layout='vertical'
          data={[
            {
              ...glucoseRanges.reduce(
                (acc, range) => ({ ...acc, [range.name]: range.value }),
                {}
              ),
            },
          ]}
          margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
        >
          <XAxis type='number' hide />
          <YAxis type='category' dataKey='name' hide />
          <Legend iconSize={0} formatter={legendFormatter} spacing={10} />
          <Bar
            radius={
              glucoseRanges[1].value <= 6 && glucoseRanges[2].value <= 6
                ? 8
                : [8, 0, 0, 8]
            }
            dataKey='In Range'
            stackId='a'
            fill={COLORS[0]}
            label={(payload) => (
              <CustomizedLabel p={payload} value={glucoseRanges[0].value} />
            )}
          />
          <Bar
            dataKey='Below Range'
            stackId='a'
            fill={COLORS[1]}
            radius={glucoseRanges[2].value <= 6 ? [0, 8, 8, 0] : [1, 1, 1, 1]}
            label={(payload) => (
              <CustomizedLabel p={payload} value={glucoseRanges[1].value} />
            )}
          />
          <Bar
            dataKey='Above Range'
            stackId='a'
            fill={COLORS[2]}
            radius={[0, 8, 8, 0]}
            label={(payload) => (
              <CustomizedLabel p={payload} value={glucoseRanges[2].value} />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  );
};

export default GlucoseScoreChart;
