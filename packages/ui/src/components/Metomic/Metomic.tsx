import {ConsentGate, MetomicProvider} from "@metomic/react";
import * as React from "react";

export default function Metomic(): JSX.Element {
  return (
    <MetomicProvider projectId={process.env.METOMIC_PROJECT_ID}>
      <ConsentGate micropolicy="sentrei" />
    </MetomicProvider>
  );
}
