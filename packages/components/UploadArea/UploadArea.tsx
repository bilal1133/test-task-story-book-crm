import {
  GoogleDrivePicker, InputDropzone, InputPasteURL, InputPasteURLProps, IonIcon, LoButton
} from '@lolab/components';
import {
  CSSAnimationDuration, integrationSmashName, integrationSmashUrl, integrationWeTransferName, integrationWeTransferUrl
} from '@app/constants';
import {
  delay, formatBytes, isFileSizeExceeded, openUrlBlank
} from '@app/helpers';
import { uploadFile } from '@lolab/database';
import {
  ColoursHex, TimeFrequency
} from '@app/types';
import { useState } from 'react';
import {
  DropzoneOptions, FileRejection
} from 'react-dropzone';
import {
  Col, Progress, Row
} from 'reactstrap';

// TODO: make files type global // TODO: make size a formatted string
export const UploadArea = ({
  uploadPathPrefix,
  onUploadComplete,
  multiple = true,
  enableLinks = true,
  enableIntegrations = true,
  autoUpload = false
}: {

  uploadPathPrefix: string;
  onUploadComplete: (files: Array<{ name: string; url: string; size?: number; }>) => Promise<void>
  multiple?: boolean;
  enableLinks?: boolean;
  enableIntegrations?: boolean;
  autoUpload?: boolean;
}): JSX.Element => {

  const [
    pastedUrls,
    setPastedUrls
  ] = useState<Array<string>>([]);

  const [
    uploadProvider,
    setUploadProvider
  ] = useState<string>('');

  const [
    acceptedFiles,
    setAcceptedFiles
  ] = useState<Array<{ file: File; uploadProgress?: number; uploadError?: boolean; downloadURL?: string; ignore?: boolean; }>>([]);

  const [
    , setRejectedFiles
  ] = useState<Array<FileRejection>>([]);

  // const [isSameName, setIsSameName] = useState<boolean>(false); // KEEP: this is for when you paste or drop a file with the same name as an existing one, to notify the user

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
    // if (files.some(file => existingFiles.includes(file.name))) {
    //   setIsSameName(true);
    //   setTimeout(() => {
    //     setIsSameName(false);
    //   }, 4 * TimeFrequency.ONE_SECOND);
    //   return;
    // }
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
    if (autoUpload) {
      await processUpload();
    }
    return;
  };

  const onDropRejected: DropzoneOptions['onDropRejected'] = (files, event) => {
    console.log('---- onDropRejected -> files', files);
    console.log('---- onDropRejected -> event', event);
    setRejectedFiles(files);
    return;
  };

  const onPastedUrlValid: InputPasteURLProps['onPastedUrlValid'] = (urls: Array<string>) => {
    console.log('---- onPastedUrlValid -> urls', urls);
    if (uploadProvider.length) setUploadProvider('');
    // if (pastedUrls.includes(url)) {
    // //   setIsSameName(true);
    // //   setTimeout(() => {
    // //     setIsSameName(false);
    // //   }, 4 * TimeFrequency.ONE_SECOND);
    //   return;
    // }
    setPastedUrls([
      ...urls.filter(url => !pastedUrls.includes(url)),
      ...pastedUrls
    ]);
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
        <p className="text-center mb-3 text-xs text-secondary">
        Upload files to these providers &amp; paste the link below
        </p>
        <div className="mb-3 d-flex justify-content-center">
          <LoButton
            className="mr-2"
            color="white"
            onClick={() => {
              setUploadProvider(integrationWeTransferName);
              setTimeout(() => openUrlBlank(integrationWeTransferUrl), 0.5 * TimeFrequency.OneSecond);
            }}
          >
            <span className="d-flex align-items-center">
              <img
                src="/icons/WeTransfer-Logo-Button.png"
                className="mr-2"
                width="16"
                alt="WeTransfer logo"
              />
              {integrationWeTransferName}
            </span>
          </LoButton>
          <LoButton
            color="white"
            onClick={() => {
              setUploadProvider(integrationSmashName);
              setTimeout(() => openUrlBlank(integrationSmashUrl), 0.5 * TimeFrequency.OneSecond);
            }}
          >
            <span className="d-flex align-items-center">
              <img
                src="/icons/Smash-Logo-Button-white-bg.png"
                className="mr-2"
                width="16"
                alt="Smash logo"
              />
              {integrationSmashName}
            </span>
          </LoButton>
        </div>
        <p className="text-center mb-2 text-xs text-secondary">
        or
        </p>
        <div className="mb-4">
          <InputPasteURL
            disabled={isUploading || (!multiple && canUpload())}
            // TODO: FIXME: is the `|| (!multiple && canUpload())}` correct ???
            onPastedUrlValid={onPastedUrlValid}
          />
          {!!uploadProvider.length && <p className="text-xs mb-0 mt-1">Rember to paste here the link generated by {uploadProvider}</p>}
        </div>
      </>}

      {enableIntegrations && <>
        <p className="text-center mb-3 text-xs text-secondary">
        Select files from
        </p>
        <div className="mb-3 d-flex justify-content-center">
          <GoogleDrivePicker
            className="mr-2"
            pickerView="DOCS_IMAGES"
            onPicked={onPastedUrlValid}
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
          {/* <LoButton color="white">One Drive</LoButton> */}
        </div>
        <p className="text-center mb-2 text-xs text-secondary">
        or
        </p>
      </>}

      <div className={autoUpload ? '' : 'mb-3'}>
        <InputDropzone
          disabled={isUploading}
          multiple={multiple}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      </div>

      {/* {isSameName && <p className="text-sm text-warning pt-3 mb-0 ">A file with the same name has already been added.</p>} */}

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

      {!autoUpload && (
        <div className="mt-5 d-flex justify-content-center">
          <LoButton
            animateResponse={true}
            disabled={!canUpload()}
            onClick={async () => await processUpload()}
          >
          Upload
          </LoButton>
        </div>
      )}

    </>
  );
};
