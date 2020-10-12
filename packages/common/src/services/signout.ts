import Router from "next/router";

import {auth} from "@sentrei/common/utils/firebase";

const signout = async (): Promise<boolean> => {
  await auth.signOut();
  return Router.replace("/");
};

export default signout;
