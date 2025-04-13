
import { lazy } from 'react';

/**
 * @function PrivateRoutes
 * @description Rutas privadas de la aplicación.
 * @returns {Array} Rutas privadas de la aplicación.
 **/


// Se implementan Lazy components
const Home = lazy(() => import('../pages/private/Home/Home'));

// Se implementan las rutas privadas de la aplicación
export const PrivateRoutes = [
  {
    path: '/*',
    to: '/',
    Component: Home,
    name: '',
  },
]

