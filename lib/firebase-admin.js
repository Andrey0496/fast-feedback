import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: "https://fast-feedback-d58de.firebaseio.com",
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
