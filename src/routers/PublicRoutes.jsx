import { lazy } from 'react';

/**
 * @function PublicRoutes
 * @description Rutas públicas de la aplicación.
 * @returns {Array} Rutas públicas de la aplicación.
 */

// Se implementan Lazy components 
const Login = lazy(() => import('../pages/public/Auth/Login'));
const Register = lazy(() => import('../pages/public/Auth/Register'));

// Se implementan las rutas públicas de la aplicación
export const PublicRoutes = [
  {
    path: '/login',
    to: '/login',
    Component: Login,
    name: 'Login',
  },
  {
    path: '/register',
    to: '/register',
    Component: Register,
    name: 'Register',
  }

];

