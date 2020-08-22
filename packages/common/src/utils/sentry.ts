import * as Sentry from "@sentry/browser";
import get from "lodash.get";

import isBrowser from "@sentrei/common/utils/isBrowser";

Sentry.init({
  enabled: process.env.NODE_ENV !== "production",
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  release: process.env.SENTRY_RELEASE,
  beforeSend(event) {
    if (isBrowser() && event.exception) {
      Sentry.showReportDialog({eventId: event.event_id});
    }
    return event;
  },
});

Sentry.configureScope(scope => {
  scope.setTag("nodejs", process.version);
  // scope.setTag("runtimeEngine", isBrowser() ? "browser" : "server");
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configureReq = (req: any): void => {
  Sentry.configureScope(scope => {
    scope.setTag("host", get(req, "headers.host"));
    scope.setTag("url", get(req, "url"));
    scope.setTag("method", get(req, "method"));
    scope.setContext("query", get(req, "query"));
    scope.setContext("cookies", get(req, "cookies"));
    scope.setContext("body", get(req, "body"));
    scope.setContext("headers", get(req, "headers"));
  });
};

export default Sentry;
