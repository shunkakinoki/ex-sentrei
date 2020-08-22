import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";

import {StateContextType} from "@sentrei/video/state";

const useStyles = makeStyles({
  red: {
    color: "white",
    backgroundColor: "#F22F46",
  },
});

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(text => text[0])
    .join("")
    .toUpperCase();
}

export default function UserAvatar({
  // eslint-disable-next-line react/prop-types
  profile,
}: {
  profile: StateContextType["profile"];
}): JSX.Element {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {name, photo} = profile!;

  return photo ? (
    <Avatar src={photo} />
  ) : (
    <Avatar className={classes.red}>
      {name ? getInitials(name) : <Person />}
    </Avatar>
  );
}
