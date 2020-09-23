/* eslint-disable @typescript-eslint/no-explicit-any */
import * as firebase from "@firebase/testing";

import * as fs from "fs";
import * as path from "path";

const projectId = "sentrei";
const rulesPath = path.join(__dirname, "../../firestore/firestore.rules");
const rules = fs.readFileSync(rulesPath, "utf8");

export const initializeAdminApp = (): firebase.firestore.Firestore => {
  return firebase.initializeAdminApp({projectId}).firestore();
};

export const initializeFirebaseApp = (
  auth: {uid: string | null} | undefined,
): firebase.firestore.Firestore => {
  return firebase.initializeTestApp({projectId, auth}).firestore();
};

export const loadFirestoreRules = (): Promise<void> =>
  firebase.loadFirestoreRules({projectId, rules});

export const removeApps = (): Promise<any[]> =>
  Promise.all(firebase.apps().map(app => app.delete()));
