import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@styles/pages/Login.scss';
import Button from '@components/basic/Button';
import useAuth from '@hooks/useAuth';

const LoginPage = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
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
          <label>Email</label>
          <input
            type='text'
            value={email}
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
        <Button type='submit'>Login</Button>
        <div>
          <p>
            You don't have an account yet? <br />
            Ask an Admin to make one...
          </p>
          <Button>
            <a href={`https://wa.me/?text=${encodeURIComponent(message)}`}>
              Ask for an account
            </a>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
