import {yupResolver} from "@hookform/resolvers";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm, Controller} from "react-hook-form";
import * as Yup from "yup";

import {userEmoji} from "@sentrei/common/const/emoji";
import {createMember} from "@sentrei/common/firebase/members";
import {
  validateNamespace,
  getNamespace,
} from "@sentrei/common/firebase/namespaces";
import {getProfile} from "@sentrei/common/firebase/profiles";
import {timestamp} from "@sentrei/common/utils/firebase";

import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

const InviteFormUsername = ({profile, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const InviteFormUsernameSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("form:username.usernameRequired"))
      .matches(
        /^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/,
        t("form:username.usernameInvalid"),
      )
      .test("id", t("form:username.usernameNotExist"), async value => {
        const result = await validateNamespace(value || "");
        return !result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(InviteFormUsernameSchema),
  });

  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.inviting"));
    try {
      const namespace = await getNamespace(data.username);
      if (!namespace || namespace === null) {
        snackbar("error", "Namepspace not found");
        throw new Error("Namespace not found");
      }
      const memberProfile = await getProfile(namespace.uid).catch(err => {
        snackbar("error", err.message);
      });
      if (memberProfile) {
        const member: Member.Create = {
          createdAt: timestamp,
          createdBy: profile,
          createdByUid: user.uid,
          description: "",
          duration: 0,
          emoji: userEmoji(),
          name: memberProfile?.name,
          namespaceId: memberProfile?.namespaceId,
          photo: memberProfile?.photo,
          photoHash: memberProfile.photoHash,
          score: 0,
          status: "offline",
          role: "viewer",
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: user.uid,
          uid: memberProfile.uid,
        };
        await createMember(spaceId, memberProfile.uid, member)
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
          <FormButtonSubmit event="Send Invite Username">
            {t("space:invite.invite")}
          </FormButtonSubmit>
        </Grid>
        <Grid item xs={12}>
          <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
        </Grid>
      </Grid>
    </form>
  );
};

export default InviteFormUsername;
