/* eslint-disable no-unused-vars */
import { BrowserRouter } from 'react-router';
import { Routes, Route, NavLink, Navigate } from 'react-router';
import { Suspense } from 'react';

import { AuthProvider } from '../context/Auth/AuthContext';
import { PrivateRoute, PublicRoute } from './ProtectedRoutes';

import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export const Navigation = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<span>Loading...</span>}>
        <BrowserRouter>
          <div className="main-layout">
            <nav>
              <img src={'logo'} alt="react-logo" />
              <ul>
                {PrivateRoutes.map(({ to, name }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) => isActive ? 'nav-active' : ''}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <Routes>
              {/* Public Routes */} 
              {PublicRoutes.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PublicRoute>
                      <Component />
                    </PublicRoute>
                  }
                />
              ))}

              {/* Private Routes */}
              
              {PrivateRoutes.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PrivateRoute>
                      <Component />
                    </PrivateRoute>
                  }
                />
              ))}

              {/* Default redirect */}
              <Route 
                path="/*" 
                element={<Navigate to="/login" replace />} 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </Suspense>
    </AuthProvider>
  );
};

