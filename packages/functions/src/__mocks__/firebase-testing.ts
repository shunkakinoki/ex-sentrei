import * as firebase from "@firebase/testing";
import * as admin from "firebase-admin";

export const adminTimestamp = admin.firestore.FieldValue.serverTimestamp();

export const timestamp = firebase.firestore.Timestamp.fromDate(
  new Date(`2020/01/01 00:00:00`),
);

export const timestampNow = firebase.firestore.FieldValue.serverTimestamp();
