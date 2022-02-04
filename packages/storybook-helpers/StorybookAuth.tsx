import { generateTimestampIsoFormatTimeZoneUTC } from '@app/helpers';
import {
  DBDocument, LoButtonStatus
} from '@app/types';
import {
  LoButton, PrettyPrintJSON, TransientIndicator
} from '@lolab/components';
import {
  createOrMergeDocument,
  firebaseRef, firestoreRef, getPathForSingleUserData, useUser
} from '@lolab/database';
import { useState } from 'react';

export const StorybookAuth = (): JSX.Element => {

  const {
    user, loadingUser
  } = useUser({ debug: { caller: 'StorybookAuth' } });

  const [
    credentials,
    setCredentials
  ] = useState<firebase.default.auth.UserCredential | undefined>();


  
  const autoLogin = async () => {
    try {
      const userCredential = await firebaseRef().auth().signInWithEmailAndPassword('nikory83@gmail.com', 'Xl84#R&P^uW@oG9');
      setCredentials(userCredential);
      if (userCredential.user) {
        const _id = userCredential.user.uid;
        const _path = getPathForSingleUserData(_id);
        await createOrMergeDocument<DBDocument & { lastLogin: string; }>({
          path: getPathForSingleUserData(userCredential.user.uid),
          doc: {
            _id,
            _path,
            lastLogin: generateTimestampIsoFormatTimeZoneUTC()
          },
          _firestoreRef: firestoreRef
        });
      }
      return LoButtonStatus.Success;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error(error);
        alert('ERROR - see console');
      }
      return LoButtonStatus.Fail;
    }
  };

  const signOut = async () => {
    await firebaseRef().auth().signOut();
    setCredentials(undefined);
  };

  return (
    <TransientIndicator isLoading={loadingUser}>

      {(!user) && <>
        <p>You are logged out.</p>
        <LoButton
          animateResponse={true}
          onClick={autoLogin}
        >Auto login to Firebase</LoButton>
      </>}

      {(!!user) && <>
        <p>You are logged in.</p>
        <LoButton
          animateResponse={true}
          onClick={signOut}
        >Sign out from Firebase</LoButton>
        <hr />
        <PrettyPrintJSON
          text="Firebase login credentials object (transient object - only available when logging in)"
          val={credentials ?? undefined}
        />
        <hr />
        <PrettyPrintJSON
          text="Firebase user object (available both when logging in and when already logged in)"
          val={user}
        />
      </>}

    </TransientIndicator>
  );
};
