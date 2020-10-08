import {yupResolver} from "@hookform/resolvers/yup";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {updateSpace} from "@sentrei/common/firebase/spaces";

import {timestamp} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";

import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  disabled: boolean;
  profile: Profile.Get;
  space: Space.Get;
  user: User.Get;
}

const SpaceFormName = ({
  disabled,
  profile,
  space,
  user,
}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const SpaceFormNameSchema = Yup.object().shape({
    name: Yup.string(),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(SpaceFormNameSchema),
  });

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await updateSpace(
        {
          name: data.name,
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: user.uid,
        },
        space.id,
      )?.then(() => {
        snackbar("success");
        trackEvent("Edit Space Name");
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
                id="space-name"
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
            defaultValue={space.name}
          />
        </Grid>
        <Grid item xs={12}>
          <FormButtonSubmit>{t("common:common.edit")}</FormButtonSubmit>
        </Grid>
        <Grid item xs={12}>
          <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
        </Grid>
      </Grid>
    </form>
  );
};

export default SpaceFormName;
