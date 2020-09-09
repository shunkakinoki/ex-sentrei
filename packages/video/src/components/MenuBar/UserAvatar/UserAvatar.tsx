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
  user,
}: {
  user: StateContextType["user"];
}): JSX.Element {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {displayName, photoURL} = user!;

  return photoURL ? (
    <Avatar src={photoURL} />
  ) : (
    <Avatar className={classes.red}>
      {/* @ts-ignore */}
      {displayName ? getInitials(displayName) : <Person />}
    </Avatar>
  );
}
