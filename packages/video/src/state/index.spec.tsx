/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/prop-types */

import {act, renderHook} from "@testing-library/react-hooks";
import React from "react";
import {TwilioError} from "twilio-video";

import AppStateProvider, {useAppState} from "./index";

// @ts-ignore
window.fetch = jest.fn(() => Promise.resolve({text: () => "mockVideoToken"}));

const wrapper: React.FC = ({children}) => (
  <AppStateProvider>{children}</AppStateProvider>
);

describe("the useAppState hook", () => {
  beforeEach(jest.clearAllMocks);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-return-assign
  beforeEach(() => (process.env = {} as any));

  it("should set an error", () => {
    const {result} = renderHook(useAppState, {wrapper});
    act(() => result.current.setError(new Error("testError") as TwilioError));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(result.current.error!.message).toBe("testError");
  });

  it("should throw an error if used outside of AppStateProvider", () => {
    const {result} = renderHook(useAppState);
    expect(result.error.message).toEqual(
      "useAppState must be used within the AppStateProvider",
    );
  });

  it("should get a token using the REACT_APP_TOKEN_ENDPOINT environment variable when avaiable", async () => {
    process.env.REACT_APP_TOKEN_ENDPOINT = "http://test.com/api/token";

    const {result} = renderHook(useAppState, {wrapper});

    let token;
    await act(async () => {
      token = await result.current.getToken("testname", "testroom");
    });

    expect(token).toBe("mockVideoToken");

    expect(window.fetch).toHaveBeenCalledWith(
      "http://test.com/api/token?identity=testname&roomName=testroom",
      {
        headers: {_headers: {}},
      },
    );
  });

  describe("with auth disabled", () => {
    // eslint-disable-next-line @typescript-eslint/require-await
    it("should not use any auth hooks", async () => {
      renderHook(useAppState, {wrapper});
    });
  });
});
