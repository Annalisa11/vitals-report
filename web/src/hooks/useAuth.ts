import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../providers/AuthContext';
import { Right } from '../forms/RightsCheckbox';

const useAuth = () => {
  const context = useContext<AuthContextProps>(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user } = context;

  const checkHasRight = (right: Right) => {
    if (!user || !user.rights) {
      return false;
    }
    return user.rights.some((r) => r === right);
  };

  return { ...context, checkHasRight };
};

export default useAuth;
