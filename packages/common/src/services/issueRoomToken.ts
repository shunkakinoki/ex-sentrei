import firebase, {functions} from "@sentrei/common/utils/firebase";

interface GetSanitizedToken extends firebase.functions.HttpsCallableResult {
  readonly data: string;
}

const issueRoomToken = async (
  roomId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<string> => {
  const service = functions.httpsCallable("v1-twilio-issueRoomToken");
  const result: GetSanitizedToken = await service({
    roomId,
  });
  return result.data;
};

export default issueRoomToken;
