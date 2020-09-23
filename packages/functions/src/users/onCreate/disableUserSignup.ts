import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const config = functions.config().env;
const auth = admin.auth();

/**
 * Disable signup on user create
 */
const disableUserSignup = functions.auth.user().onCreate(user => {
  if (config.environment === "main") {
    return null;
  } else {
    return auth
      .updateUser(user.uid, {disabled: true})
      .catch(err => console.error(`Error disable signup: ${err}`));
  }
});

export default disableUserSignup;
