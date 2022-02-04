import {
  FileCategory, FileFormat, FileKind, FileKindList, FileType
} from '@app/types';
import { flattenDeep } from 'lodash';

interface FileFormatsAndMIMETypes {
  formats: Array<FileKind['format']>;
  MIMETypes: Array<FileType['MIMEType']>;
}

export interface FileFormatsAndMIMETypesByCategory {
  [fileCategory: string]: FileFormatsAndMIMETypes;
}

/**
 *
 * EXAMPLE USAGE
 * fileFormatsAndMIMETypes({
 *   isGeneric: true,
 *   category: FileCategory.Image
 * })
 *
 * EXAMPLE RETURN
 * {
 *   "formats": [
 *     "Image"
 *   ],
 *   "MIMETypes": [
 *     "image/*"
 *   ]
 * }
 *
 *
 * EXAMPLE USAGE
 * fileFormatsAndMIMETypes({
 *   isGeneric: false,
 *   category: FileCategory.Image
 * })
 *
 * EXAMPLE RETURN
 * {
 *   "formats": [
 *     "Bitmap (BMP)",
 *     "Graphics Interchange Format (GIF)",
 *     "Icon",
 *     "Joint Photographic Experts Group (JPEG)",
 *     "Portable Network Graphics (PNG)",
 *     "Scalable Vector Graphics (SVG vector)",
 *     "Tagged Image File Format (TIFF)"
 *     "Raster image format for web graphics (WEBP)",
 *   ],
 *   "MIMETypes": [
 *     "image/bmp",
 *     "image/gif",
 *     "image/vnd.microsoft.icon",
 *     "image/jpeg",
 *     "image/png",
 *     "image/svg+xml",
 *     "image/tiff",
 *     "image/webp"
 *   ]
 * }
 *
 */
export const fileFormatsAndMIMETypes = ({
  isGeneric,
  category,
  format
}: {
  isGeneric: FileKind['isGeneric'];
  category: FileCategory;
  format?: FileFormat;
  }): FileFormatsAndMIMETypes =>
  FileKindList
    .filter(({
      isGeneric: _isGeneric, categories, format: _format
    }) =>
      _isGeneric === isGeneric
      && categories.includes(category)
      && (format ? _format === format : true))
    .reduce((obj, val) => ({
      formats: [
        ...obj.formats,
        val.format
      ],
      MIMETypes: [
        ...obj.MIMETypes,
        ...val.fileTypes.map(({ MIMEType }) => MIMEType)
      ]
    }), {
      formats: [],
      MIMETypes: []
    } as FileFormatsAndMIMETypes);

/**
 *
 * EXAMPLE USAGE
 * fileFormatsAndMIMETypesByCategory({
 *   isGeneric: true,
 *   category: FileCategory.Image
 * })
 *
 * EXAMPLE RETURN
 * {
 *   "Image": {
 *     "formats": [
 *       "Image"
 *     ],
 *     "MIMETypes": [
 *       "image/*"
 *     ]
 *   }
 * }
 *
 *
 * EXAMPLE USAGE
 * fileFormatsAndMIMETypesByCategory({
 *   isGeneric: false,
 *   category: FileCategory.Image
 * })
 *
 * EXAMPLE RETURN
 * {
 *   "Image": {
 *     "formats": [
 *       "Bitmap (BMP)",
 *       "Graphics Interchange Format (GIF)",
 *       "Icon",
 *       "Joint Photographic Experts Group (JPEG)",
 *       "Portable Network Graphics (PNG)",
 *       "Scalable Vector Graphics (SVG vector)",
 *       "Tagged Image File Format (TIFF)"
 *       "Raster image format for web graphics (WEBP)",
 *     ],
 *     "MIMETypes": [
 *       "image/bmp",
 *       "image/gif",
 *       "image/vnd.microsoft.icon",
 *       "image/jpeg",
 *       "image/png",
 *       "image/svg+xml",
 *       "image/tiff",
 *       "image/webp"
 *     ]
 *   }
 * }
 *
 */
export const fileFormatsAndMIMETypesByCategory = ({
  isGeneric,
  category,
  format
}: {
  isGeneric: FileKind['isGeneric'];
  category: FileCategory;
  format?: FileFormat;
}): FileFormatsAndMIMETypesByCategory  => ({ [category]: fileFormatsAndMIMETypes({
  isGeneric,
  category,
  format
}) });

/**
 *
 * EXAMPLE USAGE
 * fileFormatFromMIMEType('image/*')
 *
 * EXAMPLE RETURN
 * 'Image'
 *
 *
 * EXAMPLE USAGE
 * fileFormatFromMIMEType('image/png')
 *
 * EXAMPLE RETURN
 * 'Portable Network Graphics (PNG)'
 *
 */
export const fileFormatFromMIMEType = (FileMIMEType: FileType['MIMEType']): FileKind['format'] => {
  return FileKindList
    .filter(({ isGeneric }) => !isGeneric)
    .find(({ fileTypes }) =>
      fileTypes.some(({ MIMEType }) => MIMEType === FileMIMEType)
    )?.format
    ??
    FileKindList
      .filter(({ isGeneric }) => isGeneric)
      .find(({ fileTypes }) =>
        fileTypes.some(({ MIMEType }) => FileMIMEType.includes(MIMEType.replace('*', '')))
      )?.format
    ?? FileFormat.Unknown;
};

/**
 *
 * EXAMPLE USAGE
 * MIMETypesFromFileFormatsAndMIMETypesByCategory(
 *   fileFormatsAndMIMETypesByCategory({
 *     isGeneric: true,
 *     category: FileCategory.Image
 *   })
 * );
 *
 * EXAMPLE RETURN
 * ['image/*']
 *
 *
 * EXAMPLE USAGE
 * MIMETypesFromFileFormatsAndMIMETypesByCategory(
 *   fileFormatsAndMIMETypesByCategory({
 *     isGeneric: false,
 *     category: FileCategory.Image
 *   })
 * );
 *
 * EXAMPLE RETURN
 * [
 *   "image/bmp",
 *   "image/gif",
 *   "image/vnd.microsoft.icon",
 *   "image/jpeg",
 *   "image/png",
 *   "image/svg+xml",
 *   "image/tiff",
 *   "image/webp"
 * ]
 *
 */
export const MIMETypesFromFileFormatsAndMIMETypesByCategory = (fileFormatsAndMIMETypesForCategory: FileFormatsAndMIMETypesByCategory): Array<FileType['MIMEType']> =>
  flattenDeep(Object.values(fileFormatsAndMIMETypesForCategory).map(({ MIMETypes }) => MIMETypes));

export const hasMIMEType = (fileType: FileType['MIMEType'], MIMETypes: Array<FileType['MIMEType']>): boolean =>
  MIMETypes.some(MIMEType => MIMEType.includes('*') ? fileType.includes(MIMEType.replace('*', '')) : fileType === MIMEType);
