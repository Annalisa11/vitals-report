import { Outlet } from 'react-router-dom';
import AuthProvider from '@providers/AuthContext.tsx';

const MainLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default MainLayout;
