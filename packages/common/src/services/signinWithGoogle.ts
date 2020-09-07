import firebase, {auth} from "@sentrei/common/utils/firebase";

const signinWithGoogle = (
  lang?: string,
): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = lang ?? "en";
  return auth.signInWithPopup(provider);
};

export default signinWithGoogle;
