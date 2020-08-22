/* eslint-disable react/destructuring-assignment */

import React, {createContext, useContext, useReducer, useState} from "react";
import {TwilioError} from "twilio-video";

import Profile from "@sentrei/types/models/Profile";
import {
  settingsReducer,
  initialSettings,
  Settings,
  SettingsAction,
} from "@sentrei/video/state/settings/settingsReducer";
// import useFirebaseAuth from "@sentrei/video/state/useFirebaseAuth";
// import usePasscodeAuth from "@sentrei/video/state/usePasscodeAuth";

export interface StateContextType {
  error: TwilioError | null;
  setError(error: TwilioError | null): void;
  getToken(name: string, room: string, passcode?: string): Promise<string>;
  profile: Profile.Get | null;
  setProfile(profile: Profile.Get): Promise<void>;
  isAuthReady?: boolean;
  isFetching: boolean;
  activeSinkId: string;
  setActiveSinkId(sinkId: string): void;
  settings: Settings;
  dispatchSetting: React.Dispatch<SettingsAction>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks fron being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(
  props: React.PropsWithChildren<{}>,
): JSX.Element {
  const [error, setError] = useState<TwilioError | null>(null);
  const [profile, setProfile] = useState<Profile.Get | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [activeSinkId, setActiveSinkId] = useState("default");
  const [settings, dispatchSetting] = useReducer(
    settingsReducer,
    initialSettings,
  );

  let contextValue = {
    error,
    setError,
    profile,
    setProfile,
    isFetching,
    activeSinkId,
    setActiveSinkId,
    settings,
    dispatchSetting,
  } as StateContextType;

  contextValue = {
    ...contextValue,
    getToken: async (identity, roomName): Promise<string> => {
      const headers = new window.Headers();
      const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || "/token";
      const params = new window.URLSearchParams({
        identity,
        roomName,
      });

      return fetch(`${endpoint}?${params}`, {
        headers,
      }).then(res => res.text());
    },
  };

  const getToken: StateContextType["getToken"] = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then(res => {
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  return (
    <StateContext.Provider value={{...contextValue, getToken}}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState(): StateContextType {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppStateProvider");
  }
  return context;
}
