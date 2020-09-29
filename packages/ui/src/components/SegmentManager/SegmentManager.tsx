import NoSsr from "@material-ui/core/NoSsr";
import {ConsentManager} from "@segment/consent-manager";

import inRegions from "@segment/in-regions";
import getConfig from "next/config";
import * as React from "react";

import isBrowser from "@sentrei/common/utils/isBrowser";

const {publicRuntimeConfig} = getConfig();
const segment_id = publicRuntimeConfig.SEGMENT_ID;

export default function SegmentManager(): JSX.Element {
  const [shouldRequireConsent, setShouldRequireConsent] = React.useState<
    boolean
  >(false);

  React.useEffect(() => {
    if (isBrowser()) {
      setShouldRequireConsent(inRegions(["CA", "EU"]));
    }
  }, []);

  return (
    <NoSsr>
      <ConsentManager
        writeKey={segment_id}
        bannerContent={<></>}
        bannerSubContent=""
        shouldRequireConsent={(): boolean => shouldRequireConsent}
      />
    </NoSsr>
  );
}
