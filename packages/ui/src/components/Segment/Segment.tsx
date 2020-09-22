import Head from "next/head";

import * as React from "react";

import {renderSnippet} from "@sentrei/common/utils/segment";

export interface Props {
  plain?: boolean;
}

export default function Segment({plain = false}: Props): JSX.Element {
  if (plain) {
    // eslint-disable-next-line react/no-danger
    return <script dangerouslySetInnerHTML={{__html: renderSnippet()}} />;
  }

  return (
    <Head>
      {/* eslint-disable-next-line react/no-danger */}
      <script dangerouslySetInnerHTML={{__html: renderSnippet()}} />
    </Head>
  );
}
