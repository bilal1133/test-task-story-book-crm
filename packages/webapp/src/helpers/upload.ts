const FILE_SIZE_MAX = 10 * 1024 * 1024; // 10 MB, expressed in Bytes. Same rule applied to cloud storage.

export const isFileSizeExceeded = (size: File['size']): boolean => size > FILE_SIZE_MAX;

export const formatBytes = (bytes: File['size'], decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB'
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
