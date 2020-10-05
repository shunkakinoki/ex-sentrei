import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {useTheme} from "@material-ui/core/styles";
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
  const theme = useTheme();

  return (
    <MuiListItem href={href} rel={rel} target={target}>
      <ListItemIcon
        color={theme.palette.type === "light" ? "primary" : "textPrimary"}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            align="left"
            variant="subtitle1"
            color={theme.palette.type === "light" ? "primary" : "textPrimary"}
          >
            {title}
          </Typography>
        }
        secondary={
          description && (
            <Typography
              component="span"
              variant="body2"
              color={
                theme.palette.type === "light" ? "textPrimary" : "textSecondary"
              }
            >
              {description}
            </Typography>
          )
        }
      />
    </MuiListItem>
  );
};

export default LandingHeaderMenuItem;
