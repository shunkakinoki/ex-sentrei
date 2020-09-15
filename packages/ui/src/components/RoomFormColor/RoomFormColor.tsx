import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {CirclePicker, ColorResult} from "react-color";
import {useForm} from "react-hook-form";

import {updateRoom} from "@sentrei/common/firebase/rooms";
import {timestamp} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  room: Room.Get;
  user: User.Get;
}

const RoomFormColor = ({profile, room, user}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [color, setColor] = React.useState<string>(room.color);
  const handleChange = (col: ColorResult): void => setColor(col.hex);

  const {handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await updateRoom(
        {
          color,
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: user.uid,
        },
        room.id,
      )?.then(() => {
        snackbar("success");
        trackEvent("Edit Room Picture");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <>
      <Box pb={5} display="flex" justifyContent="center">
        <CirclePicker color={color as string} onChangeComplete={handleChange} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormButtonSubmit>{t("common:common.edit")}</FormButtonSubmit>
          </Grid>
          <Grid item xs={12}>
            <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RoomFormColor;
