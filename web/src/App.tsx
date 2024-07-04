import React, { useState, useEffect } from 'react';
import './App.css';
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

const App: React.FC = () => {
  const [vitals, setVitals] = useState<Vitals | null>(null);
  const [sarcasticComment, setSarcasticComment] = useState<string>('');
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState<boolean>(false);

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
    console.log('openai res', response);

    setSarcasticComment(response.data.message);
    setLoading(false);
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
                  <strong>Trend Arrow:</strong> {vitals.TrendArrow}
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
      </main>
    </div>
  );
};

export default App;
