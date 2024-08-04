import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Login.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const message =
    'Hey David\ncould you please create an account on the best vitals report EVER? (ɔ◔‿◔)ɔ \n\nmy email is... ';

  return (
    <div className='login'>
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
        <div>
          <p>
            You don't have an account yet? <br />
            Ask an Admin to make one...
          </p>
          <button>
            <a href={`https://wa.me/?text=${encodeURIComponent(message)}`}>
              Ask for an account
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
