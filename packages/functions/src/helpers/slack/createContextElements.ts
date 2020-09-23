import {MrkdwnElement} from "@slack/web-api";
import * as functions from "firebase-functions";

export default function createContextElements(
  context: functions.EventContext,
): MrkdwnElement[] {
  const elements: MrkdwnElement[] = [
    {
      type: "mrkdwn",
      text: `*EventType:*\n${context.eventType}`,
    },
    {
      type: "mrkdwn",
      text: `*Resource:*\n${context.resource.name}`,
    },
    {
      type: "mrkdwn",
      text: `*Timestamp:*\n${context.timestamp}`,
    },
  ];

  return elements;
}
