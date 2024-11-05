import { Suspense, lazy } from "react";

import { Loader } from "@/components/Loader";

export const Loadable = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const LazyComponent = lazy(importFunc);

  return (props: object) => (
    <Suspense fallback={<Loader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default Loadable;
