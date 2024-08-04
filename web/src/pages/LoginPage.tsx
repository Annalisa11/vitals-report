import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import GlucoseBox from '../components/GlucoseBox';
import '../styles/pages/Login.scss';
import axios from 'axios';
import { BASE_URL } from '../config';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [glucoseValue, setGlucoseValue] = useState<number | undefined>();
  const [score, setScore] = useState<string>('');
  const [guesses, setGuesses] = useState<number>(() => {
    const storedGuesses = sessionStorage.getItem('guesses');
    return storedGuesses ? Number(storedGuesses) : 0;
  });
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleGlucoseSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('submit', glucoseValue);
    axios
      .post(`${BASE_URL}/guess`, { value: glucoseValue })
      .then((response) => {
        const message = response.data;
        console.log('RES', response, message);
        setScore(message);
        setGuesses((prev) => prev - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    sessionStorage.setItem('guesses', '5');
  }, []);

  useEffect(() => {
    sessionStorage.setItem('guesses', JSON.stringify(guesses));
  }, [guesses]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className='login'>
      <h1>BEST Report EVER</h1>
      <h2>Guess the Glucose!</h2>
      <GlucoseBox ValueInMgPerDl={glucoseValue} />
      <form onSubmit={handleGlucoseSubmit}>
        <div>
          <label>Glucose Value</label>
          <div>Guesses remaining: {guesses}</div>
          <input
            type='number'
            value={glucoseValue}
            onChange={(e) => {
              console.log('target value', e.target);
              setGlucoseValue(JSON.parse(e.target.value.trim()));
            }}
          />
        </div>
        {guesses <= 0 && <div>NO MORE GUESSES :(</div>}

        <button type='submit' disabled={guesses <= 0}>
          Guess
        </button>
        <div>score: {score}</div>
      </form>

      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
