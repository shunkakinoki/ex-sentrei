import {yupResolver} from "@hookform/resolvers";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {createInvite} from "@sentrei/common/firebase/invites";
import {timestamp} from "@sentrei/common/utils/firebase";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

const InviteFormEmail = ({profile, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const InviteFormEmailSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("form:email.required"))
      .email(t("form:email.valid")),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(InviteFormEmailSchema),
  });

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      await createInvite(spaceId, {
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: user.uid,
        email: data.email,
        method: "email",
        spaceId,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: user.uid,
        window: window.location.origin,
      })?.then(() => {
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
                id="email"
                label={t("common:common.email")}
                margin="normal"
                name="email"
                required
                variant="outlined"
                error={!!errors.email}
                inputRef={register}
                helperText={errors.email ? errors.email.message : ""}
                type="text"
              />
            }
            name="email"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <FormButtonSubmit event="Send Invite Email">
            {t("common:common.invite")}
          </FormButtonSubmit>
        </Grid>
      </Grid>
    </form>
  );
};

export default InviteFormEmail;
