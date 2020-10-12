import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useTranslation from "next-locale/useTranslation";
import Router from "next/router";
import * as React from "react";

import {quitRoom} from "@sentrei/common/firebase/rooms";
import {trackEvent} from "@sentrei/common/utils/segment";
import Member from "@sentrei/types/models/Member";
import Room from "@sentrei/types/models/Room";
import FormQuit from "@sentrei/ui/components/FormQuit";
import FormSection from "@sentrei/ui/components/FormSection";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  namespaceId: string;
  role: Member.Role;
  room: Room.Get;
  roomId: string;
  userId: string;
}

const RoomQuitBoard = ({
  namespaceId,
  role,
  room,
  roomId,
  userId,
}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.quiting"));
    try {
      await quitRoom(roomId, userId)?.then(() => {
        snackbar("success", t("snackbar:snackbar.quitted"));
        trackEvent("Quit Room");
        backdrop("loading");
        Router.push("/[namespaceId]", `/${namespaceId}`);
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <>
      <FormSection
        icon={<ExitToAppIcon />}
        title={t("room:room.quitRoom")}
        size="md"
      />
      <FormQuit
        id={roomId}
        disabled={role !== "admin" || room.id.length > 0}
        onSubmit={onSubmit}
        type="quit"
      />
    </>
  );
};

export default RoomQuitBoard;
