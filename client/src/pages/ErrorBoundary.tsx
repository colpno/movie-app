import { useRouteError } from 'react-router-dom';

import { ApiError } from '~/apis/axios.ts';

function ErrorBoundary() {
  const error = useRouteError() as ApiError;

  return <div>{error.message}</div>;
}

export default ErrorBoundary;
