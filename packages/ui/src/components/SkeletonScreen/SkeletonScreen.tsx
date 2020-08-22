import * as React from "react";

import SkeletonBoard from "@sentrei/ui/components/SkeletonBoard";
import SkeletonPanel from "@sentrei/ui/components/SkeletonPanel";

export default function SkeletonScreen(): JSX.Element {
  return (
    <>
      <SkeletonPanel />
      <SkeletonBoard />
    </>
  );
}
