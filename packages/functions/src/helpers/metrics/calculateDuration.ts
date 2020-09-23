import * as admin from "firebase-admin";

import Metrics from "@sentrei/types/models/Metrics";
import Session from "@sentrei/types/models/Session";

const calculateScore = (
  data: Session.Response,
  user?: boolean,
): Metrics.Update => {
  const durationValue = admin.firestore.FieldValue.increment(
    Number(data?.duration),
  );

  const initialData = <Metrics.Update>{
    duration: durationValue,
  };

  if (user) {
    return {
      ...initialData,
    };
  }

  switch (data.model) {
    case "member": {
      switch (data.type) {
        case "bond": {
          return {
            ...initialData,
            member: {
              duration: durationValue,
              bond: durationValue,
            },
            type: {
              bond: durationValue,
            },
          };
          break;
        }
        case "focus": {
          return {
            ...initialData,
            member: {
              duration: durationValue,
              focus: durationValue,
            },
            type: {
              focus: durationValue,
            },
          };
          break;
        }
        case "work": {
          return {
            ...initialData,
            member: {
              duration: durationValue,
              work: durationValue,
            },
            type: {
              work: durationValue,
            },
          };
          break;
        }
      }
      break;
    }
    case "room": {
      switch (data.type) {
        case "bond": {
          return {
            ...initialData,
            room: {
              duration: durationValue,
              bond: durationValue,
            },
            type: {
              bond: durationValue,
            },
          };
          break;
        }
        case "focus": {
          return {
            ...initialData,
            room: {
              duration: durationValue,
              focus: durationValue,
            },
            type: {
              focus: durationValue,
            },
          };
          break;
        }
        case "work": {
          return {
            ...initialData,
            room: {
              duration: durationValue,
              work: durationValue,
            },
            type: {
              work: durationValue,
            },
          };
          break;
        }
      }
    }
  }
};

export default calculateScore;
