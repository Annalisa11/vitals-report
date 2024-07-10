/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { useEffect } from 'react';
import '../styles/Vitals.scss';
import { useVitals } from '../hooks/useVitals';
import { useAIComment } from '../hooks/useAIComment';
import { VitalsType } from '../App';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import localizedFormat from 'dayjs/plugin/localizedFormat'; // ES 2015

dayjs.extend(localizedFormat);

interface Props {
  vitals: VitalsType | undefined;
  vitalsLoading: boolean;
}

const Vitals = ({ vitals, vitalsLoading }: Props) => {
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
            <strong>Timestamp:</strong>
            {dayjs(vitals.Timestamp).format('L LT')}
          </p>
          <p>
            <strong>Trend:</strong>
            {vitals.TrendMessage || 'No significant change'}
          </p>
          <p>
            <strong>Glucose Units:</strong>
            {vitals.GlucoseUnits}
          </p>
          <p>
            <strong>Trend Arrow:</strong>
            <div>{getTrendEmoji(vitals.TrendArrow)}</div>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Vitals;
