import firebase, {analytics, auth} from "@sentrei/common/utils/firebase";

const signup = (
  email: string,
  password: string,
  lang?: string,
): Promise<firebase.auth.UserCredential> => {
  firebase.auth().languageCode = lang ?? "en";
  analytics().logEvent("sign_up", {method: "password"});
  return auth.createUserWithEmailAndPassword(email, password);
};

export default signup;
