/* eslint-disable @typescript-eslint/no-unused-vars */

import CreateIcon from "@material-ui/icons/Create";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SettingsIcon from "@material-ui/icons/Settings";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import useTranslation from "next-locale/useTranslation";
import Router from "next/router";
import * as React from "react";

import SpaceFabStyles from "./SpaceFabStyles";

export interface Props {
  namespaceId?: string;
  type: "dashboard" | "space";
}

export default function SpaceFab({namespaceId, type}: Props): JSX.Element {
  const classes = SpaceFabStyles();
  const {t} = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="spaceFab"
        className={classes.speed}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {type === "dashboard" && (
          <SpeedDialAction
            key="create"
            icon={<CreateIcon />}
            tooltipTitle={t("space:space.createSpace")}
            tooltipOpen
            onClick={(): Promise<boolean> => Router.push("/create")}
          />
        )}
        {type === "space" && (
          <SpeedDialAction
            key="create"
            icon={<MeetingRoomIcon />}
            tooltipTitle={t("common:common.create")}
            tooltipOpen
            onClick={(): Promise<boolean> =>
              Router.push("/[namespaceId]/create", `/${namespaceId}/create`)
            }
          />
        )}
        {type === "space" && (
          <SpeedDialAction
            key="edit"
            icon={<EditIcon />}
            tooltipTitle={t("common:common.edit")}
            tooltipOpen
            onClick={(): Promise<boolean> =>
              Router.push("/[namespaceId]/edit", `/${namespaceId}/edit`)
            }
          />
        )}
        {type === "space" && (
          <SpeedDialAction
            key="member"
            icon={<GroupRoundedIcon />}
            tooltipTitle={t("common:common.members")}
            tooltipOpen
            onClick={(): Promise<boolean> =>
              Router.push("/[namespaceId]/members", `/${namespaceId}/members`)
            }
          />
        )}
        {type === "space" && (
          <SpeedDialAction
            key="settings"
            icon={<SettingsIcon />}
            tooltipTitle={t("common:common.settings")}
            tooltipOpen
            onClick={(): Promise<boolean> =>
              Router.push("/[namespaceId]/settings", `/${namespaceId}/settings`)
            }
          />
        )}
        {type === "space" && (
          <SpeedDialAction
            key="quit"
            icon={<ExitToAppIcon />}
            tooltipTitle={t("common:common.quit")}
            tooltipOpen
            onClick={(): Promise<boolean> =>
              Router.push("/[namespaceId]/quit", `/${namespaceId}/quit`)
            }
          />
        )}
      </SpeedDial>
    </div>
  );
}
