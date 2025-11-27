import React, { Suspense } from 'react';
import { Loader } from '@components/ui/Loader';

export const SuspenseElement = (element: React.ReactElement) => {
  return <Suspense fallback={<Loader stretch />}>{element}</Suspense>;
};
