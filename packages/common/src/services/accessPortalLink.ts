import Stripe from "stripe";

import firebase, {functions} from "@sentrei/common/utils/firebase";

interface GetSanitizedToken extends firebase.functions.HttpsCallableResult {
  readonly data: Stripe.BillingPortal.Session;
}

const accessPortalLink = async (
  spaceId: string,
  returnUrl: string,
): Promise<Stripe.BillingPortal.Session> => {
  const service = functions.httpsCallable("v1-stripe-createPortalLink");
  const result: GetSanitizedToken = await service({
    spaceId,
    returnUrl,
  });
  return result.data;
};

export default accessPortalLink;
