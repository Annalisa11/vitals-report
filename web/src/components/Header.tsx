// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ThemeDropdown from '../forms/ThemeDropdown';
import AdminModal from './admin/AdminModal';
import Button from './basic/Button';
import '../styles/Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, checkHasRight } = useAuth();

  return (
    <header className='header'>
      <ThemeDropdown />
      {isLoggedIn ? (
        <div className='header user'>
          <strong>Hi, {user?.username}</strong>
          <Button onClick={logout}>Log Out</Button>
          {checkHasRight('create-account') && <AdminModal />}
        </div>
      ) : (
        <Button onClick={() => navigate('/login')}>Log In</Button>
      )}
    </header>
  );
};

export default Header;
