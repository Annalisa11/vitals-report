// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import AdminModal from './admin/AdminModal';
import Button from './basic/Button';
import '@styles/Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, checkHasRight } = useAuth();

  return (
    <header className='header'>
      {isLoggedIn ? (
        <div className='header__container'>
          <strong>Hi, {user?.username}</strong>
          <div className='header__container__buttons'>
            <Button onClick={logout}>Log Out</Button>
            {checkHasRight('create-account') && <AdminModal />}
          </div>
        </div>
      ) : (
        <div className='header__container--logged-out'>
          <Button onClick={() => navigate('/login')}>Log In</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
