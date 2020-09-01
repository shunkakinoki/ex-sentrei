import firebase, {functions} from "@sentrei/common/utils/firebase";

interface GetSanitizedToken extends firebase.functions.HttpsCallableResult {
  readonly data: string;
}

const accessCustomerPortal = async (
  spaceId: string,
  returnUrl: string,
): Promise<string> => {
  const service = functions.httpsCallable("v1-stripe-createPortalLink");
  const result: GetSanitizedToken = await service({
    spaceId,
    returnUrl,
  });
  return result.data;
};

export default accessCustomerPortal;
