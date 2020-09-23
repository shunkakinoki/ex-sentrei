import {ChatPostMessageArguments} from "@slack/web-api";
import * as functions from "firebase-functions";

import createContextElements from "@sentrei/functions/helpers/slack/createContextElements";

export default function createMessageArgs(
  context: functions.EventContext,
  channel: string,
  message: string,
): ChatPostMessageArguments {
  const args: ChatPostMessageArguments = {
    channel,
    text: message,
    username: "Firebase Functions Log",
    link_names: true,
    unfurl_links: true,
    unfurl_media: true,
  };

  const elements = createContextElements(context);
  args.blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: message,
      },
      fields: elements,
    },
  ];
  return args;
}
