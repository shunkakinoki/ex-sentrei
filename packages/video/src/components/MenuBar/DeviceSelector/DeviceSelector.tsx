import {DialogContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";

import AudioInputList from "./AudioInputList";
import AudioOutputList from "./AudioOutputList";
import VideoInputList from "./VideoInputList";

const useStyles = makeStyles({
  listSection: {
    margin: "2em 0",
    "&:first-child": {
      margin: "1em 0 2em 0",
    },
  },
});

export default function DeviceSelector({
  className,
  hidden,
}: {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  hidden?: boolean;
}): JSX.Element {
  const classes = useStyles();

  return (
    <DialogContent className={className} hidden={hidden}>
      <div className={classes.listSection}>
        <AudioInputList />
      </div>
      <div className={classes.listSection}>
        <AudioOutputList />
      </div>
      <div className={classes.listSection}>
        <VideoInputList />
      </div>
    </DialogContent>
  );
}
