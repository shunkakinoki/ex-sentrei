/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import MenuItem, {MenuItemProps} from "@material-ui/core/MenuItem";
import Link, {LinkProps} from "next/link";

import * as React from "react";

export type MuiMenuItemProps = Omit<MenuItemProps, "href" | "classes"> &
  Pick<LinkProps, "href">;

const MuiMenuItem = React.forwardRef<MuiMenuItemProps, any>(
  ({href, ...props}, ref) => (
    <Link href={href} passHref>
      <MenuItem component="a" ref={ref} {...props} />
    </Link>
  ),
);

export default MuiMenuItem;
