import { CSSAnimationDuration } from '@app/constants';
import {
  delay, formatBytes, isFileSizeExceeded, openUrlBlank
} from '@app/helpers';
import {
  ColoursHex, TimeFrequency
} from '@app/types';
import {
  InputDropzone, InputPasteURL, InputPasteURLProps, IonIcon, LoButton
} from '@lolab/components';
import {
  DBDocument, uploadFile
} from '@lolab/database';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import {
  DropzoneOptions, FileRejection
} from 'react-dropzone';
import {
  Col, Progress, Row
} from 'reactstrap';

interface UploadProvider {
  id: string;
  name: string;
  url: string;
}

const uploadProviderSmash = {
  id: nanoid(),
  name: 'Smash',
  url: 'https://fromsmash.com'
};
const uploadProviderWeTransfer = {
  id: nanoid(),
  name: 'WeTransfer',
  url: 'https://wetransfer.com'
};

enum UploadArtefactType {
  File = 'FILE',
  Link = 'LINK',
}

enum UploadArtefactTypeLinkSource {
  PastedUrl = 'PASTED_URL',
  IntegrationGoogleDrivePicker = 'INTEGRATION_GOOGLE_DRIVE_PICKER',
  IntegrationDropboxChooser = 'INTEGRATION_GOOGLE_DROPBOX_CHOOSER',
}

export interface UploadArtefact extends DBDocument {
  type: UploadArtefactType;

  displayName: string; // the user can decide to appoint a "display name" to this media item
  // description: string; // ...in the future the user might need to describe this file...
  // tags: Array<...>; // ...in the future the user might need to tag this file...

  [UploadArtefactType.File]?: {
    fileName: string;
    fileSize: File['size']; // number of bytes as number
    fileSizeBytes: string; // number of bytes as human-readable label
    fileType: string; // mimeType
    fileExt: string; // extension (e.g. ".png")

    metadata?: { // useful for image/video assets
      width?: number;
      height?: number;
      duration?: number; // duration in seconds of the current media resource. A NaN value is returned if duration is not available, or Infinity if the media resource is streaming.
    }

    _storageId?: string; // same as DBDocument['_id'] but for storage
    _storagePath?: string; // same as DBDocument['_path'] but for storage
    downloadURL?: string; // url from which to download the file after it has been uploaded to our servers

    $file?: File;
    $objectURL?: string; // used to generate in-browser previews
    $fileSizeExceeded?: boolean; // used for validation
  }

  [UploadArtefactType.Link]?: {
    source: UploadArtefactTypeLinkSource;
    url: string;

    metadata?: { // extra information (from the integration) because simply pasted url have no other info attached to them
      extId?: string; // document ID (from the integration)
      fileName?: string;
      mimeType?: string; // Google returns this info, instead for Dropbox it has to be guessed from the file extension
    }

    raw?: unknown; // e.g. raw payload from integration or whatever might be relevant
  }
}

interface LoUploadAreaProps {
  uploadPathPrefix: string; // '_path' without the '_id', since all the '_id' will be assigned automatically
  onUploadComplete: (files: Array<UploadArtefact>) => Promise<void>;
  enableLinks?: boolean;
  enableIntegrations?: boolean;
}

