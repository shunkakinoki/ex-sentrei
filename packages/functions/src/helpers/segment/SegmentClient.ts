import * as functions from "firebase-functions";

const config = functions.config().env;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Analytics = require("analytics-node");
const SegmentClient = new Analytics(config.segment.apiKey);

export default SegmentClient;
