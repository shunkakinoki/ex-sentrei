import * as functions from "firebase-functions";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";

/**
 * Track user event on user create
 */
const trackUserCreate = functions.auth.user().onCreate(user => {
  trackEvent(user.uid, "Signed Up", {
    email: user.email,
    metadata: user.metadata,
    name: user.displayName,
    photo: user.photoURL,
    provider: user.providerData,
  });
});

export default trackUserCreate;
