import Box from "@material-ui/core/Box";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
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
  disabled: boolean;
  profile: Profile.Get;
  room: Room.Get;
  user: User.Get;
}

const RoomFormType = ({disabled, profile, room, user}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [type, setType] = React.useState<Room.Types>("focus");
  const handleChange = (event: React.ChangeEvent<{value: unknown}>): void => {
    setType(event.target.value as Room.Types);
  };

  const {handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await updateRoom(
        {
          type,
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
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Box p={3}>
            <Grid container justify="center" alignItems="center">
              <FormControl>
                <TextField
                  fullWidth
                  disabled={disabled}
                  id="select"
                  select
                  size="medium"
                  variant="outlined"
                  value={type}
                  onChange={handleChange}
                >
                  <MenuItem value="bond">{t("common:common.bond")}</MenuItem>
                  <MenuItem value="focus">{t("common:common.focus")}</MenuItem>
                  <MenuItem value="work">{t("common:common.work")}</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <FormButtonSubmit disabled={disabled}>
              {t("common:common.edit")}
            </FormButtonSubmit>
          </Grid>
          <Grid item xs={12}>
            <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RoomFormType;
