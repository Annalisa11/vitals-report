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
    const prompt = `Generate a sarcastic and/or ironic and funny comment for the following vitals: ${JSON.stringify(
      vitals
    )}`;

    const response = await axios.post(`${BASE_URL}/openai`, { prompt: prompt });
    console.log('openai res', response);

    setSarcasticComment(response.data.message);

    console.log('CHAT');
  };

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Diabetes Weather Report</h1>
        <p>Your daily dose of diabetic sarcasm!</p>
      </header>
      <main>
        {vitals ? (
          <div
            className={`reading ${
              vitals.isHigh ? 'red' : vitals.isLow ? 'blue' : 'green'
            }`}
          >
            <h2>Current Reading</h2>
            <p>Timestamp: {vitals.Timestamp}</p>
            <p>Glucose Level: {vitals.ValueInMgPerDl} mg/dL</p>
            <p>Trend: {vitals.TrendMessage || 'No significant change'}</p>
            <p>{sarcasticComment}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default App;
