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

export const identifyUser = (
  userId: string,
  traits?: Object,
  options?: SegmentAnalytics.SegmentOpts,
  callback?: () => void,
): void => {
  if (window.analytics) {
    window.analytics.identify(userId, traits, options, callback);
  }
};

export const recordGroup = (
  groupId: string,
  traits?: Object,
  options?: SegmentAnalytics.SegmentOpts,
  callback?: () => void,
): void => {
  if (window.analytics) {
    window.analytics.group(groupId, traits, options, callback);
  }
};

export const trackEvent = (
  event: string,
  properties?: Object,
  options?: SegmentAnalytics.SegmentOpts,
  callback?: () => void,
): void => {
  if (window.analytics) {
    window.analytics.track(event, properties, options, callback);
  }
};

export const trackForm = (
  elements: JQuery | Element[] | Element,
  event: string | {(elm: Element): string},
  properties?: Object | {(elm: Element): Object},
): void => {
  if (window.analytics) {
    window.analytics.trackForm(elements, event, properties);
  }
};

export const trackLink = (
  elements: JQuery | Element[] | Element,
  event: string | {(elm: Element): string},
  properties?: Object | {(elm: Element): Object},
): void => {
  if (window.analytics) {
    window.analytics.trackLink(elements, event, properties);
  }
};
