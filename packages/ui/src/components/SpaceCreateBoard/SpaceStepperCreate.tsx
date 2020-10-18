import PeopleIcon from "@material-ui/icons/People";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";
import {atom, RecoilState} from "recoil";

import SpaceCreateForm from "@sentrei/types/atom/SpaceCreateForm";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import SpaceStepperId from "@sentrei/ui/components/SpaceStepperId";
import SpaceStepperName from "@sentrei/ui/components/SpaceStepperName";
import SpaceStepperSubmit from "@sentrei/ui/components/SpaceStepperSubmit";
import StepperBoard from "@sentrei/ui/components/StepperBoard";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
}

const stepperState: RecoilState<number> = atom({
  key: "stepperState",
  default: 0,
});

const spaceCreateForm: RecoilState<SpaceCreateForm> = atom({
  key: "spaceCreate",
  default: {id: "", name: ""} as SpaceCreateForm,
});

export default function SpaceStepperCreate({
  profile,
  user,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <FormSection icon={<PeopleIcon />} title={t("space:space.createSpace")} />
      <StepperBoard
        atom={stepperState}
        stepperLabelOne={t("common:common.id")}
        stepperLabelTwo={t("common:common.name")}
        stepperLabelThree={t("common:common.other")}
        stepperPanelOne={
          <SpaceStepperId atom={stepperState} form={spaceCreateForm} />
        }
        stepperPanelTwo={
          <SpaceStepperName atom={stepperState} form={spaceCreateForm} />
        }
        stepperPanelThree={
          <SpaceStepperSubmit
            atom={stepperState}
            form={spaceCreateForm}
            profile={profile}
            user={user}
          />
        }
      />
    </>
  );
}
