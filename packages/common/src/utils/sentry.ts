import {RewriteFrames} from "@sentry/integrations";
import * as Sentry from "@sentry/node";
import get from "lodash.get";
import getConfig from "next/config";

const config = getConfig();
const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
Sentry.init({
  enabled: true,
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  release: process.env.SENTRY_RELEASE,
  integrations: [
    new RewriteFrames({
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      iteratee: frame => {
        // eslint-disable-next-line no-param-reassign
        frame.filename = frame.filename?.replace(distDir, "app:///_next");
        return frame;
      },
    }),
  ],
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
