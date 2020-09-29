import {ConsentManager} from "@segment/consent-manager";

import getConfig from "next/config";
import * as React from "react";

const {publicRuntimeConfig} = getConfig();
const segment_id = publicRuntimeConfig.SEGMENT_ID;

export interface Props {
  plain?: boolean;
}

export default function SegmentManager(): JSX.Element {
  return <ConsentManager writeKey={segment_id} />;
}
