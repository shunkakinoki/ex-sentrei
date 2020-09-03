import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {atom, RecoilState} from "recoil";

import RoomCreateForm from "@sentrei/types/atom/RoomCreateForm";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomStepperName from "@sentrei/ui/components/RoomStepperName";
import RoomStepperSubmit from "@sentrei/ui/components/RoomStepperSubmit";
import RoomStepperType from "@sentrei/ui/components/RoomStepperType";
import StepperBoard from "@sentrei/ui/components/StepperBoard";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
  spaceId: string;
}

const stepperState: RecoilState<number> = atom({
  key: "stepperState",
  default: 0,
});

const roomCreateForm: RecoilState<RoomCreateForm> = atom({
  key: "roomCreate",
  default: {name: "", type: "focus"} as RoomCreateForm,
});

export default function RoomCreateBoard({
  profile,
  user,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <FormSection
        icon={<AddToPhotosIcon />}
        title={t("room:room.createRoom")}
      />
      <StepperBoard
        atom={stepperState}
        stepperLabelOne={t("common:common.name")}
        stepperLabelTwo={t("common:common.type")}
        stepperLabelThree={t("common:common.other")}
        stepperPanelOne={
          <RoomStepperName atom={stepperState} form={roomCreateForm} />
        }
        stepperPanelTwo={
          <RoomStepperType atom={stepperState} form={roomCreateForm} />
        }
        stepperPanelThree={
          <RoomStepperSubmit
            atom={stepperState}
            form={roomCreateForm}
            profile={profile}
            user={user}
            spaceId={spaceId}
          />
        }
      />
    </>
  );
}
