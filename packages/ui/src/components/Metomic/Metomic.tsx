import {ConsentGate, MetomicProvider} from "@metomic/react";
import * as React from "react";

import Segment from "@sentrei/ui/components/Segment";

export default function Metomic(): JSX.Element {
  return (
    <MetomicProvider
      autoblocking={false}
      debug
      projectId={process.env.METOMIC_PROJECT_ID}
    >
      <>
        <ConsentGate micropolicy="sentrei">
          <Segment plain />
        </ConsentGate>
      </>
    </MetomicProvider>
  );
}
