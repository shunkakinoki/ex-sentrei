import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {deleteRoom} from "@sentrei/common/firebase/rooms";
import DeleteForm from "@sentrei/ui/components/DeleteForm";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  roomId: string;
  spaceId: string;
}

const RoomDeleteForm = ({roomId, spaceId}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("common:snackbar.deleting"));
    try {
      await deleteRoom(roomId)?.then(() => {
        snackbar("success");
        backdrop("loading");
        Router.pushI18n("/[spaceId]", `/${spaceId}`);
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <DeleteForm id={roomId} onSubmit={onSubmit} type="delete" />;
};

export default RoomDeleteForm;
