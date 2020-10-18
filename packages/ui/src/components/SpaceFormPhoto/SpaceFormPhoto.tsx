import useTranslation from "next-locale/useTranslation";
import Router from "next/router";
import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import FormPhoto from "@sentrei/ui/components/FormPhoto";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  disabled?: boolean;
  profile: Profile.Get;
  space: Space.Get;
}

const SpaceFormPhoto = ({
  disabled = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  space,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  profile,
}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {t} = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [photo, setPhoto] = React.useState<string>(space.photo || "#f44336");

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.deleting"));
    try {
      snackbar("success");
      trackEvent("Edit Space Photo");
      await Router.replace("/dashboard");
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <FormPhoto disabled={disabled} type="rect" onSubmit={onSubmit} />;
};

export default SpaceFormPhoto;
