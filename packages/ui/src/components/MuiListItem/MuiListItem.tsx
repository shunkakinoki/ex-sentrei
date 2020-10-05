/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ListItem, {ListItemProps} from "@material-ui/core/ListItem";
import Link from "next-translate/Link";
import {LinkProps} from "next/link";
import * as React from "react";

export type MuiListItemProps = Omit<ListItemProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch">;

const MuiListItem = React.forwardRef<MuiListItemProps, any>(
  ({href, as, prefetch, ...props}, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <ListItem button component="a" ref={ref} {...props} />
    </Link>
  ),
);

export default MuiListItem;
