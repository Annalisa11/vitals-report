import React, { useState } from 'react';
import './App.scss';
import Vitals from './components/Vitals';
import Jokes from './components/Jokes';
import GlucoseChart from './components/GlucoseChart';
import { useVitals } from './hooks/useVitals';
import AiComment from './components/AiComment';
import GlucoseScoreChart from './components/GlucoseScoreChart';
import { useGlucoseScore } from './hooks/useAIComment';
import Accordion from './components/Accordion';

export type VitalsType = {
  Timestamp: string;
  ValueInMgPerDl: number;
  TrendArrow: {
    value: number;
    icon: string;
    message: string;
  };
  Value: number;
  isHigh: boolean;
  isLow: boolean;
};

export type GlucoseScore = {
  inRange: number;
  belowRange: number;
  aboveRange: number;
};

const App: React.FC = () => {
  const { data: vitals, isLoading: vitalsLoading } = useVitals();
  const { mutate: mutateGlucoseScore, data: glucoseScoreComment } =
    useGlucoseScore();

  const getGlucoseScore = () => {
    mutateGlucoseScore({ inRange: 20, belowRange: 40, aboveRange: 20 });
  };

  const [isChecked, setIsChecked] = useState(false);

  const showButton = false;
  return (
    <div className='app'>
      <header className='app__header'>
        <h1>Best Report EVER</h1>
        <h2>Your daily dose of David</h2>
      </header>
      <main>
        <Vitals vitals={vitals} vitalsLoading={vitalsLoading} />
        <div className='glucose-score'>
          <GlucoseChart checked={isChecked} toggleSwitch={setIsChecked} />
          <Accordion
            isOpen={isChecked}
            children={
              <>
                <GlucoseScoreChart />
                {showButton && (
                  <>
                    <button onClick={getGlucoseScore}>get score</button>
                    <div>{glucoseScoreComment}</div>
                  </>
                )}
              </>
            }
          />
          <AiComment vitals={vitals} />
        </div>
        <Jokes />
      </main>
    </div>
  );
};

export default App;
