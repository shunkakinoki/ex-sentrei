import {db} from "@sentrei/common/utils/firebase";
import Feedback from "@sentrei/types/models/Feedback";

// eslint-disable-next-line import/prefer-default-export
export const createFeedback = async (
  feedback: Feedback.Create,
): Promise<void> => {
  await db.collection(`feedback`).add(feedback);
};
