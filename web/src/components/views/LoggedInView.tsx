import Vitals from '@components/Vitals';
import GlucoseChart from '@components/GlucoseChart';
import Accordion from '@components/Accordion';
import GlucoseScoreChart from '@components/GlucoseScoreChart';
import ScoreEmoji from '@components/ScoreEmoji';
import AiComment from '@components/AiComment';
import Jokes from '@components/Jokes';
import { useVitals } from '@hooks/useVitals';
import useAuth from '@hooks/useAuth';
import { useState } from 'react';

const LoggedInView = () => {
  const { data: vitals, isLoading: vitalsLoading } = useVitals(true);
  const { checkHasRight } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <main>
      {vitals ? (
        <Vitals vitals={vitals} vitalsLoading={vitalsLoading} />
      ) : (
        <div>data not available right now :(</div>
      )}
      {checkHasRight('chart') && (
        <div className='glucose-score'>
          <GlucoseChart checked={isChecked} toggleSwitch={setIsChecked} />
          <Accordion isOpen={isChecked}>
            <div className='chart-details'>
              <GlucoseScoreChart />
              <ScoreEmoji />
            </div>
          </Accordion>
          <AiComment vitals={vitals} />
        </div>
      )}
      <Jokes />
    </main>
  );
};

export default LoggedInView;
