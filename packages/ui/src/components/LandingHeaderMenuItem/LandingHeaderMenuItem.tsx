/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ListItem, {ListItemProps} from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";
import Link from "next-translate/Link";
import {LinkProps} from "next/link";
import * as React from "react";

export type MuiListItemProps = Omit<ListItemProps, "href" | "classes"> &
  Pick<LinkProps, "href" | "as" | "prefetch"> & {
    icon: JSX.Element;
    title: string;
    description?: string;
  };

const LandingHeaderMenuItem = React.forwardRef<MuiListItemProps, any>(
  ({href, as, prefetch, icon, title, description, ...props}, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <ListItem button component="a" ref={ref} {...props}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography align="left" variant="subtitle1" color="primary">
              {title}
            </Typography>
          }
          secondary={
            description && (
              <Typography component="span" variant="body2" color="textPrimary">
                {description}
              </Typography>
            )
          }
        />
      </ListItem>
    </Link>
  ),
);

export default LandingHeaderMenuItem;
