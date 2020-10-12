import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-locale/useTranslation";
import Router from "next/router";
import * as React from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, RecoilState} from "recoil";

import {InitialRoomColor} from "@sentrei/common/const/color";
import {roomEmoji} from "@sentrei/common/const/emoji";
import {createRoom} from "@sentrei/common/firebase/rooms";
import {timestamp} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import RoomCreateForm from "@sentrei/types/atom/RoomCreateForm";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import StepperButton from "@sentrei/ui/components/StepperButton";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  atom: RecoilState<number>;
  form: RecoilState<RoomCreateForm>;
  profile: Profile.Get;
  user: User.Get;
  spaceId: string;
}

const RoomStepperSubmit = ({
  atom,
  form,
  profile,
  user,
  spaceId,
}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const [type, setType] = React.useState<Room.Types>("focus");
  const [, setActiveStep] = useRecoilState<number>(atom);
  const [activeForm, setActiveForm] = useRecoilState<RoomCreateForm>(form);

  const handleChange = (event: React.ChangeEvent<{value: unknown}>): void => {
    setType(event.target.value as Room.Types);
  };

  const {handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.creating"));
    try {
      await createRoom({
        color: InitialRoomColor,
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: user.uid,
        description: null,
        emoji: roomEmoji(),
        participantCount: 0,
        name: activeForm.name,
        nameroomId: activeForm.id,
        spaceId,
        type,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: user.uid,
      })?.then(() => {
        snackbar("success");
        trackEvent("Create Room");
        backdrop("loading");
        setActiveForm({id: "", name: "", type: "focus"});
        setActiveStep(0);
        Router.back();
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Box p={3}>
        <Grid container justify="center" alignItems="center">
          <FormControl>
            <TextField
              fullWidth
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
      <StepperButton atom={atom} />
    </form>
  );
};

export default RoomStepperSubmit;
