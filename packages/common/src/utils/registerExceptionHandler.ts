/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from "@sentry/browser";

const handleException = function handleException(e: Error): void {
  Sentry.captureException(e);
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
