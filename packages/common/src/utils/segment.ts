import * as snippet from "@segment/snippet";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const segment_id = publicRuntimeConfig.SEGMENT_ID;

export const renderSnippet = (): string => {
  const opts = {
    apiKey: segment_id,
    page: true,
    load: true,
  };

  return snippet.min(opts);
};

export const loadSegment = (): void => {
  if (window.analytics) {
    window.analytics.load(segment_id);
  }
};

export const pageView = (
  category?: string,
  name?: string,
  properties?: Object,
  options?: SegmentAnalytics.SegmentOpts,
  callback?: () => void,
): void => {
  if (window.analytics) {
    window.analytics.page(category, name, properties, options, callback);
  }
};
