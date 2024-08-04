import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';
import { Right } from '../forms/RightsCheckbox';

interface Props {
  redirectTo: string;
  rightsCheck?: Right;
}

const PrivateRoute = ({ redirectTo, rightsCheck }: Props) => {
  const { isLoggedIn, checkPermission } = useAuth();

  const check: boolean = rightsCheck
    ? checkPermission(rightsCheck)
    : isLoggedIn;

  return check ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
