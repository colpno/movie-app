import { useRouteError } from 'react-router-dom';

import { ApiError } from '~/apis/axios.ts';

function ErrorBoundary() {
  const error = useRouteError() as ApiError;

  if (error) console.error('error:', error);

  return <></>;
}

export default ErrorBoundary;
