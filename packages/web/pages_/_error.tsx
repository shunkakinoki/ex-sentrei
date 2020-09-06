/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Sentry from "@sentry/node";
import {NextPageContext} from "next";
import NextErrorComponent, {ErrorProps} from "next/error";
import * as React from "react";

const CustomError = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}: any): JSX.Element => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

CustomError.getInitialProps = async ({
  res,
  err,
  asPath,
}: any): Promise<ErrorProps> => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  } as NextPageContext);

  if (res?.statusCode === 404) {
    return {statusCode: 404};
  }
  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(3000);
    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.tsx getInitialProps missing data at path: ${asPath}`),
  );
  await Sentry.flush(3000);

  return errorInitialProps;
};

export default CustomError;
