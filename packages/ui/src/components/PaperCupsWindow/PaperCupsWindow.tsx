import NoSsr from "@material-ui/core/NoSsr";
import {useTheme} from "@material-ui/core/styles";
import {ChatWindow} from "@papercups-io/chat-widget";
import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import * as React from "react";

const {publicRuntimeConfig} = getConfig();
const accountId = publicRuntimeConfig.PAPERCUPS_ID;

export interface Props {
  customerName?: string;
  customerEmail?: string;
  customerUid?: string;
}

export default function PaperCupsWidget({
  customerName,
  customerEmail,
  customerUid,
}: Props): JSX.Element {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <NoSsr>
      <ChatWindow
        accountId={accountId}
        title={t("papercups:papercups.support")}
        subtitle={t("papercups:papercups.subTitle")}
        newMessagePlaceholder={t("papercups:papercups.messagePlaceholder")}
        greeting={t("papercups:papercups.greeting")}
        primaryColor={theme.palette.primary.main}
        customer={{
          name: customerName || "",
          email: customerEmail || "",
          external_id: customerUid || "",
        }}
      />
    </NoSsr>
  );
}
