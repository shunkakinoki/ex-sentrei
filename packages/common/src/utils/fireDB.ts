import * as firebase from "firebase";

const fireDB = (): firebase.firestore.Firestore => {
  const db = firebase.firestore();

  // eslint-disable-next-line no-restricted-globals
  if (location.hostname === "localhost") {
    db.settings({
      host: "localhost:8080",
      ssl: false,
    });
  }

  return db;
};

export default fireDB;
