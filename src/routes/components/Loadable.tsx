import React, { Suspense } from 'react'

import LoadingPage from 'components/loading-page'

const Loadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => () =>
  (
  <Suspense fallback={<LoadingPage />}>
    <Component />
  </Suspense >
  )

export default Loadable
