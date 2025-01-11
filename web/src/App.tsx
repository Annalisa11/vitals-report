import React, { FormEvent, useContext, useEffect, useState } from 'react';

import Accordion from '@components/Accordion';
import AiComment from '@components/AiComment';
import Button from '@components/basic/Button';
import GlucoseBox from '@components/GlucoseBox';
import GlucoseChart from '@components/GlucoseChart';
import GlucoseScoreChart from '@components/GlucoseScoreChart';
import Header from '@components/Header';
import Jokes from '@components/Jokes';
import ScoreEmoji from '@components/ScoreEmoji';
import ThemeDropdown from '@forms/ThemeDropdown';
import Vitals from '@components/Vitals';

import { useVitals } from '@hooks/useVitals';
import useAuth from '@hooks/useAuth';
import { ThemeContext } from '@providers/ThemeContext';

import './App.scss';
import { useGuesses } from '@hooks/useGuesses';

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
  guesses?: number;
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
  const { isLoggedIn, checkHasRight } = useAuth();
  const { theme } = useContext(ThemeContext);
  const { data: vitals, isLoading: vitalsLoading } = useVitals(isLoggedIn);

  const [isChecked, setIsChecked] = useState(false);
  const [glucoseValue, setGlucoseValue] = useState<number | undefined>();

  const { guesses, score, tryGuess } = useGuesses();

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme);
  }, [theme]);

  const handleGlucoseSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (guesses <= 0 || !glucoseValue) return;
    tryGuess(glucoseValue);
  };

  return (
    <div className='app'>
      <Header />
      <div className='app__headline'>
        <ThemeDropdown />
        <h1>Best Report EVER</h1>
      </div>

      {isLoggedIn ? (
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
      ) : (
        <main>
          <div className='glucose-guessing-container'>
            <h2>Guess the Glucose!</h2>
            <GlucoseBox ValueInMgPerDl={glucoseValue} />
            <form onSubmit={handleGlucoseSubmit} className='guess-form'>
              <div>
                <div className='guess-form__guess-count'>
                  {guesses <= 0
                    ? 'NO MORE GUESSES :('
                    : `Guesses remaining: ${guesses}`}
                </div>
                <div className='guess-form__input-row'>
                  <input
                    className='guess-form__input'
                    type='number'
                    value={glucoseValue}
                    onChange={(e) => {
                      setGlucoseValue(
                        Number(e.target.value) === 0
                          ? undefined
                          : Number(e.target.value)
                      );
                    }}
                  />
                  <Button type='submit' disabled={guesses <= 0}>
                    Guess
                  </Button>
                </div>
              </div>
              <div>{score}</div>
            </form>
          </div>

          <Jokes />
        </main>
      )}
    </div>
  );
};

export default App;
