import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {Emoji} from "emoji-mart";
import * as React from "react";

import Member from "@sentrei/types/models/Member";
import ProfileCard from "@sentrei/ui/components/ProfileCard";

import MemberListItemStyles from "./MemberListItemStyles";

export interface Props {
  member: Member.Get;
}

export default function MemberListItem({member}: Props): JSX.Element {
  const classes = MemberListItemStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <ProfileCard member={member} />
      </ListItemAvatar>
      <ListItemText
        primary={member.name}
        secondary={
          <div className={classes.root}>
            <Emoji emoji={member.emoji} set="twitter" size={20} />
            &nbsp; &nbsp; &nbsp;
            <Typography component="span" variant="body2" color="textSecondary">
              {member.description}
            </Typography>
          </div>
        }
      />
      <ListItemSecondaryAction />
    </ListItem>
  );
}
