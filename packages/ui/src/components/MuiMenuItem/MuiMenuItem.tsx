/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import MenuItem, {MenuItemProps} from "@material-ui/core/MenuItem";
import Link, {LinkProps} from "next/link";

import * as React from "react";

export type MuiMenuItemProps = Omit<MenuItemProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch">;

const MuiMenuItem = React.forwardRef<MuiMenuItemProps, any>(
  ({href, as, prefetch, ...props}, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <MenuItem component="a" ref={ref} {...props} />
    </Link>
  ),
);

export default MuiMenuItem;
