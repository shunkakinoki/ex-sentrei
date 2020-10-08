import {yupResolver} from "@hookform/resolvers/yup";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {updateMember} from "@sentrei/common/firebase/members";
import {timestamp} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

import SpacePanelDescriptionFormStyles from "./SpacePanelDescriptionFormStyles";

export interface Props {
  profile: Profile.Get;
  member: Member.Get;
  spaceId: string;
  userId: string;
}

export default function SpacePanelDescriptionForm({
  member,
  profile,
  spaceId,
  userId,
}: Props): JSX.Element {
  const classes = SpacePanelDescriptionFormStyles();
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [empty, setEmpty] = React.useState<boolean>(
    member.description.length === 0,
  );
  const [progress, setProgress] = React.useState<boolean>(empty);

  const SpaceDescriptionFormSchema = Yup.object().shape({
    description: Yup.string(),
  });

  const {control, watch, handleSubmit, reset} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(SpaceDescriptionFormSchema),
  });

  const watchInput = watch("description", false);

  React.useEffect(() => {
    if (watchInput === member.description) {
      setProgress(false);
    } else if (watchInput !== member.description) {
      setProgress(true);
    } else {
      setEmpty(true);
      setProgress(false);
    }
  }, [watchInput, member.description]);

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.updating"));
    try {
      await updateMember(spaceId, userId, {
        description: data.description,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: userId,
      });
      setEmpty(false);
      setProgress(false);
      snackbar("success", t("snackbar:snackbar.updated"));
      trackEvent("Update Member Description");
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  const handleClear = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.clearing"));
    try {
      await updateMember(spaceId, userId, {
        description: "",
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: userId,
      });
      setEmpty(true);
      setProgress(false);
      reset();
      snackbar("success", t("snackbar:snackbar.cleared"));
      trackEvent("Clear Member Description");
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Box display="flex">
          <Box p={1} flexGrow={1}>
            <Controller
              as={
                <Input
                  fullWidth
                  disableUnderline={!progress}
                  placeholder={t("common:common.writeYourStatus")}
                  inputProps={{"aria-label": "write your status"}}
                />
              }
              name="description"
              control={control}
              defaultValue={member.description}
            />
          </Box>
          <Box flexShrink={1}>
            {empty ? (
              <IconButton type="submit" aria-label="return">
                <KeyboardReturnIcon />
              </IconButton>
            ) : progress ? (
              <IconButton type="submit" aria-label="return">
                <KeyboardReturnIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="clear" onClick={handleClear}>
                <HighlightOffIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </form>
    </div>
  );
}
