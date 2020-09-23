import * as Sentry from "@sentry/node";
import * as functions from "firebase-functions";

const config = functions.config().env;

Sentry.init({
  enabled: true,
  dsn: config.sentry.dsn,
  environment: config.environment,
  tracesSampleRate: 1.0,
});

export default Sentry;
