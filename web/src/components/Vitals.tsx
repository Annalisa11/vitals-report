/* eslint-disable no-empty-pattern */
import { useEffect } from 'react';
import '../styles/Vitals.scss';
import { useVitals } from '../hooks/useVitals';
import { useAIComment } from '../hooks/useAIComment';

interface Props {}

const Vitals = ({}: Props) => {
  const { data: vitals, isLoading: vitalsLoading } = useVitals();
  const {
    mutate: generateComment,
    data: sarcasticComment,
    isPending: commentLoading,
  } = useAIComment();

  useEffect(() => {
    if (vitals) {
      generateComment(vitals);
    }
  }, [vitals, generateComment]);

  const getTrendEmoji = (trendArrow: number) => {
    switch (trendArrow) {
      case 1:
        return '⬆️ Sky-high! Calm down, champ';
      case 2:
        return '⬇️ Nose dive! Oopsie daisy';
      case 3:
        return '➡️ Flatline. Yawn...';
      case 4:
        return '↗️ Slight bump. Almost trying';
      case 5:
        return '⤴️ On the up! Look at you go';
      default:
        return '🤷‍♂️ Who knows?';
    }
  };

  return vitals && !vitalsLoading ? (
    <div
      className={`reading ${
        vitals.isHigh ? 'red' : vitals.isLow ? 'blue' : 'green'
      }`}
    >
      <div className='stats-container'>
        <div className='glucose'>
          <p>
            {vitals.ValueInMgPerDl}
            <span> mg/dL</span>
          </p>
        </div>
        <div className='stats'>
          <p>
            <strong>Timestamp:</strong> {vitals.Timestamp}
          </p>
          <p>
            <strong>Trend:</strong>{' '}
            {vitals.TrendMessage || 'No significant change'}
          </p>
          <p>
            <strong>Glucose Units:</strong> {vitals.GlucoseUnits}
          </p>
          <p>
            <strong>Trend Arrow:</strong> {getTrendEmoji(vitals.TrendArrow)}
          </p>
        </div>
      </div>
      <div className='comment'>
        {commentLoading ? (
          <div className='loader'></div>
        ) : (
          <p>{sarcasticComment}</p>
        )}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Vitals;
