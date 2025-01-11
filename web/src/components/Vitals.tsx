import '@styles/Vitals.scss';
import { VitalsType } from '@/App';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import localizedFormat from 'dayjs/plugin/localizedFormat'; // ES 2015
import GlucoseBox from './GlucoseBox';
import useAuth from '@hooks/useAuth';

dayjs.extend(localizedFormat);

interface Props {
  vitals: VitalsType;
  vitalsLoading: boolean;
}

const Vitals = ({ vitals, vitalsLoading }: Props) => {
  const { checkHasRight } = useAuth();

  const getAlarmMessage = () => {
    if (vitals.isHigh) {
      return '🚨 TOO HIGH 🚨';
    } else if (vitals.isLow) {
      return '🚑 TOO LOW 🚑';
    } else {
      return 'none... relax';
    }
  };

  return vitals && !vitalsLoading ? (
    <div className='vitals'>
      <h2>Your daily dose of David</h2>

      <div className='vitals__container'>
        <GlucoseBox ValueInMgPerDl={vitals.ValueInMgPerDl} />
        {checkHasRight('vitals-details') && (
          <div className='vitals__stats'>
            <p>
              <strong>Timestamp:</strong>
              {dayjs(vitals.Timestamp).format('L LT')}
            </p>
            <p>
              <strong>Trend Arrow:</strong>
              {`${vitals.TrendArrow.icon} ${vitals.TrendArrow.message}`}
            </p>
            <p>
              <strong>Alarm:</strong>
              {getAlarmMessage()}
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Vitals;
