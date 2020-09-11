import {yupResolver} from "@hookform/resolvers";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {updateRoom} from "@sentrei/common/firebase/rooms";

import {timestamp} from "@sentrei/common/utils/firebase";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  disabled: boolean;
  profile: Profile.Get;
  room: Room.Get;
  user: User.Get;
}

const RoomFormName = ({disabled, profile, room, user}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const RoomFormNameSchema = Yup.object().shape({
    name: Yup.string(),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(RoomFormNameSchema),
  });

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await updateRoom(
        {
          name: data.name,
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: user.uid,
        },
        room.id,
      )?.then(() => {
        snackbar("success");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                autoFocus
                fullWidth
                disabled={disabled}
                id="room-name"
                label={t("common:common.name")}
                margin="normal"
                name="name"
                required
                variant="outlined"
                error={!!errors.name}
                inputRef={register}
                helperText={errors.name ? errors.name.message : ""}
                type="text"
              />
            }
            name="name"
            control={control}
            defaultValue={room.name}
          />
        </Grid>
        <Grid item xs={12}>
          <FormButtonSubmit event="Edit Room Name">
            {t("common:common.edit")}
          </FormButtonSubmit>
        </Grid>
        <Grid item xs={12}>
          <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
        </Grid>
      </Grid>
    </form>
  );
};

export default RoomFormName;
