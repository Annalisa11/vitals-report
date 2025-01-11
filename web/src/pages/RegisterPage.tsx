import axios from 'axios';
import { FormEvent, useState } from 'react';
import { BASE_URL } from '@/config';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@components/basic/Button';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(searchParams.get('token') ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/register`, { token, username, password })
      .then((response) => {
        alert(response.data);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        alert('Registration failed');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <div>
        <label>Token</label>
        <input
          type='text'
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
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
      <Button type='submit'>Register</Button>
    </form>
  );
};

export default RegisterPage;
