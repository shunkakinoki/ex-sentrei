import Avatar from "@material-ui/core/Avatar";
import React from "react";

import {StateContextType} from "@sentrei/video/state";

export default function UserAvatar({
  user,
}: {
  user: StateContextType["user"];
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {photoURL} = user!;

  return <Avatar src={photoURL ?? undefined} />;
}
