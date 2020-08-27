import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MuiLink from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import PublicIcon from "@material-ui/icons/Public";
import TwitterIcon from "@material-ui/icons/Twitter";
import * as React from "react";
import Avatar from "react-avatar";

import AboutTeamCardStyles from "./AboutTeamCardStyles";

export interface Props {
  name: string;
  github?: string;
  twitter: string;
  website?: string;
}

export default function AboutTeamCard({
  name,
  github,
  twitter,
  website,
}: Props): JSX.Element {
  const classes = AboutTeamCardStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.item}>
          <Avatar
            githubHandle="shunkakinoki"
            twitterHandle={github ?? twitter}
            round
            className={classes.avatar}
          />
        </div>
        <Box m={1} />
        <Typography noWrap variant="h5" className={classes.title}>
          {name}
        </Typography>
        <Box m={1} />
        <ListItem>
          <ListItemIcon>
            <TwitterIcon color="primary" />
          </ListItemIcon>
          <MuiLink href={`https://twitter.com/${twitter}`} target="_blank">
            <ListItemText
              primaryTypographyProps={{
                noWrap: true,
                align: "left",
                component: "p",
                variant: "subtitle1",
              }}
            >
              @{twitter}
            </ListItemText>
          </MuiLink>
        </ListItem>
        {github && (
          <ListItem>
            <ListItemIcon>
              <GitHubIcon color="primary" />
            </ListItemIcon>
            <MuiLink href={`https://github.com/${github}`} target="_blank">
              <ListItemText
                primaryTypographyProps={{
                  noWrap: true,
                  align: "left",
                  component: "p",
                  variant: "subtitle1",
                }}
              >
                @{github}
              </ListItemText>
            </MuiLink>
          </ListItem>
        )}
        {website && (
          <ListItem>
            <ListItemIcon>
              <PublicIcon color="primary" />
            </ListItemIcon>
            <MuiLink href={`https://${website}`} target="_blank">
              <ListItemText
                primaryTypographyProps={{
                  noWrap: true,
                  align: "left",
                  component: "p",
                  variant: "subtitle1",
                }}
              >
                {website}
              </ListItemText>
            </MuiLink>
          </ListItem>
        )}
      </CardContent>
    </Card>
  );
}
