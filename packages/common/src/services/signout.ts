import Router from "next-translate/Router";

import {auth} from "@sentrei/common/utils/firebase";

const signout = async (): Promise<void> => {
  await auth.signOut();
  return Router.pushI18n("/");
};

export default signout;
