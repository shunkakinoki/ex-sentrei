import firebase, {auth} from "@sentrei/common/utils/firebase";

const signup = (
  email: string,
  password: string,
  lang?: string,
): Promise<firebase.auth.UserCredential> => {
  firebase.auth().languageCode = lang ?? "en";
  return auth.createUserWithEmailAndPassword(email, password);
};

export default signup;
