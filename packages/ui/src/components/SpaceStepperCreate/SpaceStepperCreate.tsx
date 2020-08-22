import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {atom, RecoilState} from "recoil";

import SpaceCreateForm from "@sentrei/types/atom/SpaceCreateForm";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import SpaceStepperId from "@sentrei/ui/components/SpaceStepperId";
import SpaceStepperName from "@sentrei/ui/components/SpaceStepperName";
import SpaceStepperOther from "@sentrei/ui/components/SpaceStepperOther";
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

export default function SpaceCreate({profile, user}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
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
        <SpaceStepperOther
          atom={stepperState}
          form={spaceCreateForm}
          profile={profile}
          user={user}
        />
      }
    />
  );
}
