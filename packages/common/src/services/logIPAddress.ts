import firebase, {functions} from "@sentrei/common/utils/firebase";

const logIPAddress = async (): Promise<
  firebase.functions.HttpsCallableResult
> => {
  // eslint-disable-next-line no-return-await
  return await functions.httpsCallable("v1-users-ipAddressAdd")();
};

export default logIPAddress;
