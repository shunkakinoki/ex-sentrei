import {ConsentManager} from "@segment/consent-manager";

import inRegions from "@segment/in-regions";
import getConfig from "next/config";
import * as React from "react";

const {publicRuntimeConfig} = getConfig();
const segment_id = publicRuntimeConfig.SEGMENT_ID;

const inCA = inRegions(["CA"]);
const inEU = inRegions(["EU"]);
const shouldRequireConsent = inRegions(["CA", "EU"]);
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

const initialPreferences = inCA()
  ? caDefaultPreferences
  : inEU()
  ? euDefaultPreferences
  : undefined;

export default function SegmentManager(): JSX.Element {
  return (
    <ConsentManager
      writeKey={segment_id}
      shouldRequireConsent={shouldRequireConsent}
      initialPreferences={initialPreferences}
    />
  );
}
