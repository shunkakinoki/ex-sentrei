import Container from "@material-ui/core/Container";
import NoSsr from "@material-ui/core/NoSsr";
import Paper from "@material-ui/core/Paper";

import {useTheme} from "@material-ui/core/styles";
import {ChatWindow} from "@papercups-io/chat-widget";
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
  type?: "support" | "sales";
}

export default function PaperCupsWidget({
  customerName,
  customerEmail,
  customerUid,
  type = "support",
}: Props): JSX.Element {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <NoSsr>
      <Container maxWidth="md">
        <Paper square elevation={24} style={{height: "70vh"}}>
          <ChatWindow
            accountId={accountId}
            requireEmailUpfront={type !== "support"}
            title={
              type === "support"
                ? t("papercups:papercups.support")
                : t("papercups:papercups.sales")
            }
            subtitle={t("papercups:papercups.subTitle")}
            newMessagePlaceholder={t("papercups:papercups.messagePlaceholder")}
            greeting={t("papercups:papercups.greeting")}
            primaryColor={theme.palette.primary.main}
            onChatOpened={(): void =>
              trackEvent("Papercups Window Opened", {type})
            }
            onChatClosed={(): void =>
              trackEvent("Papercups Window Closed", {type})
            }
            onMessageSent={(mes): void =>
              trackEvent("Papercups Message Sent", mes)
            }
            onMessageReceived={(mes): void =>
              trackEvent("Papercups Message Received", mes)
            }
            customer={{
              name: customerName || "",
              email: customerEmail || "",
              external_id: customerUid || "",
            }}
          />
        </Paper>
      </Container>
    </NoSsr>
  );
}
