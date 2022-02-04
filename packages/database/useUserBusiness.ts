import { useMemo } from 'react';
import {
  DBUser, firebaseRef, firestoreRef, getPathForAllUserData, getPathForUserBusiness, useUser
} from '@lolab/database';

import { useDocumentData } from 'react-firebase-hooks/firestore';
interface UseUserBusinessHookProps {
  debug?: {
    caller: string;
  };
}

interface UseUserBusinessHookReturn {
  usersBusinessData: DBUser | unknown;
  loadingUsersBusiness: boolean;
  errorUsersBusiness: firebase.default.auth.Error | undefined;
}

type UsersData = unknown;

export const useUserBusiness = ({ debug }: UseUserBusinessHookProps = {}): UseUserBusinessHookReturn => {
  const { user } = useUser({ debug: { caller: 'useUserData' } });

  const dbRef = useMemo(() => (user ? firestoreRef().doc(getPathForUserBusiness(user.uid)) : null), [
    user
  ]);

  const [
    usersBusinessData,
    loading,
    error
  ] = useDocumentData(dbRef);

  console.group('useUserBusinessData');
  console.log('❗️', debug);
  console.log('usersBusinessData', usersBusinessData);
  console.log('loading', loading);
  console.log('error', error);
  console.groupEnd();

  const _return = useMemo(
    () => ({
      usersBusinessData,
      loadingUsersBusiness: loading,
      errorUsersBusiness: error
    }),
    [
      error,
      loading,
      usersBusinessData
    ]
  );

  return _return;
};
