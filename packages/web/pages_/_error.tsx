import * as Sentry from "@sentry/browser";
import {NextPageContext} from "next";
import NextError, {ErrorProps} from "next/error";
import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseValue<T extends Promise<any>> = T extends Promise<infer R> ? R : T;

const getInitialProps = async (
  ctx: NextPageContext,
): Promise<
  | ErrorProps
  | {
      hasGetInitialPropsRun: boolean;
      statusCode: number;
      title?: string | undefined;
    }
> => {
  const errorInitialProps = await NextError.getInitialProps(ctx);

  const {res, err, asPath} = ctx;

  if (res?.statusCode === 404) {
    return {statusCode: 404};
  }
  if (err) {
    trackEvent("Exception", {
      error: err.name,
      description: err.message,
      statusCode: err.statusCode,
      stack: err.stack,
    });
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );
  await Sentry.flush(2000);

  return {
    ...errorInitialProps,
    hasGetInitialPropsRun: true,
  };
};

const CustomError = (
  ctx: PromiseValue<ReturnType<typeof getInitialProps>> & NextPageContext,
): JSX.Element => {
  if (
    !("hasGetInitialPropsRun" in ctx && ctx.hasGetInitialPropsRun) &&
    ctx.err
  ) {
    trackEvent("exception", {
      error: ctx.err.name,
      description: ctx.err.message,
      statusCode: ctx.err.statusCode,
      stack: ctx.err.stack,
    });
    Sentry.captureException(ctx.err);
  }

  return <NextError statusCode={ctx.statusCode} />;
};

CustomError.getInitialProps = getInitialProps;

export default CustomError;
