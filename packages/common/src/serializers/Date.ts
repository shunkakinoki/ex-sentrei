import firebase from "@sentrei/common/utils/firebase";

const serializeFirebaseDate = (
  date: {
    seconds: number;
    nanoseconds: number;
  },
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  },
): string => {
  const {Timestamp} = firebase.firestore;
  const newDate = date
    ? new Timestamp(date.seconds, date.nanoseconds).toDate()
    : new Date();

  return newDate.toLocaleDateString("en", options);
};

export default serializeFirebaseDate;
