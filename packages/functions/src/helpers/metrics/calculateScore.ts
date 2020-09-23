/* eslint-disable @typescript-eslint/no-explicit-any */

import scoreActions from "@sentrei/common/const/scoreActions";
import Activity from "@sentrei/types/models/Activity";

const calculateScore = (data: Activity.Response): number => {
  const isAuthor = data.createdByUid === data.before?.createdByUid;
  const scoreAction = `${data.action}_${data.category}`;
  let score: number = (scoreActions as any)[scoreAction] || 1;

  if (data.action === "deleted") {
    if (data.category === "spaces") {
      return 0;
    }
    if (data.category === "sessions") {
      return Math.round(data.value * 0.03);
    }
    if (isAuthor) {
      score = -(scoreActions as any)[`created_${data.category}`] || -1;
    }
  }
  return score;
};

export default calculateScore;
