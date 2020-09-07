import firebase, {auth} from "@sentrei/common/utils/firebase";

const signin = (
  email: string,
  password: string,
  lang?: string,
): Promise<firebase.auth.UserCredential> => {
  firebase.auth().languageCode = lang ?? "en";
  return auth.signInWithEmailAndPassword(email, password);
};

export default signin;
