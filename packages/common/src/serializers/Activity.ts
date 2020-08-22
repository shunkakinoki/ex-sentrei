/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {pick} from "lodash";

import serializeFirebaseDate from "@sentrei/common/serializers/Date";
import Activity from "@sentrei/types/models/Activity";

export const editableFields = {
  invites: [],
  members: ["description", "emoji"],
  participants: [],
  rooms: ["description", "photo", "title"],
  sessions: [],
  spaces: ["description", "photo", "title"],
};

export const serializeActivity = (
  snap: firebase.firestore.DocumentSnapshot<Activity.Response>,
): Activity.Get => {
  const data = snap.data()!;
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const before: any = pick(data.before, editableFields[data.category]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const after: any = pick(data.after, editableFields[data.category]);

  return {
    ...data,
    before,
    after,
    id: snap.id,
    updatedAt: serializeFirebaseDate(data.updatedAt, options),
  };
};
