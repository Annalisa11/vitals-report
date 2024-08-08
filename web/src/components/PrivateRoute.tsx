import { Navigate, Outlet } from 'react-router-dom';
import { Right } from '../forms/RightsCheckbox';
import useAuth from '../hooks/useAuth';

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
