import { Navigate } from 'react-router-dom';
import { canAccessRoute } from '../utils/rbac';

const PermissionGuard = ({ user, require = [], fallbackPath = '/dashboard', children }) => {
  if (!canAccessRoute(user, require)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default PermissionGuard;
