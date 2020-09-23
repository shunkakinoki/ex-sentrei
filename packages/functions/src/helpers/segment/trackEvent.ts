import SegmentClient from "@sentrei/functions/helpers/segment/SegmentClient";

const trackEvent = (
  userId: string,
  event: string,
  properties?: Object,
  context?: Object,
): void => {
  SegmentClient.track({userId, event, properties, context});
};

export default trackEvent;
