import React, { Suspense } from 'react'

import LoadingPage from 'components/loadingPage'

const Loadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => () =>
  (
    <Suspense fallback={<LoadingPage />}>
      <Component />
    </Suspense >
  )

export default Loadable
