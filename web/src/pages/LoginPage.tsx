import { FormEvent, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/login`, { username, password })
      .then((response) => {
        console.log(response);
        alert('Login successful');
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
        alert('Login failed');
      });
  };

  return (
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
  );
};

export default LoginPage;
