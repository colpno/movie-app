import { createBrowserRouter } from 'react-router-dom';

import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout.tsx';
import LoginLayout from '~/layouts/LoginLayout/LoginLayout.tsx';
import LoginPage from '~/pages/Login.tsx';
import NotFound from '~/pages/NotFound.tsx';
import SignUpPage from '~/pages/SignUp.tsx';
import ProtectedRoutes from './ProtectedRoutes.tsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'tv',
            lazy: () => import('src/pages/TVShows.tsx'),
          },
          {
            path: 'movies',
            lazy: () => import('src/pages/Movies.tsx'),
          },
          {
            path: 'mylist',
            lazy: () => import('src/pages/UserListedMovies.tsx'),
          },
        ],
      },
      {
        index: true,
        lazy: () => import('src/pages/Home.tsx'),
      },
    ],
  },
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: 'player',
    lazy: () => import('src/pages/Player.tsx'),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);