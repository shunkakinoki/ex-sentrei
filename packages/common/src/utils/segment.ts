import * as snippet from "@segment/snippet";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const segment_id = publicRuntimeConfig.SEGMENT_ID;

export const renderSnippet = (): string => {
  const opts = {
    apiKey: segment_id,
    page: true,
  };

  return snippet.min(opts);
};

const segment = (): void => {
  if (window.analytics) {
    window.analytics.load(segment_id);
  }
};

export default segment;
