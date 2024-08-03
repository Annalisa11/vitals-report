import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

interface Props {
  redirectTo: string;
}

const PrivateRoute = ({ redirectTo }: Props) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
