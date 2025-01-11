import '@styles/Vitals.scss';

interface Props {
  ValueInMgPerDl?: number;
}

const GlucoseBox = ({ ValueInMgPerDl }: Props) => {
  return (
    <div className='vitals__glucose'>
      <p className='vitals__glucose-text'>
        {ValueInMgPerDl ?? '???'}
        <span className='vitals__glucose-unit'> mg/dL</span>
      </p>
    </div>
  );
};

export default GlucoseBox;
