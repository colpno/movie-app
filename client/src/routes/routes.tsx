import { createBrowserRouter } from 'react-router-dom';

import { path } from '~/constants/routes.ts';
import DefaultLayout from '~/layouts/DefaultLayout.tsx';
import HomeLayout from '~/layouts/HomeLayout.tsx';
import LoginLayout from '~/layouts/LoginLayout.tsx';
import ErrorBoundary from '~/pages/ErrorBoundary.tsx';
import UserListedMoviePage from '~/pages/FavoritePage.tsx';
import LoginPage from '~/pages/LoginPage.tsx';
import MoreInfo from '~/pages/MoreInfo.tsx';
import NotFound from '~/pages/NotFound.tsx';
import SearchPage from '~/pages/SearchPage.tsx';
import SignUpPage from '~/pages/SignUpPage.tsx';
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
                lazy: () => import('src/pages/TVPage.tsx'),
              },
              {
                path: path.MOVIES,
                lazy: () => import('src/pages/MoviePage.tsx'),
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
            lazy: () => import('src/pages/HomePage.tsx'),
          },
          {
            path: path.SEARCH,
            element: <SearchPage />,
          },
          {
            path: path.MORE(),
            element: <MoreInfo />,
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
        lazy: () => import('src/pages/PlayerPage.tsx'),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
