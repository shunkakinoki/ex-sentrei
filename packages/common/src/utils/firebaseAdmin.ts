import * as admin from "firebase-admin";
import getConfig from "next/config";

const {serverRuntimeConfig} = getConfig();

const firebaseAdminConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: serverRuntimeConfig.FIREBASE_CLIENT_EMAIL,
    privateKey: serverRuntimeConfig.FIREBASE_PRIVATE_KEY?.replace(
      /\\n/gm,
      "\n",
    ),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

if (!admin.apps.length) {
  admin.initializeApp(firebaseAdminConfig);
}

export const adminDb = admin.firestore();

export const timestamp = admin.firestore.FieldValue.serverTimestamp();
