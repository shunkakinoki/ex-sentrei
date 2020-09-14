import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {atom, RecoilState} from "recoil";

import RoomCreateForm from "@sentrei/types/atom/RoomCreateForm";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomStepperId from "@sentrei/ui/components/RoomStepperId";
import RoomStepperName from "@sentrei/ui/components/RoomStepperName";
import RoomStepperSubmit from "@sentrei/ui/components/RoomStepperSubmit";
import StepperBoard from "@sentrei/ui/components/StepperBoard";

export interface Props {
  profile: Profile.Get;
  user: User.Get;
  spaceId: string;
  namespaceId: string;
}

const stepperState: RecoilState<number> = atom({
  key: "stepperState",
  default: 0,
});

const roomCreateForm: RecoilState<RoomCreateForm> = atom({
  key: "roomCreate",
  default: {id: "", name: "", type: "focus"} as RoomCreateForm,
});

export default function RoomCreateBoard({
  profile,
  user,
  spaceId,
  namespaceId,
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
        stepperLabelOne={t("common:common.id")}
        stepperLabelTwo={t("common:common.name")}
        stepperLabelThree={t("common:common.type")}
        stepperPanelOne={
          <RoomStepperId
            atom={stepperState}
            form={roomCreateForm}
            spaceId={spaceId}
            namespaceId={namespaceId}
          />
        }
        stepperPanelTwo={
          <RoomStepperName atom={stepperState} form={roomCreateForm} />
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
