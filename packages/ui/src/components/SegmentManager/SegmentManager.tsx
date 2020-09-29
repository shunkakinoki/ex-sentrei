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

  const [initialPreferences, setnitialPreferences] = React.useState<
    | {
        advertising: boolean;
        marketingAndAnalytics: boolean;
        functional: boolean;
      }
    | undefined
  >(undefined);

  React.useEffect(() => {
    if (isBrowser()) {
      const inCA = inRegions(["CA"]);
      const inEU = inRegions(["EU"]);
      setShouldRequireConsent(inRegions(["CA", "EU"]));

      const caDefaultPreferences = {
        advertising: false,
        marketingAndAnalytics: true,
        functional: true,
      };
      const euDefaultPreferences = {
        advertising: false,
        marketingAndAnalytics: false,
        functional: false,
      };

      const preferences = inCA()
        ? caDefaultPreferences
        : inEU()
        ? euDefaultPreferences
        : undefined;

      setnitialPreferences(preferences);
    }
  }, []);

  return (
    <NoSsr>
      <ConsentManager
        writeKey={segment_id}
        bannerContent={<></>}
        bannerSubContent=""
        shouldRequireConsent={(): boolean => shouldRequireConsent}
        initialPreferences={initialPreferences}
      />
    </NoSsr>
  );
}
