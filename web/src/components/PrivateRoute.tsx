import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { Right } from '@/types/types';

interface Props {
  redirectTo: string;
  rightsCheck?: Right;
}

const PrivateRoute = ({ redirectTo, rightsCheck }: Props) => {
  const { isLoggedIn, checkHasRight } = useAuth();

  const check: boolean = rightsCheck ? checkHasRight(rightsCheck) : isLoggedIn;

  return check ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
