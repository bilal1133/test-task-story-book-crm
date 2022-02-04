import {
  DBUser, firebaseRef
} from '@lolab/database';
import { useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface UseUserHookProps {
  debug?: {
    caller: string;
  }
}

interface UseUserHookReturn {
  user: DBUser | undefined;
  loadingUser: boolean;
  errorUser: firebase.default.auth.Error | undefined;
}

export const useUser = ({ debug }: UseUserHookProps = {}): UseUserHookReturn => {

  const [
    user,
    loading,
    error
  ] = useAuthState(firebaseRef().auth()) as [DBUser | undefined, boolean, firebase.default.auth.Error | undefined];

  console.group(debug?.caller.length ? `useUser [caller: ${debug.caller}]` : 'useUser');
  console.log('user', user);
  console.log('loading', loading);
  console.log('error', error);
  console.groupEnd();

  const _return: UseUserHookReturn = useMemo(
    () => ({
      user,
      loadingUser: loading,
      errorUser: error
    }),
    [
      error,
      loading,
      user
    ]
  );

  return _return;
};
