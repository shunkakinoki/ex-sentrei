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

import {inviteMember} from "@sentrei/common/firebase/members";
import {getProfileUsername} from "@sentrei/common/firebase/profiles";
import {validateUsername} from "@sentrei/common/firebase/usernames";
import {timestamp} from "@sentrei/common/utils/firebase";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

const InviteUsernameForm = ({profile, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const InviteUsernameFormSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("form:username.usernameRequired"))
      // .matches(
      //   /^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/,
      //   t("form:username.usernameInvalid"),
      // )
      .test("id", t("form:username.usernameNotExist"), async value => {
        const result = await validateUsername(value || "");
        return !result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(InviteUsernameFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.inviting"));
    try {
      const memberProfile = await getProfileUsername(data.username).catch(
        err => {
          snackbar("error", err.message);
        },
      );
      if (memberProfile && memberProfile !== null) {
        const member: Member.Create = {
          createdAt: timestamp,
          createdBy: profile,
          createdByUid: user.uid,
          description: "",
          duration: 0,
          emoji: "joy",
          name: memberProfile.name,
          photo: memberProfile.photo,
          photoHash: memberProfile.photoHash,
          score: 0,
          status: "offline",
          role: "viewer",
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: user.uid,
          uid: memberProfile.uid,
          username: memberProfile.username,
        };
        await inviteMember(spaceId, memberProfile.uid, member)
          ?.then(() => {
            snackbar("success");
          })
          .catch(err => {
            snackbar("error", err.message);
          });
      }
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
                id="username"
                label={t("common:common.username")}
                margin="normal"
                name="username"
                required
                variant="outlined"
                error={!!errors.username}
                inputRef={register}
                helperText={errors.username ? errors.username.message : ""}
                type="text"
              />
            }
            name="username"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t("space:invite.invite")}
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

export default InviteUsernameForm;
