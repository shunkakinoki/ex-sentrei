import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {deleteMember} from "@sentrei/common/firebase/members";
import FormSection from "@sentrei/ui/components/FormSection";
import QuitForm from "@sentrei/ui/components/QuitForm";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  namespaceId: string;
  spaceId: string;
  userId: string;
}

const SpaceFormQuit = ({namespaceId, spaceId, userId}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("common:snackbar.quiting"));
    try {
      await deleteMember(spaceId, userId)?.then(() => {
        snackbar("success");
        backdrop("loading");
      });
      Router.pushI18n("/dashboard");
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <>
      <FormSection
        icon={<ExitToAppIcon />}
        title={t("space:settings.quit")}
        size="md"
      />
      <QuitForm id={namespaceId} onSubmit={onSubmit} />
    </>
  );
};

export default SpaceFormQuit;
