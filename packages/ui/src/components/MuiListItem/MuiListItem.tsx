/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ListItem, {ListItemProps} from "@material-ui/core/ListItem";
import Link, {LinkProps} from "next/link";

import * as React from "react";

export type MuiListItemProps = Omit<ListItemProps, "href" | "classes"> &
  Pick<LinkProps, "href">;

const MuiListItem = React.forwardRef<MuiListItemProps, any>(
  ({href, ...props}, ref) => (
    <Link href={href} passHref>
      <ListItem button component="a" ref={ref} {...props} />
    </Link>
  ),
);

export default MuiListItem;
