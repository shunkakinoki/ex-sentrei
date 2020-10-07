import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const client_id = publicRuntimeConfig.DATA_CLIENT_ID;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const oneTap = (callback: (res: any) => Promise<void>): void => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id,
      callback,
      context: "use",
    });
    window.google.accounts.id.prompt();
  }
};

export default oneTap;
