import React, { FormEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Vitals from './components/Vitals';
import Jokes from './components/Jokes';
import GlucoseChart from './components/GlucoseChart';
import AiComment from './components/AiComment';
import GlucoseScoreChart from './components/GlucoseScoreChart';
import Accordion from './components/Accordion';
import ScoreEmoji from './components/ScoreEmoji';
import GlucoseBox from './components/GlucoseBox';
import Button from './components/basic/Button';

import { useVitals } from './hooks/useVitals';
import useAuth from './hooks/useAuth';
import { ThemeContext } from './providers/ThemeContext';
import { BASE_URL } from './config';
import Header from './components/Header';
import ThemeDropdown from './forms/ThemeDropdown';
import './App.scss';

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
  const { isLoggedIn, checkHasRight } = useAuth();

  const [isChecked, setIsChecked] = useState(false);
  const [glucoseValue, setGlucoseValue] = useState<number | undefined>();
  const [score, setScore] = useState<string>('');
  const [guesses, setGuesses] = useState<number>(() => {
    const storedGuesses = sessionStorage.getItem('guesses');
    return storedGuesses ? Number(storedGuesses) : 5;
  });

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme);
  }, [theme]);

  const handleGlucoseSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('submit', glucoseValue);
    try {
      const response = await axios.post(`${BASE_URL}/guess`, {
        value: glucoseValue,
      });
      const message = response.data;
      console.log('RES', response, message);
      setScore(message);
      setGuesses((prev) => prev - 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    sessionStorage.setItem('guesses', JSON.stringify(guesses));
  }, [guesses]);

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
          <div>
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
                      console.log('target value', e.target);
                      setGlucoseValue(JSON.parse(e.target.value.trim()));
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
