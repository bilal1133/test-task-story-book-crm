import { DBUser } from '@lolab/database';

// ----------------

// BEWARE: keep each collection in sync with 'firestore.rules'. Remember to keep the actual database consistent as well !
export enum Collection {
  UserData = 'userData',
    //
    DesktopApp = 'desktopApp',                       // subcollection: userData -> desktopApp
}

// ----------------

// BEGIN: Legend

// getPathForAll<collection>  : use this to get the path to a collection
// getPathForSingle<document> : use this to get the path to a document

// END: Legend

// ----------------

// BEGIN: COLLECTION userData

export const getPathForAllUserData =
  (): string  => Collection.UserData;

export const getPathForSingleUserData =
  (userId: DBUser['uid']): string => `${getPathForAllUserData()}/${userId}`;
// ^^^^ BEWARE: use 'getPathForSingleUserData' instead of 'getPathForMyUserData' because 'getUserId' returns 'undefined' when the hook returns 'user'

// END: COLLECTION userData
