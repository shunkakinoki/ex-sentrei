import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {deleteRoom} from "@sentrei/common/firebase/rooms";
import Member from "@sentrei/types/models/Member";
import FormDelete from "@sentrei/ui/components/FormDelete";
import FormSection from "@sentrei/ui/components/FormSection";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  role: Member.Role;
  roomId: string;
  namespaceId: string;
}

const RoomDeleteBoard = ({role, roomId, namespaceId}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.deleting"));
    try {
      await deleteRoom(roomId)?.then(() => {
        snackbar("success");
        backdrop("loading");
        Router.pushI18n("/[namespaceId]", `/${namespaceId}`);
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <>
      <FormSection
        icon={<DeleteForeverIcon />}
        title={t("room:room.deleteRoom")}
        size="md"
      />
      <FormDelete
        id={roomId}
        disabled={role !== "admin"}
        event="Delete Room"
        onSubmit={onSubmit}
        type="delete"
      />
    </>
  );
};

export default RoomDeleteBoard;
