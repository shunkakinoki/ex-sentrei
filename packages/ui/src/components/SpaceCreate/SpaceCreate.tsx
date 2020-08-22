import PeopleIcon from "@material-ui/icons/People";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import SpaceStepperCreate from "@sentrei/ui/components/SpaceStepperCreate";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

export default function SpaceCreate({profile, user}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <FormSection icon={<PeopleIcon />} title={t("space:space.createSpace")} />
      <SpaceStepperCreate profile={profile} user={user} />
    </>
  );
}
