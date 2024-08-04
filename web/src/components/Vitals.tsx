import '../styles/Vitals.scss';
import { VitalsType } from '../App';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import localizedFormat from 'dayjs/plugin/localizedFormat'; // ES 2015
import { useAuth } from '../providers/AuthContext';

dayjs.extend(localizedFormat);

interface Props {
  vitals: VitalsType;
  vitalsLoading: boolean;
}

const Vitals = ({ vitals, vitalsLoading }: Props) => {
  const { checkPermission } = useAuth();

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
        <div className='vitals__glucose'>
          <p className='vitals__glucose-text'>
            {vitals.ValueInMgPerDl}
            <span className='vitals__glucose-unit'> mg/dL</span>
          </p>
        </div>
        {checkPermission('vitals-details') && (
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
