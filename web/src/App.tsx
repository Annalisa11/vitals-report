import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import Vitals from './components/Vitals';
import Jokes from './components/Jokes';
import GlucoseChart from './components/GlucoseChart';
import { useVitals } from './hooks/useVitals';
import AiComment from './components/AiComment';
import GlucoseScoreChart from './components/GlucoseScoreChart';
import Accordion from './components/Accordion';
import ScoreEmoji from './components/ScoreEmoji';
import { ThemeContext } from './providers/ThemeContext';
import ThemeDropdown from './forms/ThemeDropdown';

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

export type GlucoseScoreResult = {
  ranges: Range[];
  emoji: number;
};

export type Range = {
  name: string;
  value: number;
};

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { data: vitals, isLoading: vitalsLoading } = useVitals();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme);
    console.log(
      'html attribute: ',
      document.documentElement.getAttribute('theme')
    );
  }, [theme]);

  return (
    <div className='app'>
      <ThemeDropdown />
      <header className='app__header'>
        <h1>Best Report EVER</h1>
        <h2>Your daily dose of David</h2>
      </header>
      <main>
        {vitals ? (
          <Vitals vitals={vitals} vitalsLoading={vitalsLoading} />
        ) : (
          <div>data not available right now :(</div>
        )}
        <div className='glucose-score'>
          <GlucoseChart checked={isChecked} toggleSwitch={setIsChecked} />
          <Accordion
            isOpen={isChecked}
            children={
              <div className='chart-details'>
                <GlucoseScoreChart />
                <ScoreEmoji />
              </div>
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
