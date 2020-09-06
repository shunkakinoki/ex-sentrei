import Stripe from "stripe";

import firebase, {functions} from "@sentrei/common/utils/firebase";

interface GetSanitizedToken extends firebase.functions.HttpsCallableResult {
  readonly data: Stripe.Checkout.Session;
}

const accessCheckoutLink = async (
  spaceId: string,
  lang: string,
  returnUrl: string,
): Promise<Stripe.Checkout.Session> => {
  const service = functions.httpsCallable("v1-stripe-createCheckoutLink");
  const result: GetSanitizedToken = await service({
    spaceId,
    lang,
    returnUrl,
  });
  return result.data;
};

export default accessCheckoutLink;
