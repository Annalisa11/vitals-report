import { BASE_URL } from '@/config';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useGuesses = () => {
  const [guesses, setGuesses] = useState<number>(0);
  const [score, setScore] = useState<string>('');

  const getGuesses = async () => {
    axios
      .get(`${BASE_URL}/guesses`)
      .then((response) => {
        const { value } = response.data;
        setGuesses(value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initializeGuesses = async () => {
    const storedGuesses = sessionStorage.getItem('guesses');
    if (storedGuesses) {
      setGuesses(Number(storedGuesses));
    } else {
      console.log('get guesses');
      getGuesses();
    }
  };

  const tryGuess = async (guess: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/guess`, {
        value: guess,
      });
      const message = response.data;
      setScore(message);
      setGuesses((prev) => {
        const newGuesses = prev - 1;
        sessionStorage.setItem('guesses', String(newGuesses));
        return newGuesses;
      });
    } catch (error) {
      console.error('Error submitting guess:', error);
    }
  };

  useEffect(() => {
    initializeGuesses();
  }, []);

  return { guesses, score, tryGuess };
};
