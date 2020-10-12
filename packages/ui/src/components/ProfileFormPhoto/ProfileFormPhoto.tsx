import useTranslation from "next-locale/useTranslation";
import Router from "next/router";
import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";
import Profile from "@sentrei/types/models/Profile";
import FormPhoto from "@sentrei/ui/components/FormPhoto";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  disabled?: boolean;
  profile: Profile.Get;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProfileFormPhoto = ({disabled = false, profile}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.deleting"));
    try {
      snackbar("success");
      trackEvent("Edit Profile Photo");
      await Router.replace("/dashboard");
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <FormPhoto disabled={disabled} type="round" onSubmit={onSubmit} />;
};

export default ProfileFormPhoto;
