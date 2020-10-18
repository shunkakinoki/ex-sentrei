import Box from "@material-ui/core/Box";
import useTranslation from "next-locale/useTranslation";
import Router from "next/router";
import * as React from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, RecoilState} from "recoil";

import {createSpace} from "@sentrei/common/firebase/spaces";
import {timestamp} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import SpaceCreateForm from "@sentrei/types/atom/SpaceCreateForm";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import StepperButton from "@sentrei/ui/components/StepperButton";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  atom: RecoilState<number>;
  form: RecoilState<SpaceCreateForm>;
  profile: Profile.Get;
  user: User.Get;
}

const SpaceStepperSubmit = ({
  atom,
  form,
  profile,
  user,
}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();

  const [, setActiveStep] = useRecoilState<number>(atom);
  const [activeForm, setActiveForm] = useRecoilState<SpaceCreateForm>(form);

  const {handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: Record<string, string>): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.creating"));
    try {
      await createSpace({
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: user.uid,
        description: null,
        photo: null,
        photoHash: null,
        memberCount: 0,
        name: activeForm.name,
        namespaceId: activeForm.id,
        roomCount: 0,
        stripeId: "",
        tier: "free",
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: user.uid,
      })?.then(() => {
        snackbar("success");
        trackEvent("Create Space");
        backdrop("loading");
        setActiveForm({id: "", name: ""});
        setActiveStep(0);
        Router.replace("/dashboard");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <Box p={1} />
      <StepperButton atom={atom} />
    </form>
  );
};

export default SpaceStepperSubmit;
