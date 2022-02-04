import sgMail, { MailService } from '@sendgrid/mail';
import firebaseAdmin from 'firebase-admin';

const adminCredentials = { credential: firebaseAdmin.credential.cert({
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  // https://stackoverflow.com/a/41044630/1332513
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
}) };

const isFirebaseAdminInitialised = (): boolean => !!firebaseAdmin.apps.length;

const shouldInitFirebaseAdmin = (): firebaseAdmin.app.App => {
  console.log('INIT FIREBASE ADMIN ?', !isFirebaseAdminInitialised(), Date.now());
  const app = isFirebaseAdminInitialised()
    ? firebaseAdmin.app()
    : firebaseAdmin.initializeApp(adminCredentials);
  return app;
};

const shouldInitFirestoreAdmin = (): firebaseAdmin.firestore.Firestore => {
  console.log('INIT FIRESTORE ADMIN', Date.now());
  const firestore = firebaseAdminRef().firestore() as firebaseAdmin.firestore.Firestore & { customCheckHasAlreadyCalledSettings: boolean };
  // ^^^^ we added a custom property we use immediately to prevent the following error:
  // Error: Firestore has already been initialized.You can only call settings() once, and only before calling any other methods on a Firestore object.
  if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_FIRESTORE_ENABLED === '1' && !firestore.customCheckHasAlreadyCalledSettings) {
    firestore.customCheckHasAlreadyCalledSettings = true;
    console.log('INIT FIRESTORE ADMIN EMULATOR', Date.now());
    firestore.settings({
      host: process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_FIRESTORE_HOST,
      ssl: false
    });
  }
  return firestore;
};

const shouldInitStorageAdmin = (): firebaseAdmin.storage.Storage => {
  console.log('INIT STORAGE ADMIN', Date.now());
  const storage = firebaseAdminRef().storage();
  return storage;
};

type MailServiceRef = MailService & { _didSetApiKey?: boolean; };
const _mailService: MailServiceRef = sgMail;
const shouldInitMailService = (): MailServiceRef => {
  if (!_mailService._didSetApiKey) {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey?.length) {
      throw new Error('[MAIL SERVICE] ERROR missing api key');
    }
    _mailService.setApiKey(apiKey);
    _mailService._didSetApiKey = true;
  }
  return _mailService;
};

export const firebaseAdminRef = (): firebaseAdmin.app.App => shouldInitFirebaseAdmin();
export const firestoreAdminRef = (): firebaseAdmin.firestore.Firestore => shouldInitFirestoreAdmin();
export const storageAdminRef = (): firebaseAdmin.storage.Storage => shouldInitStorageAdmin();

export const mailServiceRef = (): MailServiceRef => shouldInitMailService();
