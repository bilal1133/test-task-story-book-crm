import { storageRef } from '@lolab/database';
import firebase from 'firebase/app'; // BEWARE: Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs

export const StorageTaskEvent = firebase.storage.TaskEvent;
export const StorageTaskState = firebase.storage.TaskState;

export const StorageTaskStateMessage: { [key: string]: string } = {
  [StorageTaskState.CANCELED]: 'Upload canceled',
  [StorageTaskState.ERROR]: 'Upload error',
  [StorageTaskState.PAUSED]: 'Upload paused',
  [StorageTaskState.RUNNING]: 'Upload running',
  [StorageTaskState.SUCCESS]: 'Upload successful'
};

// https://firebase.google.com/docs/storage/web/handle-errors
export enum StorageTaskErrorCode {
  Unknown = 'storage/unknown',
  ObjectNotFound = 'storage/object-not-found',
  BucketNotFound = 'storage/bucket-not-found',
  ProjectNotFound = 'storage/project-not-found',
  QuotaExceeded = 'storage/quota-exceeded',
  Unauthenticated = 'storage/unauthenticated',
  Unauthorized = 'storage/unauthorized',
  RetryLimitExceeded = 'storage/retry-limit-exceeded',
  InvalidChecksum = 'storage/invalid-checksum',
  Canceled = 'storage/canceled',
  InvalidEventName = 'storage/invalid-event-name',
  InvalidUrl = 'storage/invalid-url',
  InvalidArgument = 'storage/invalid-argument',
  NoDefaultBucket = 'storage/no-default-bucket',
  CannotSliceBlob = 'storage/cannot-slice-blob',
  ServerFileWrongSize = 'storage/server-file-wrong-size'
}

export const StoragTaskErrorMessage: { [key in StorageTaskErrorCode]: string } = {
  [StorageTaskErrorCode.Unknown]:
    'An unknown error occurred.',
  [StorageTaskErrorCode.ObjectNotFound]:
    'No object exists at the desired reference.',
  [StorageTaskErrorCode.BucketNotFound]:
    'No bucket is configured for Cloud Storage',
  [StorageTaskErrorCode.ProjectNotFound]:
    'No project is configured for Cloud Storage',
  [StorageTaskErrorCode.QuotaExceeded]:
    `Quota on your Cloud Storage bucket has been exceeded. If you're on the free tier, upgrade to a paid plan. If you're on a paid plan, reach out to Firebase support.`,
  [StorageTaskErrorCode.Unauthenticated]:
    'User is unauthenticated, please authenticate and try again.',
  [StorageTaskErrorCode.Unauthorized]:
    'User is not authorized to perform the desired action, check your security rules to ensure they are correct.',
  [StorageTaskErrorCode.RetryLimitExceeded]:
    'The maximum time limit on an operation (upload, download, delete, etc.) has been excceded. Try uploading again.',
  [StorageTaskErrorCode.InvalidChecksum]:
    'File on the client does not match the checksum of the file received by the server. Try uploading again.',
  [StorageTaskErrorCode.Canceled]:
    'User canceled the operation.',
  [StorageTaskErrorCode.InvalidEventName]:
    'Invalid event name provided. Must be one of [`running`, `progress`, `pause`]',
  [StorageTaskErrorCode.InvalidUrl]:
    'Invalid URL provided to refFromURL(). Must be of the form: gs://bucket/object or https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=<TOKEN>',
  [StorageTaskErrorCode.InvalidArgument]:
    'The argument passed to put() must be `File`, `Blob`, or `UInt8` Array. The argument passed to putString() must be a raw, `Base64`, or `Base64URL` string.',
  [StorageTaskErrorCode.NoDefaultBucket]:
    `No bucket has been set in your config's storageBucket property.`,
  [StorageTaskErrorCode.CannotSliceBlob]:
    `Commonly occurs when the local file has changed (deleted, saved again, etc.). Try uploading again after verifying that the file hasn't changed.`,
  [StorageTaskErrorCode.ServerFileWrongSize]:
    'File on the client does not match the size of the file recieved by the server. Try uploading again.'
};

// file upload
// https://firebase.google.com/docs/storage/web/upload-files
export const uploadFile = ({
  pathPrefix,
  file,
  fileName,
  onStatechange,
  onError,
  onComplete
}: {
  pathPrefix: string;
  file: File;
  fileName?: string; // optional, in case we want to override the default file name
  onStatechange?: (progress: number) => void;
  onError?: () => void;
  onComplete?: (downloadURL: string) => void;
  }): {
  uploadTask: firebase.storage.UploadTask;
  // eslint-disable-next-line @typescript-eslint/ban-types
  unsubscribe: Function;
} => {

  // https://www.sentinelstand.com/article/guide-to-firebase-storage-download-urls-tokens

  // file metadata
  // https://firebase.google.com/docs/storage/web/file-metadata#file_metadata_properties
  // https://wp-rocket.me/blog/cache-control-http-headers/
  const metadata: firebase.storage.UploadMetadata = {
    cacheControl: 'private, max-age=31536000, s-maxage=31536000',
    contentType: file.type
  };

  // pathPrefix: remove trailing slashes
  // name: normalize to prevent path nesting
  const path = `${pathPrefix.replace(/\/{1,}$/g, '')}/${(fileName ?? file.name).replace(/\//g, '|')}`;

  // upload task
  const uploadTask = storageRef().child(path).put(file, metadata);

  const unsubscribe = uploadTask.on(
    StorageTaskEvent.STATE_CHANGED,
    {
      'next': (snapshot) => {
        if (onStatechange) {
          const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100); // percentage
          const state = StorageTaskStateMessage[snapshot.state] ?? snapshot.state; // the null coalescing operator will catch unmapped states
          console.log(`NEXT uploadTask -> ${file.name} -> progress`, `${progress}%`);
          console.log(`NEXT uploadTask -> ${file.name} -> state`, state);
          onStatechange(progress);
        }
      },
      'error': (error) => {
        const errorCode = (error as Error & { code: StorageTaskErrorCode }).code;
        const errorMessage = StoragTaskErrorMessage[errorCode] ?? errorCode; // the null coalescing operator will catch unmapped errors
        console.log(`---- ERROR uploadTask -> ${file.name} -> errorCode`, errorCode);
        console.log(`---- ERROR uploadTask -> ${file.name} -> errorMessage`, errorMessage);
        // TODO: send error to developers !!! monitoring & alerting !!!
        if (onError) onError();
      },
      'complete': () => {
        if (onComplete) {
          uploadTask.snapshot.ref.getDownloadURL()
            .then(downloadURL => {
              console.log(`COMPLETE uploadTask -> ${file.name} -> downloadURL`, downloadURL);
              onComplete(downloadURL);
            });
        }
      }
    }
  );

  return {
    uploadTask,
    unsubscribe
  }; // can be awaited to signify upload completed, but to track the upload progress or to get more info use the callbacks
};

// file delete
// https://firebase.google.com/docs/storage/web/delete-files
export const deleteFile = ({
  pathPrefix,
  downloadURL
}: {
  pathPrefix: string;
  downloadURL: string;
  }): Promise<void> => {

  const pathname = decodeURIComponent(
    (new URL(downloadURL)).pathname
  );
  const filePath = pathname.substring(pathname.indexOf(pathPrefix));

  if (pathname === filePath) {
    throw new Error(`---- ERROR: deleteFile -> invalid file path`);
  }

  return storageRef().child(filePath).delete();
};
