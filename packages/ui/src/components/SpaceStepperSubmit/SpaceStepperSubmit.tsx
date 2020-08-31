/* eslint-disable @typescript-eslint/no-explicit-any */

import Box from "@material-ui/core/Box";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, RecoilState} from "recoil";

import {createSpace} from "@sentrei/common/firebase/spaces";
import {timestamp} from "@sentrei/common/utils/firebase";
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

  function goToSpace(): void {
    Router.pushI18n("/dashboard");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: Record<string, any>): Promise<void> => {
    snackbar("info", t("common:snackbar.creating"));
    try {
      await createSpace({
        actions: {},
        analytics: {
          duration: 0,
          score: 0,
        },
        createdAt: timestamp,
        createdBy: profile,
        createdByUid: user.uid,
        description: null,
        photo: null,
        photoHash: null,
        name: activeForm.name,
        namespaceId: activeForm.id,
        stats: {},
        tier: "free",
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: user.uid,
      })?.then(() => {
        snackbar("success");
        backdrop("loading");
        setActiveForm({id: "", name: ""});
        setActiveStep(0);
        setTimeout(() => {
          goToSpace();
        }, 9000);
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

export default SpaceStepperSubmit;
