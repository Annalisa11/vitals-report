/* eslint-disable no-empty-pattern */
import React, { useEffect, useState } from 'react';
import { VitalsType } from '../App';
import axios from 'axios';
import { BASE_URL } from '../config';
import '../styles/Vitals.scss';

interface Props {}

const Vitals = ({}: Props) => {
  const [vitals, setVitals] = useState<VitalsType | null>(null);
  const [sarcasticComment, setSarcasticComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/vitals`);
        const data: VitalsType = response.data;
        setVitals(data);
        generateSarcasticComment(data);
      } catch (error) {
        console.error('Error fetching vitals:', error);
      }
    };

    fetchVitals();
  }, []);

  const generateSarcasticComment = async (vitals: VitalsType) => {
    setLoading(true);
    const prompt = `Generate a message with a very short heading with a fitting emoji, followed by a short, funny and sarcastic text that comments on these diabetes vitals: ${JSON.stringify(
      vitals
    )}. Avoid using specific values from the vitals. Address the text to David.`;

    try {
      const response = await axios.post(`${BASE_URL}/openai`, { prompt });
      setSarcasticComment(response.data.message);
    } catch (error) {
      console.error('Error generating sarcastic comment:', error);
    } finally {
      setLoading(false);
    }
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
        return '🤷‍♂️ Who knows?';
    }
  };

  return vitals ? (
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
            <strong>Trend Arrow:</strong> {getTrendEmoji(vitals.TrendArrow)}
          </p>
        </div>
      </div>
      <div className='comment'>
        {loading ? <div className='loader'></div> : <p>{sarcasticComment}</p>}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Vitals;
