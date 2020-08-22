import * as React from "react";

import AuthState from "@sentrei/types/states/AuthState";

const AuthContext = React.createContext<AuthState>({
  profile: null,
  user: undefined,
  setProfile: () => {},
  setUser: () => {},
});

export default AuthContext;
