import { createBrowserRouter } from 'react-router-dom';

import { path } from '~/constants/routes.ts';
import DefaultLayout from '~/layouts/DefaultLayout.tsx';
import HomeLayout from '~/layouts/HomeLayout.tsx';
import LoginLayout from '~/layouts/LoginLayout.tsx';
import ErrorBoundary from '~/pages/ErrorBoundary.tsx';
import LoginPage from '~/pages/Login.tsx';
import NotFound from '~/pages/NotFound.tsx';
import SignUpPage from '~/pages/SignUp.tsx';
import UserListedMoviePage from '~/pages/UserListedMovies.tsx';
import ProtectedRoutes from './ProtectedRoutes.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <DefaultLayout />,
            children: [
              {
                path: path.TV,
                lazy: () => import('src/pages/TVShows.tsx'),
              },
              {
                path: path.MOVIES,
                lazy: () => import('src/pages/Movies.tsx'),
              },
              {
                path: path.MY_LIST,
                element: <UserListedMoviePage />,
              },
            ],
          },
        ],
      },
      {
        element: <HomeLayout />,
        children: [
          {
            index: true,
            lazy: () => import('src/pages/Home.tsx'),
          },
        ],
      },
      {
        element: <LoginLayout />,
        children: [
          {
            path: path.LOGIN,
            element: <LoginPage />,
          },
          {
            path: path.SIGNUP,
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: path.PLAYER,
        lazy: () => import('src/pages/Player.tsx'),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
