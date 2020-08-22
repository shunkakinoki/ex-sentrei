import {makeStyles, createStyles} from "@material-ui/core/styles";
import React from "react";

import SentreiTheme from "@sentrei/types/containers/SentreiTheme";
import MainParticipant from "@sentrei/video/components/MainParticipant";
import ParticipantStrip from "@sentrei/video/components/ParticipantStrip";

const useStyles = makeStyles((theme: SentreiTheme) =>
  createStyles({
    container: {
      position: "relative",
      height: "100%",
      display: "grid",
      gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
      gridTemplateAreas: '". participantList"',
      gridTemplateRows: "100%",
      [theme.breakpoints.down("xs")]: {
        gridTemplateAreas: '"participantList" "."',
        gridTemplateColumns: `auto`,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          theme.sidebarMobileHeight + 6
        }px`,
        gridGap: "6px",
      },
    },
  }),
);

export default function Room(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ParticipantStrip />
      <MainParticipant />
    </div>
  );
}
