import Metrics from "@sentrei/types/models/Metrics";
import Status from "@sentrei/types/models/Status";
import * as admin from "firebase-admin";

const calculateLatest = (status: Status): Metrics.Update | false => {
  if (status.status === "online") {
    return {period: {latest: admin.firestore.FieldValue.increment(-1)}};
  } else if (status.status === "offline") {
    return {period: {latest: admin.firestore.FieldValue.increment(-1)}};
  } else if (status.status === "away") {
    return false;
  } else {
    return false;
  }
};

export default calculateLatest;
