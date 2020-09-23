import SegmentClient from "@sentrei/functions/helpers/segment/SegmentClient";

const identifyUser = (
  userId: string,
  traits?: Object,
  context?: Object,
): void => {
  SegmentClient.identify({
    userId,
    traits,
    context,
  });
};

export default identifyUser;
