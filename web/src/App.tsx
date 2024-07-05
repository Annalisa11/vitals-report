import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

interface Vitals {
  FactoryTimestamp: string;
  Timestamp: string;
  type: number;
  ValueInMgPerDl: number;
  TrendArrow: number;
  TrendMessage: string | null;
  MeasurementColor: number;
  GlucoseUnits: number;
  Value: number;
  isHigh: boolean;
  isLow: boolean;
}

type Joke = {
  setup: string;
  punchline: string;
};

const App: React.FC = () => {
  const [vitals, setVitals] = useState<Vitals | null>(null);
  const [sarcasticComment, setSarcasticComment] = useState<string>('');
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [joke, setJoke] = useState<Joke>({
    setup: '',
    punchline: '',
  });

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/vitals`);
        const data: Vitals = await response.json();
        setVitals(data);
        generateSarcasticComment(data);
      } catch (error) {
        console.error('Error fetching vitals:', error);
      }
    };

    fetchVitals();
  }, []);

  const generateSarcasticComment = async (vitals: Vitals) => {
    setLoading(true);
    const prompt = `Generate a message with a very short heading with a fitting emoji, followed by a short, funny and sarcastic text that comments on these diabetes vitals:  ${JSON.stringify(
      vitals
    )}. Avoid using specific values from the vitals. Address the text to David.`;

    const response = await axios.post(`${BASE_URL}/openai`, { prompt: prompt });

    setSarcasticComment(response.data.message);
    setLoading(false);
  };

  const getJoke = async () => {
    const response = await axios.get(
      'https://official-joke-api.appspot.com/jokes/random'
    );
    const res = response.data;
    setJoke({
      setup: res.setup,
      punchline: res.punchline,
    });
  };

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
        return '🤷‍♂️ Who knows? ';
    }
  };

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Best Report EVER</h1>
        <h2>Your daily dose of David</h2>
      </header>
      <main>
        {vitals ? (
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
                  <strong>Trend Arrow:</strong>{' '}
                  {getTrendEmoji(vitals.TrendArrow)}
                </p>
              </div>
            </div>
            <div className='comment'>
              {loading ? (
                <div className='loader'></div>
              ) : (
                <p>{sarcasticComment}</p>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className='jokes'>
          <h2>Do something for David</h2>
          <p>
            Life's tough for David. He's battling diabetes and could use a good
            laugh. Be a friend and brighten his day — hit him with a joke!
          </p>
          <button onClick={getJoke}>Get me a Joke</button>
          <div>
            <div>{joke.setup}</div> {joke.punchline}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
