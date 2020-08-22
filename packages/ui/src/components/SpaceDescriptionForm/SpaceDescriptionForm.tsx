/* eslint-disable @typescript-eslint/no-explicit-any */

import {yupResolver} from "@hookform/resolvers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {updateSpace} from "@sentrei/common/firebase/spaces";

import {timestamp} from "@sentrei/common/utils/firebase";

import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  space: Space.Get;
  user: User.Get;
}

const SpaceDescriptionForm = ({profile, space, user}: Props): JSX.Element => {
  const {t} = useTranslation();

  const {snackbar} = useSnackbar();

  const SpaceDescriptionFormSchema = Yup.object().shape({
    description: Yup.string(),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(SpaceDescriptionFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.editing"));
    try {
      await updateSpace(
        {
          description: data.description,
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: user.uid,
        },
        space.id,
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
                id="space-description"
                label={t("common:common.description")}
                margin="normal"
                name="description"
                required
                variant="outlined"
                error={!!errors.description}
                inputRef={register}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                type="text"
              />
            }
            name="description"
            control={control}
            defaultValue={space.description}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t("common:common.edit")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="reset"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={(): void => Router.back()}
          >
            {t("common:common.cancel")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SpaceDescriptionForm;
