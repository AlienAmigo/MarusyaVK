import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/layouts/Layout';
import { SuspenseElement } from '@components/SuspenseElement';

import { ProtectedRoute } from '@components/ProtectedRoute';
import { routesEnum } from './routes';

// Lazy components
const Home = lazy(() => import('./views/Home'));
const Film = lazy(() => import('./views/Film'));
const Genres = lazy(() => import('./views/Genres'));
const Genre = lazy(() => import('./views/Genre'));
const Profile = lazy(() => import('./views/Profile'));
const Auth = lazy(() => import('./views/Auth'));
const Register = lazy(() => import('./views/Register'));
const Page404 = lazy(() => import('./views/Page404'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={routesEnum.HOME} element={<Layout />}>
        <Route index element={SuspenseElement(<Home />)} />
        <Route path={routesEnum.FILM} element={SuspenseElement(<Film />)} />
        <Route path={routesEnum.GENRES} element={SuspenseElement(<Genres />)} />
        <Route path={routesEnum.GENRE} element={SuspenseElement(<Genre />)} />
        <Route
          path={`${routesEnum.PROFILE}/*`}
          element={SuspenseElement(
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )}
        />
        <Route path={routesEnum.AUTH} element={SuspenseElement(<Auth />)} />
        <Route path={routesEnum.REGISTER} element={SuspenseElement(<Register />)} />
        <Route path={'*'} element={SuspenseElement(<Page404 />)} />
      </Route>
    </Routes>
  );
};

export default App;
