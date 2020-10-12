/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Tab, {TabProps} from "@material-ui/core/Tab";
import Link from "next/link";
import {LinkProps} from "next/link";
import * as React from "react";

export type MuiTabProps = Omit<TabProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch">;

const MuiTab = React.forwardRef<MuiTabProps, any>(
  ({href, as, prefetch, ...props}, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <Tab ref={ref} {...props} />
    </Link>
  ),
);

export default MuiTab;
