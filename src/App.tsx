import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import { routes } from './routes';

const App = () => {
  const Home = lazy(() => import('./views/Home'));
  const Film = lazy(() => import('./views/Film'));
  const Genres = lazy(() => import('./views/Genres'));
  const Genre = lazy(() => import('./views/Genre'));
  const Profile = lazy(() => import('./views/Profile'));
  const Page404 = lazy(() => import('./views/Page404'));

  const SuspenseFallback = () => <div>Loading...</div>;

  const SuspenseElement = (element: React.ReactElement) => (
    <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>
  );

  return (
    <Routes>
      <Route path={routes.HOME} element={SuspenseElement(<Home />)}>
        <Route index element={SuspenseElement(<Home />)} />
        <Route path={routes.FILM} element={SuspenseElement(<Film />)} />
        <Route path={routes.GENRES} element={SuspenseElement(<Genres />)} />
        <Route path={routes.GENRE} element={SuspenseElement(<Genre />)} />
        <Route path={routes.PROFILE} element={SuspenseElement(<Profile />)} />
        <Route path={'*'} element={SuspenseElement(<Page404 />)} />
      </Route>
    </Routes>
  );
};

export default App;
