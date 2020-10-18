/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Tab, {TabProps} from "@material-ui/core/Tab";
import Link, {LinkProps} from "next/link";

import * as React from "react";

export type MuiTabProps = Omit<TabProps, "href" | "classes"> &
  Pick<LinkProps, "href">;

const MuiTab = React.forwardRef<MuiTabProps, any>(({href, ...props}, ref) => (
  <Link href={href} passHref>
    <Tab ref={ref} {...props} />
  </Link>
));

export default MuiTab;
