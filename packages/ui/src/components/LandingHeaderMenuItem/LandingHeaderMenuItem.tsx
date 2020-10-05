import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";
import * as React from "react";

import MuiListItem from "@sentrei/ui/components/MuiListItem";

export interface Props {
  href: string;
  rel?: string;
  target?: string;
  icon: JSX.Element;
  title: string;
  description?: string;
}

const LandingHeaderMenuItem = ({
  href,
  rel,
  target,
  icon,
  title,
  description,
}: Props): JSX.Element => {
  return (
    <MuiListItem href={href} rel={rel} target={target}>
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
    </MuiListItem>
  );
};

export default LandingHeaderMenuItem;
