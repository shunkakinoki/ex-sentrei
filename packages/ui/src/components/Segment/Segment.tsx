import NoSsr from "@material-ui/core/NoSsr";
import {Head} from "next/document";
import * as React from "react";

import {renderSnippet} from "@sentrei/common/utils/segment";

export default function Segment(): JSX.Element {
  return (
    <Head>
      <NoSsr>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{__html: renderSnippet()}} />
      </NoSsr>
    </Head>
  );
}
