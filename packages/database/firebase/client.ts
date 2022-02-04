import firebase from 'firebase/app'; // BEWARE: Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import {
  cookieConsentName, cookieConsentValue
} from '@app/constants';
import { isClient } from '@app/helpers';
import { parseCookies } from 'nookies';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
};

const isFirebaseInitialised = (): boolean => !!firebase.apps.length;

const shouldInitFirebase = (): firebase.app.App => {
  console.log('INIT FIREBASE ?', !isFirebaseInitialised(), Date.now());
  const app = (
    isFirebaseInitialised()
      ? firebase.app()
      : firebase.initializeApp(clientCredentials)
    ) as firebase.app.App & { customCheckHasAlreadyCalledAnalytics?: boolean };
  // Enable analytics only if cookie consent has been set
  // https://firebase.google.com/docs/analytics/get-started
  if (isClient() && Object.hasOwnProperty.call(clientCredentials, 'measurementId') && !app.customCheckHasAlreadyCalledAnalytics) {
    const { [cookieConsentName]: hasConsent } = parseCookies();
    if (hasConsent === cookieConsentValue) {
      console.log('INIT ANALYTICS', Date.now());
      app.customCheckHasAlreadyCalledAnalytics = true;
      app.analytics();
    }
  }
  return app;
};

const shouldInitFirestore = (): firebase.firestore.Firestore => {
  console.log('INIT FIRESTORE', Date.now());
  const firestore = firebaseRef().firestore() as firebase.firestore.Firestore & { customCheckHasAlreadyCalledSettings?: boolean };
  // ^^^^ we added a custom property we use immediately to prevent the following error:
  // Error: Firestore has already been initialized.You can only call settings() once, and only before calling any other methods on a Firestore object.
  if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_FIRESTORE_ENABLED === '1' && !firestore.customCheckHasAlreadyCalledSettings) {
    firestore.customCheckHasAlreadyCalledSettings = true;
    console.log('INIT FIRESTORE EMULATOR', Date.now());
    firestore.settings({
      host: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_FIRESTORE_HOST,
      ssl: false
    });
  }
  return firestore;
};

const shouldInitStorage = (): firebase.storage.Reference => {
  console.log('INIT STORAGE', Date.now());
  const storage = firebaseRef().storage();
  const bucketRoot = storage.ref();
  return bucketRoot;
};

export const firebaseRef = (): firebase.app.App => shouldInitFirebase();
export const firestoreRef = (): firebase.firestore.Firestore => shouldInitFirestore();
export const storageRef = (): firebase.storage.Reference => shouldInitStorage();

// TODO: move the following to another file?
export const FieldPath = firebase.firestore.FieldPath;
export const FieldValue = firebase.firestore.FieldValue;
export const AuthPersistence = firebase.auth.Auth.Persistence;
export const GoogleAuthProvider = (): firebase.auth.GoogleAuthProvider => new firebase.auth.GoogleAuthProvider();
