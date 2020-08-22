import firebase, {auth} from "@sentrei/common/utils/firebase";

const updatePassword = async (
  passwordOld: string,
  passwordNew: string,
): Promise<void> => {
  const {currentUser} = auth;

  if (!currentUser) {
    throw new Error("user_not_loggedin");
  }

  const credential = firebase.auth.EmailAuthProvider.credential(
    String(currentUser.email),
    passwordOld,
  );

  await currentUser.reauthenticateWithCredential(credential);
  return currentUser.updatePassword(passwordNew);
};

export default updatePassword;
