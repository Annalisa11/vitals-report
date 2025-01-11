import React, { useContext, useEffect } from 'react';

import Header from '@components/Header';

import ThemeDropdown from '@forms/ThemeDropdown';
import useAuth from '@hooks/useAuth';
import { ThemeContext } from '@providers/ThemeContext';

import './App.scss';

import LoggedInView from '@components/views/LoggedInView';
import LoggedOutView from '@components/views/LoggedOutView';

const App: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute('theme', theme);
  }, [theme]);

  return (
    <div className='app'>
      <Header />
      <div className='app__headline'>
        <ThemeDropdown />
        <h1>Best Report EVER</h1>
      </div>

      {isLoggedIn ? <LoggedInView /> : <LoggedOutView />}
    </div>
  );
};

export default App;
