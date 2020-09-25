import * as Sentry from "@sentry/browser";
import {RewriteFrames} from "@sentry/integrations";
import get from "lodash.get";
import getConfig from "next/config";

const config = getConfig();
const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
Sentry.init({
  enabled: true,
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  release: process.env.SENTRY_RELEASE,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      iteratee: (frame: Sentry.StackFrame): Sentry.StackFrame => {
        // eslint-disable-next-line no-param-reassign
        frame.filename = frame?.filename?.replace(distDir, "app:///_next");
        return frame;
      },
    }),
  ],
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
