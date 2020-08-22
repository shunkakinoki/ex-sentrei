/* eslint-disable @typescript-eslint/no-explicit-any */

import Box from "@material-ui/core/Box";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, RecoilState} from "recoil";

import {createRoom} from "@sentrei/common/firebase/rooms";
import {timestamp} from "@sentrei/common/utils/firebase";
import RoomCreateForm from "@sentrei/types/atom/RoomCreateForm";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import StepperButton from "@sentrei/ui/components/StepperButton";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  atom: RecoilState<number>;
  form: RecoilState<RoomCreateForm>;
  profile: Profile.Get;
  user: User.Get;
  spaceId: string;
}

const RoomStepperOther = ({
  atom,
  form,
  profile,
  user,
  spaceId,
}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const [, setActiveStep] = useRecoilState<number>(atom);
  const [activeForm, setActiveForm] = useRecoilState<RoomCreateForm>(form);

  const {handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.creating"));
    try {
      await createRoom({
        name: activeForm.name,
        description: null,
        emoji: ":sushi:",
        photo: null,
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: user.uid,
        memberCount: 0,
        type: activeForm.type,
        spaceId,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: user.uid,
      })?.then(() => {
        snackbar("success");
        backdrop("loading");
        setActiveForm({name: "", type: "focus"});
        setActiveStep(0);
        setTimeout(() => {
          Router.pushI18n("/[spaceId]", `/${spaceId}`);
        }, 1500);
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Box p={1} />
      <StepperButton atom={atom} last={2} />
    </form>
  );
};

export default RoomStepperOther;
