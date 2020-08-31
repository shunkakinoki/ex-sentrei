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

import {createMember} from "@sentrei/common/firebase/members";
import {validateNamespace} from "@sentrei/common/firebase/namespaces";
import {getProfile} from "@sentrei/common/firebase/profiles";
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

const InviteUserForm = ({profile, user, spaceId}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const InviteUserFormSchema = Yup.object().shape({
    namespace: Yup.string()
      .required(t("form:namespace.namespaceRequired"))
      // .matches(
      //   /^[a-z0-9][a-z0-9_]*([.][a-z0-9_]+)*$/,
      //   t("form:namespace.namespaceInvalid"),
      // )
      .test("id", t("form:namespace.namespaceNotExist"), async value => {
        const result = await validateNamespace(value || "");
        return !result;
      }),
  });

  const {control, register, errors, handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(InviteUserFormSchema),
  });

  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.inviting"));
    try {
      const memberProfile = await getProfile(data.namespace).catch(err => {
        snackbar("error", err.message);
      });
      if (memberProfile && memberProfile !== null) {
        const member: Member.Create = {
          createdAt: timestamp,
          createdBy: profile,
          createdByUid: user.uid,
          description: "",
          duration: 0,
          emoji: "joy",
          name: memberProfile.name,
          namespaceId: memberProfile.namespaceId,
          photo: memberProfile.photo,
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
                id="namespace"
                label={t("common:common.namespace")}
                margin="normal"
                name="namespace"
                required
                variant="outlined"
                error={!!errors.namespace}
                inputRef={register}
                helperText={errors.namespace ? errors.namespace.message : ""}
                type="text"
              />
            }
            name="namespace"
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

export default InviteUserForm;
