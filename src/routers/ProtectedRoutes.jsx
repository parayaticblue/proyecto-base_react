import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/Auth/AuthContext';

/**
 * @function PrivateRoute
 * @descripción Componente PrivateRoute que protege las rutas de la aplicación.
 * @returns 
 */
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};