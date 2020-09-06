/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Sentry from "@sentry/browser";

import {trackEvent} from "@sentrei/common/utils/segment";

const handleException = function handleException(err: Error): void {
  trackEvent("exception", {
    error: err.name,
    description: err.message,
  });
  Sentry.captureException(err);
};

const handleRejectedPromise = function handleRejectedPromise(
  reason: any,
  promise: Promise<any>,
): void {
  Sentry.captureException({reason, e: promise});
};

const registerExceptionHandler = function registerExceptionHandler(): void {
  process.on("uncaughtException", handleException);
  process.on("unhandledRejection", handleRejectedPromise);
};

export default registerExceptionHandler;
