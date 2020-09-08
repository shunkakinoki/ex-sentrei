/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Sentry from "@sentry/browser";
import React, {Component} from "react";

import {trackEvent} from "@sentrei/common/utils/segment";

interface ErrorProps {
  children: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(): {} {
    return {hasError: true};
  }

  componentDidCatch(err: any, errInfo: any): void {
    trackEvent("exception", {
      error: err,
      description: errInfo,
    });
    Sentry.withScope(scope => {
      Object.keys(errInfo).forEach(key => scope.setExtra(key, errInfo));
      Sentry.captureException(err);
    });
  }

  render(): {} | null | undefined {
    const {children} = this.props;
    const {hasError} = this.state;

    if (hasError) {
      return <h1>Error... Please refresh page.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
