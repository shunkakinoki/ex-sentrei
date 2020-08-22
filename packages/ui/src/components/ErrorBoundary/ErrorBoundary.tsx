/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from "@sentry/browser";
import React, {Component} from "react";

import {analytics} from "@sentrei/common/utils/firebase";

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

  componentDidCatch(error: any, errorInfo: any): void {
    analytics().logEvent("exception", {
      description: String(errorInfo),
      error: String(error || error.message),
    });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => scope.setExtra(key, errorInfo));
      Sentry.captureException(error);
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
