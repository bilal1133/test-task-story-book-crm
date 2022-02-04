
import {
  firestoreRef, getPathForSingleUserData, useUser
} from '@lolab/database';
import { useMemo } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

type UserData = unknown; // TODO: FIXME: replate with proper interface (see code below)
// interface UserData extends DBDocument { // TODO: FIXME: once in use, move this interface into 'packages/database/models/ts'
//
//   account: ...;
//   brand: ...;
//   notification: ...;
//   billing: ...;
//   referral: ...;
//
//   lastLogin: ...;
// }

export const useUserData = (): {
  userData: UserData | undefined;
  loadingUserData: boolean;
  errorUserData: Error | undefined;
} => {

  const { user } = useUser({ debug: { caller: 'useUserData' } });

  const dbRef = useMemo(
    () => user
      ? firestoreRef().doc(getPathForSingleUserData(user.uid))
      : null,
    [
      user
    ]
  );

  const [
    userData,
    loading,
    error
  ] = useDocumentData<UserData>(dbRef);

  console.group('useUserData');
  console.log('userData', userData);
  console.log('loading', loading);
  console.log('error', error);
  console.groupEnd();

  const _return = useMemo(
    () => ({
      userData,
      loadingUserData: loading,
      errorUserData: error
    }),
    [
      error,
      loading,
      userData
    ]
  );

  return _return;
};
