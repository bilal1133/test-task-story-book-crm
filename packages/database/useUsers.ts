import { useMemo } from 'react';
import {
  DBUser, firebaseRef, firestoreRef, getPathForAllUserData, getPathForUserBusiness, useUser
} from '@lolab/database';

import { useDocumentData } from 'react-firebase-hooks/firestore';
interface UseUserHookProps {
  debug?: {
    caller: string;
  };
}

interface UseUserHookReturn {
  usersBusinessData: DBUser | unknown;
  loadingUsersData: boolean;
  errorUsersData: firebase.default.auth.Error | undefined;
}

type UsersData = unknown;

export const useUsers = ({ debug }: UseUserHookProps = {}): UseUserHookReturn => {
  const { user } = useUser({ debug: { caller: 'useUserData' } });

  const dbRef = useMemo(() => (user ? firestoreRef().doc(getPathForUserBusiness(user.uid)) : null), [
    user
  ]);

  console.log('DBREF❗️❗️', dbRef);

  const [
    usersBusinessData,
    loading,
    error
  ] = useDocumentData(dbRef);

  console.group('useUserBusinessData');
  console.log('❗️', debug);
  console.log('userData', usersBusinessData);
  console.log('loading', loading);
  console.log('error', error);
  console.groupEnd();

  const _return = useMemo(
    () => ({
      usersBusinessData,
      loadingUsersData: loading,
      errorUsersData: error
    }),
    [
      error,
      loading,
      usersBusinessData
    ]
  );
  return _return;
};
