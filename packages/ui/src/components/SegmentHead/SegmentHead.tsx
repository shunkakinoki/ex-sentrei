import Head from "next/head";

import * as React from "react";

import {renderSnippet} from "@sentrei/common/utils/segment";

export default function SegmentHead(): JSX.Element {
  return (
    <Head>
      {/* eslint-disable-next-line react/no-danger */}
      <script dangerouslySetInnerHTML={{__html: renderSnippet()}} />
    </Head>
  );
}
