import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import hooks from '../hooks/useHistory';
import '../styles/GlucoseChart.scss';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p: any;
  value: number;
}

export const CustomizedLabel = ({ p, value }: Props) => {
  return (
    <text
      className='bar-chart-text'
      x={p.x + p.width / 2}
      y={p.y + p.height / 2}
      dy={6}
      fontSize={16}
      textAnchor='middle'
    >
      {value > 6 ? `${value.toString().split('.')[0]}%` : ''}
    </text>
  );
};

const GlucoseScoreChart = () => {
  const { useGlucoseScore } = hooks;

  const { data: data } = useGlucoseScore();
  const glucoseRanges = data?.ranges;
  if (!glucoseRanges || !data) {
    console.log('UNDEFINED ');
    return;
  }

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
          <Legend iconSize={0} spacing={10} />
          <Bar
            className='first'
            radius={
              glucoseRanges[1].value === 0 && glucoseRanges[2].value === 0
                ? 8
                : [8, 0, 0, 8]
            }
            dataKey='In Range'
            stackId='a'
            label={(payload) => (
              <CustomizedLabel p={payload} value={glucoseRanges[0].value} />
            )}
          />
          <Bar
            className='second'
            dataKey='Below Range'
            stackId='a'
            radius={glucoseRanges[2].value === 0 ? [0, 8, 8, 0] : [1, 1, 1, 1]}
            label={(payload) => (
              <CustomizedLabel p={payload} value={glucoseRanges[1].value} />
            )}
          />
          <Bar
            className='third'
            dataKey='Above Range'
            stackId='a'
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
