import Router from "next-translate/Router";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {deleteSpace} from "@sentrei/common/firebase/spaces";
import FormDelete from "@sentrei/ui/components/FormDelete";
import useBackdrop from "@sentrei/ui/hooks/useBackdrop";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

interface Props {
  namespaceId: string;
}

const SpaceDeleteForm = ({namespaceId}: Props): JSX.Element => {
  const {snackbar} = useSnackbar();
  const {backdrop} = useBackdrop();
  const {t} = useTranslation();

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("common:snackbar.deleting"));
    try {
      await deleteSpace(namespaceId)?.then(() => {
        snackbar("success");
        backdrop("loading");
      });
      Router.pushI18n("/dashboard");
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <FormDelete disabled id={namespaceId} onSubmit={onSubmit} />;
};

export default SpaceDeleteForm;
