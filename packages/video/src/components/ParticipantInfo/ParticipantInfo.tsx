import {createStyles, makeStyles} from "@material-ui/core/styles";

import ScreenShare from "@material-ui/icons/ScreenShare";
import VideocamOff from "@material-ui/icons/VideocamOff";
import clsx from "clsx";
import React from "react";
import {
  LocalAudioTrack,
  LocalVideoTrack,
  Participant,
  RemoteAudioTrack,
  RemoteVideoTrack,
} from "twilio-video";

import SentreiTheme from "@sentrei/types/containers/SentreiTheme";

import AudioLevelIndicator from "@sentrei/video/components/AudioLevelIndicator";
import BandwidthWarning from "@sentrei/video/components/BandwidthWarning";
import NetworkQualityLevel from "@sentrei/video/components/NetworkQualityLevel";
import useIsTrackSwitchedOff from "@sentrei/video/hooks/useIsTrackSwitchedOff";
import useParticipantNetworkQualityLevel from "@sentrei/video/hooks/useParticipantNetworkQualityLevel";
import usePublications from "@sentrei/video/hooks/usePublications";
import useTrack from "@sentrei/video/hooks/useTrack";

import ParticipantConnectionIndicator from "./ParticipantConnectionIndicator";
import PinIcon from "./PinIcon";

const useStyles = makeStyles((theme: SentreiTheme) =>
  createStyles({
    container: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      height: `${(theme.sidebarWidth * 9) / 16}px`,
      overflow: "hidden",
      cursor: "pointer",
      "& video": {
        filter: "none",
      },
      "& svg": {
        stroke: "black",
        strokeWidth: "0.8px",
      },
      [theme.breakpoints.down("xs")]: {
        height: theme.sidebarMobileHeight,
        width: `${(theme.sidebarMobileHeight * 16) / 9}px`,
        marginRight: "3px",
        fontSize: "10px",
      },
    },
    isVideoSwitchedOff: {
      "& video": {
        filter: "blur(4px) grayscale(1) brightness(0.5)",
      },
    },
    infoContainer: {
      position: "absolute",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      padding: "0.4em",
      width: "100%",
      background: "transparent",
    },
    hideVideo: {
      background: "black",
    },
    identity: {
      background: "rgba(0, 0, 0, 0.7)",
      padding: "0.1em 0.3em",
      margin: 0,
      display: "flex",
      alignItems: "center",
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
    },
  }),
);

interface ParticipantInfoProps {
  participant: Participant;
  children: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
}

export default function ParticipantInfo({
  participant,
  onClick,
  isSelected,
  children,
}: ParticipantInfoProps): JSX.Element {
  const publications = usePublications(participant);

  const audioPublication = publications.find(p => p.kind === "audio");
  const videoPublication = publications.find(p =>
    p.trackName.includes("camera"),
  );

  const networkQualityLevel = useParticipantNetworkQualityLevel(participant);
  const isVideoEnabled = Boolean(videoPublication);
  const isScreenShareEnabled = publications.find(p =>
    p.trackName.includes("screen"),
  );

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(
    videoTrack as LocalVideoTrack | RemoteVideoTrack,
  );

  const audioTrack = useTrack(audioPublication) as
    | LocalAudioTrack
    | RemoteAudioTrack;

  const classes = useStyles();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={clsx(classes.container, {
        [classes.isVideoSwitchedOff]: isVideoSwitchedOff,
      })}
      onClick={onClick}
      data-cy-participant={participant.identity}
    >
      <div
        className={clsx(classes.infoContainer, {
          [classes.hideVideo]: !isVideoEnabled,
        })}
      >
        <div className={classes.infoRow}>
          <h4 className={classes.identity}>
            <ParticipantConnectionIndicator participant={participant} />
            {participant.identity}
          </h4>
          <NetworkQualityLevel qualityLevel={networkQualityLevel} />
        </div>
        <div>
          <AudioLevelIndicator audioTrack={audioTrack} background="white" />
          {!isVideoEnabled && <VideocamOff />}
          {isScreenShareEnabled && <ScreenShare />}
          {isSelected && <PinIcon />}
        </div>
      </div>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </div>
  );
}
