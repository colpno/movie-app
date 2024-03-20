import { ReactNode, Suspense } from 'react';
import { Await, AwaitProps } from 'react-router-dom';

import ErrorBoundary from '~/pages/ErrorBoundary.tsx';
import Loading from './Loading.tsx';

interface RouterLoadingWrapperProps {
  children: ReactNode | AwaitProps['children'];
  loaderData: unknown;
}

/**
 * @requires defer from react-router-dom to handle the loaderData
 * @example
 * import { defer } from 'react-router-dom';
 * function loader() {
 * return defer(loaderData)
 * }
 * @param loaderData the data returned from the loader function
 * @param children the children to render
 * @returns you can retrieve back the data in the children via useAsyncValue hook
 */
function RouterLoadingWrapper({ children, loaderData }: RouterLoadingWrapperProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={loaderData} errorElement={<ErrorBoundary />}>
        {children}
      </Await>
    </Suspense>
  );
}

export default RouterLoadingWrapper;
