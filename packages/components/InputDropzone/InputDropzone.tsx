import {
  FileFormatsAndMIMETypesByCategory, hasMIMEType, MIMETypesFromFileFormatsAndMIMETypesByCategory
} from '@app/helpers';
import { ColoursHex } from '@app/types';
import {
  useCallback, useMemo
} from 'react';
import {
  DropEvent,
  DropzoneOptions, DropzoneRootProps, FileRejection, useDropzone
} from 'react-dropzone';

export const InputDropzone = ({
  disabled = false,
  multiple = true,
  onDropAccepted,
  onDropRejected,
  // props for whitelist-like behaviour
  whitelist,
  // props for blacklist-like behaviour
  blacklist
}: {
  disabled?: boolean;
  multiple?: boolean;
  onDropAccepted: DropzoneOptions['onDropAccepted'];
  onDropRejected: DropzoneOptions['onDropRejected'];
  // props for whitelist-like behaviour
  whitelist?: FileFormatsAndMIMETypesByCategory;
  // props for blacklist-like behaviour
  blacklist?: FileFormatsAndMIMETypesByCategory;
}): JSX.Element => {

  const onDrop = useCallback(
    (acceptedFiles: Array<File>, fileRejections: Array<FileRejection>, event: DropEvent) => {
      const accepted: Array<File> = [];
      const rejected: Array<FileRejection> = [];
      if (whitelist) {
      // do nothing: files are automatically divived into two the arrays ('acceptedFiles' and 'fileRejections') as per the 'accept' prop
      }
      if (blacklist) {
        const blacklistMIMETypes = MIMETypesFromFileFormatsAndMIMETypesByCategory(blacklist);
        console.log('COMPONENT InputDropzone -> blacklistMIMETypes', blacklistMIMETypes);
        accepted.push(
          ...acceptedFiles.filter(file => !hasMIMEType(file.type, blacklistMIMETypes))
        );
        rejected.push(
          ...fileRejections,
          ...acceptedFiles.filter(file => hasMIMEType(file.type, blacklistMIMETypes))
            .map(file => ({
              errors: [],
              file
            }))
        );
      }
      if (!blacklist && !accepted.length) {
        accepted.push(...acceptedFiles);
      }
      if (!blacklist && !rejected.length) {
        rejected.push(...fileRejections);
      }
      if (onDropAccepted && accepted.length) {
        onDropAccepted(accepted, event);
      }
      if (onDropRejected && rejected.length) {
        onDropRejected(rejected, event);
      }
    },
    [
      blacklist,
      onDropAccepted,
      onDropRejected,
      whitelist
    ]
  );

  const dropzoneProps: DropzoneOptions = useMemo(
    () => ({
      // defaults
      multiple,
      preventDropOnDocument: true,
      // from props
      disabled,
      onDrop,
      // from props, for whitelist-like behaviour (on the other hand, blacklist-like behaviour is handled directly into 'onDrop')
      accept: whitelist ? MIMETypesFromFileFormatsAndMIMETypesByCategory(whitelist) : undefined
    }),
    [
      disabled,
      multiple,
      onDrop,
      whitelist
    ]
  );

  const {
    getInputProps,
    getRootProps,
    isDragActive,
    isDragReject
  } = useDropzone(dropzoneProps);

  const rootProps: DropzoneRootProps = useMemo(
    () => ({
      className: `rounded p-4 d-flex flex-column align-center justify-content-center`,
      style: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderColor: isDragReject ? ColoursHex.$red : isDragActive ? ColoursHex.$green : ColoursHex.$secondary,
        borderStyle: 'dashed',
        borderWidth: 1,
        outline: 'none'
      }
    }),
    [
      disabled,
      isDragActive,
      isDragReject
    ]
  );

  const classNameLabel = useMemo(
    () => `m-0 pointer-events-none text-center text-primary text-sm ${isDragActive ? 'font-weight-bold' : 'font-weight-normal'}`,
    [
      isDragActive
    ]
  );

  return (
    <div
      {...getRootProps(rootProps)}
    >
      <input {...getInputProps()} />
      <p className={classNameLabel}>
        Drag &amp; drop your files here
        <br />
        or click here to select your files.
      </p>
      {/* <p
        className="m-0 pointer-events-none text-center text-primary text-sm font-weight-normal mt-3"
      >
        10 MB file limit
        <br />
        PNG, JPEG, PDF, DOCS
      </p> */}
    </div>
  );
};