export const LoUploadArea = ({
  uploadPathPrefix,
  onUploadComplete,
  enableLinks = true
  // enableIntegrations = false,
}: LoUploadAreaProps): JSX.Element => {

  const [
    uploadProvider,
    setUploadProvider
  ] = useState<UploadProvider['id'] | undefined>();

  const [
    pastedUrls,
    setPastedUrls
  ] = useState<Array<string>>([]);

  const onValidUrl: InputPasteURLProps['onValidUrl'] = (url: string) => {
    console.log('---- onValidUrl -> url', url);
    if (uploadProvider?.length) {
      setUploadProvider(undefined);
    }
    setPastedUrls(prevState => {
      const newState: typeof prevState = [
        ...new Set([
          ...prevState,
          url
        ])
      ];
      return newState;
    });
  };

  // TODO: @luca continue from here

  // --------------

  const [
    acceptedFiles,
    setAcceptedFiles
  ] = useState<Array<{ file: File; uploadProgress?: number; uploadError?: boolean; downloadURL?: string; ignore?: boolean; }>>([]);

  const [
    , setRejectedFiles
  ] = useState<Array<FileRejection>>([]);

  const [
    isUploading,
    setIsUploading
  ] = useState<boolean>(false);

  const [
    didProcessUploadOnce,
    setDidProcessUploadOnce
  ] = useState<boolean>(false);

  const canUpload = (): boolean => !!pastedUrls.length || !!acceptedFiles.filter(({
    ignore, uploadError
  }) => !(ignore || uploadError)).length;

  const onDropAccepted: DropzoneOptions['onDropAccepted'] = async (files, event) => {
    console.log('---- onDropAccepted -> files', files);
    console.log('---- onDropAccepted -> event', event);
    const existingFiles = acceptedFiles.map(({ file }) => file.name);
    setAcceptedFiles([
      ...files
        .filter(file => !existingFiles.includes(file.name))
        .map(file => ({ file }))
        .map(file => ({
          ...file,
          uploadError: isFileSizeExceeded(file.file.size),
          ignore: isFileSizeExceeded(file.file.size)
        })),
      ...acceptedFiles
    ]);
    return;
  };

  const onDropRejected: DropzoneOptions['onDropRejected'] = (files, event) => {
    console.log('---- onDropRejected -> files', files);
    console.log('---- onDropRejected -> event', event);
    setRejectedFiles(files);
    return;
  };

  const processUpload = async ({ isRetry }: { isRetry: boolean } = { isRetry: false }) => {
    if (!canUpload()) {
      return;
    }

    setIsUploading(true);

    const filesToUpload = [
      ...acceptedFiles
        .map((file, fileIndex) => ({
          file,
          fileIndex
        }))
        .filter(({ file: {
          ignore, downloadURL, uploadError
        } }) => !ignore && !downloadURL && (isRetry ? uploadError : !uploadError))
    ];

    const uploadResults = await Promise.allSettled(
      filesToUpload.map(({
        file, fileIndex
      }) => uploadFile({
        pathPrefix: uploadPathPrefix,
        file: file.file,
        onStatechange: progress => {
          // BEWARE: we would want to map/spread/update the array directly as 'setAcceptedFiles' argument, but it doesn't work, so we update it this way.
          acceptedFiles[fileIndex].uploadProgress = progress;
          setAcceptedFiles([
            ...acceptedFiles
          ]);
        }
      }))
    );

    if (uploadResults.length) {
      await delay(CSSAnimationDuration); // compensation time to make the UI update readable
    }

    const downloadURLs = await Promise.allSettled(
      // status is 'rejected', object is { status, reason }
      // status is 'fulfilled', object is { status, value }
      uploadResults.map(({
        status, ...result
      }) => {
        return status === 'fulfilled'
          ? ((result as PromiseFulfilledResult<firebase.default.storage.UploadTask['snapshot']>).value.ref.getDownloadURL()) as Promise<string>
          : Promise.reject(undefined);
      })
    );

    // BEWARE: we would want to map/spread/update the array directly as 'setAcceptedFiles' argument, but it doesn't work, so we update it this way.
    downloadURLs.forEach(({
      status, ...result
    }, filesToUploadIndex) => {
      const fileIndex = filesToUpload[filesToUploadIndex].fileIndex;
      acceptedFiles[fileIndex].uploadError = status === 'rejected';
      acceptedFiles[fileIndex].downloadURL = status === 'fulfilled' ? (result as PromiseFulfilledResult<string>).value : undefined;
    });
    setAcceptedFiles([
      ...acceptedFiles
    ]);

    if (downloadURLs.length) {
      await delay(2 * CSSAnimationDuration); // compensation time to make the UI update readable
    }

    const uploadedFiles = [
      ... pastedUrls
        .map((url) => ({
          url,
          name: url
        })),
      ...acceptedFiles
        .filter(file => !!file.downloadURL)
        .map((file) => ({
          url: file.downloadURL ?? '', // this will never be empty because we are filtering on the line above
          name: file.file.name,
          size: file.file.size
        }))
    ];

    setIsUploading(false);

    if (
      didProcessUploadOnce
        ? true
        : acceptedFiles.some(({
          ignore, uploadError
        }) => !ignore && !!uploadError)
    ) {
      await onUploadComplete(uploadedFiles);
    }

    setDidProcessUploadOnce(true);
  };

  // TODO: make this fn global
  const formatFileName = (fileName: string): string => {
    if (fileName.length <= 35) {
      return fileName;
    } else {
      return `${fileName.slice(0, 20)}…${fileName.slice(-15)}`;
    }
  };

  return (
    <>

      {enableLinks && <>
        <p className="mb-3 text-center text-xs text-secondary">
        Upload files to these providers &amp; paste the link below
        </p>
        <div className="mb-3 d-flex justify-content-center">
          <LoButton
            className="mr-2"
            color="white"
            onClick={() => {
              setUploadProvider(uploadProviderWeTransfer.name);
              setTimeout(() => openUrlBlank(uploadProviderWeTransfer.url), TimeFrequency.OneSecond);
            }}
          >
            <span className="d-flex align-items-center">
              <img
                src="/icons/WeTransfer-Logo-Button.png"
                className="mr-2"
                width="16"
                alt="WeTransfer logo"
              />
              {uploadProviderWeTransfer.name}
            </span>
          </LoButton>
          <LoButton
            color="white"
            onClick={() => {
              setUploadProvider(uploadProviderSmash.name);
              setTimeout(() => openUrlBlank(uploadProviderSmash.url), TimeFrequency.OneSecond);
            }}
          >
            <span className="d-flex align-items-center">
              <img
                src="/icons/Smash-Logo-Button-white-bg.png"
                className="mr-2"
                width="16"
                alt="Smash logo"
              />
              {uploadProviderSmash.name}
            </span>
          </LoButton>
        </div>
        <p className="mb-3 text-center text-xs text-secondary">
        or add a link
        </p>
        <div className="mb-3">
          <InputPasteURL
            disabled={isUploading}
            onValidUrl={onValidUrl}
          />
          {!!uploadProvider?.length && <p className="text-xs mb-0 mt-1">Rember to paste here the link generated by {uploadProvider}</p>}
        </div>
      </>}

      {/* TODO: FIXME: enable integrations */}
      {/* {enableIntegrations && <>
        <p className="mb-3 text-center text-xs text-secondary">
        or select files from
        </p>
        <div className="mb-3 d-flex justify-content-center">
          <GoogleDrivePicker
            className="mr-2"
            pickerView="DOCS_IMAGES"
            onPicked={onValidUrl}
          />
          <LoButton
            color="white"
            onClick={() => {
              const dropbox = window.Dropbox;
              if (!dropbox) {
                return;
              }
              dropbox.choose({
                linkType: 'preview',
                multiselect: true,
                folderselect: true,
                success: (files) => console.log('---- files', files)
              });
            }}
          >
            <span className="d-flex align-items-center">
              <img
                src="/icons/Dropbox-Logo-Button.png"
                className="mr-2"
                width="16"
                alt="Dropbox logo"
              />
                Dropbox
            </span>
          </LoButton>
        </div>
        <p className="mb-3 text-center text-xs text-secondary">
        or
        </p>
      </>} */}

      <InputDropzone
        disabled={isUploading}
        multiple={multiple}
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
      />

      {!!pastedUrls.length && <>
        {pastedUrls.map((url, index) => (
          <Row
            key={`${url}-${index}`}
            className="no-gutters"
          >
            <Col
              className="d-flex align-items-center justify-content-center py-3"
              style={{ borderBottom: !acceptedFiles.length && index === pastedUrls.length - 1 ? undefined : `1px solid ${ColoursHex.$secondary}` }}
            >
              <span className="mr-3 d-flex align-items-center">
                <IonIcon
                  name="link-outline"
                  fontSize="20px"
                />
              </span>
              <div
                className="mr-auto"
              >
                <p className="text-sm mb-0">
                  <a
                    className="text-underline"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`${formatFileName(url)}`}
                  </a>
                </p>
                <p className="text-xs mb-0">Link to a url</p>
              </div>
              <span
                className="ml-3 d-flex align-items-center cursor-pointer"
                style={{ visibility: isUploading ? 'hidden' : 'visible' }}
                onClick={() => {
                  if (isUploading) return;
                  setPastedUrls(pastedUrls.filter(pasted => pasted !== url));
                }}
                tabIndex={0}
                role="button"
              >
                <IonIcon
                  name="close-outline"
                  fontSize="20px"
                />
              </span>
            </Col>
          </Row>
        ))}
      </>}

      {!!acceptedFiles.length && <>
        {acceptedFiles.map((acceptedFile, index) => (
          <Row
            key={`${acceptedFile.file.name}-${index}`}
            className="no-gutters"
          >
            <Col
              className="d-flex align-items-center justify-content-center py-3"
              style={{ borderBottom: index === acceptedFiles.length - 1 ? undefined : `1px solid ${ColoursHex.$secondary}` }}
            >
              <span className="mr-3 d-flex align-items-center">
                <IonIcon
                  name={acceptedFile.downloadURL ? 'checkmark-circle-outline' : acceptedFile.uploadError ? 'alert-circle-outline' : 'attach-outline'}
                  fontSize="20px"
                  color={acceptedFile.downloadURL ? ColoursHex.$green : acceptedFile.uploadError ? ColoursHex.$red : undefined}
                />
              </span>
              <div className="w-100">
                {isFileSizeExceeded(acceptedFile.file.size) && <>
                  <p className="mb-0 d-flex align-items-end">
                    <span className="text-sm mr-auto">{`${formatFileName(acceptedFile.file.name)}`}</span>
                  </p>
                  <p className="mb-0 text-xs text-danger">
                    File too big
                    <span className="ml-2 text-default">
                      - Upload via
                      &nbsp;
                      <span
                        className="text-underline cursor-pointer"
                        onClick={() => {
                          setUploadProvider(integrationWeTransferName);
                          setTimeout(() => openUrlBlank(integrationWeTransferUrl), 0.5 * TimeFrequency.OneSecond);
                        }}
                        tabIndex={0}
                        role="button"
                      >
                        {integrationWeTransferName}
                      </span>
                      &nbsp;
                      or
                      &nbsp;
                      <span
                        className="text-underline cursor-pointer"
                        onClick={() => {
                          setUploadProvider(integrationSmashName);
                          setTimeout(() => openUrlBlank(integrationSmashUrl), 0.5 * TimeFrequency.OneSecond);
                        }}
                        tabIndex={0}
                        role="button"
                      >
                        {integrationSmashName}
                      </span>
                    </span>
                  </p>
                </>}
                {!isFileSizeExceeded(acceptedFile.file.size) && <>
                  <p className="mb-0 d-flex align-items-end">
                    {!acceptedFile.uploadError &&
                    <span className="text-sm mr-auto">{`${formatFileName(acceptedFile.file.name)}`}</span>}
                    {acceptedFile.uploadError &&
                    <span
                      className="text-sm mr-auto text-danger cursor-pointer d-flex align-items-center"
                      onClick={async () => {
                        if (isUploading) {
                          return;
                        }
                        await processUpload({ isRetry: true });
                      }}
                      tabIndex={0}
                      role="button"
                    >
                      <span>
                            Upload failed
                      </span>
                      <span className="mt-1 ml-2 mr-1">
                        <IonIcon
                          name="reload-outline"
                        />
                      </span>
                      <span className="text-sm text-underline text-primary">Retry</span>
                    </span>}
                    {(isUploading || acceptedFile.uploadProgress) && <span className="text-xs text-secondary">{acceptedFile.uploadProgress ?? 0}%</span>}
                  </p>
                  {!(isUploading || acceptedFile.uploadProgress) &&
                  <p className="text-xs mb-0">File size:&nbsp;{formatBytes(acceptedFile.file.size)}</p>}
                  {(isUploading || acceptedFile.uploadProgress) &&
                  <Progress
                    className="mb-2 mt-1 w-100"
                    color="secondary"
                    min={0}
                    max={100}
                    value={acceptedFile.uploadProgress ?? 0}
                  />}
                </>}
              </div>
              <span
                className="ml-4 d-flex align-items-center cursor-pointer"
                onClick={async () => {
                  if (isUploading) {
                    return;
                  }
                  setAcceptedFiles(acceptedFiles.filter(accepted => accepted !== acceptedFile));
                }}
                tabIndex={0}
                role="button"
              >
                <IonIcon
                  name="close-outline"
                  fontSize="20px"
                />
              </span>
            </Col>
          </Row>
        ))}
      </>}

      <div className="mt-5 d-flex justify-content-center">
        <LoButton
          animateResponse={true}
          disabled={!canUpload()}
          onClick={async () => await processUpload()}
        >
          Upload
        </LoButton>
      </div>

    </>
  );
};
