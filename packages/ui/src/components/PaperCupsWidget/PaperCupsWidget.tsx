import NoSsr from "@material-ui/core/NoSsr";
import {useTheme} from "@material-ui/core/styles";
import {ChatWidget} from "@papercups-io/chat-widget";

import useTranslation from "next-translate/useTranslation";
import getConfig from "next/config";
import * as React from "react";

import {trackEvent} from "@sentrei/common/utils/segment";

const {publicRuntimeConfig} = getConfig();
const accountId = publicRuntimeConfig.PAPERCUPS_ID;

export interface Props {
  customerName?: string;
  customerEmail?: string;
  customerUid?: string;
  defaultIsOpen?: boolean;
}

export default function PaperCupsWidget({
  defaultIsOpen = false,
  customerName,
  customerEmail,
  customerUid,
}: Props): JSX.Element {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <NoSsr>
      <ChatWidget
        accountId={accountId}
        title={t("papercups:papercups.title")}
        subtitle={t("papercups:papercups.subTitle")}
        newMessagePlaceholder={t("papercups:papercups.messagePlaceholder")}
        greeting={t("papercups:papercups.greeting")}
        primaryColor={theme.palette.primary.main}
        defaultIsOpen={defaultIsOpen}
        onChatOpened={(): void => trackEvent("Papercups Widget Opened")}
        onChatClosed={(): void => trackEvent("Papercups Widget Closed")}
        onMessageSent={(mes): void => trackEvent("Papercups Message Sent", mes)}
        onMessageReceived={(mes): void =>
          trackEvent("Papercups Message Received", mes)
        }
        customer={{
          name: customerName || "",
          email: customerEmail || "",
          external_id: customerUid || "",
        }}
      />
    </NoSsr>
  );
}
