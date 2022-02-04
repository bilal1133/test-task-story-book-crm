/**
 * sources:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * https://filext.com/faq/office_mime_types.html
 * https://stackoverflow.com/a/51790980
 */

export interface FileKind {
  isGeneric: boolean;
  categories: Array<FileCategory>;
  format: FileFormat;
  fileTypes: Array<FileType>;
}

export interface FileType {
  extension: string;
  MIMEType: string;
}

export enum FileCategory {
  Archive = 'Archive',
  Audio = 'Audio',
  Document = 'Document',
  eBook = 'eBook',
  Font = 'Font',
  Image = 'Image',
  Presentation = 'Presentation',
  Slides = 'Slides',
  Spreadsheet = 'Spreadsheet',
  Text = 'Text',
  Video = 'Video',
  DataTransfer = 'Data Transfer'
}

export enum FileFormat {
  // generic
  Audio = 'Audio',
  Font = 'Font',
  Image = 'Image',
  Text = 'Text',
  Video = 'Video',
  // application-specific
  AppleKeynote = 'Apple Keynote',
  AppleNumbers = 'Apple Numbers',
  ApplePages = 'Apple Pages',
  MSExcel = 'MS Excel',
  MSPowerPoint = 'MS PowerPoint',
  MSWord = 'MS Word',
  // extension-specific : documents
  CSV = 'Comma-separated values (CSV)',
  EPUB = 'Electronic publication (EPUB)',
  PDF = 'Adobe Portable Document Format (PDF)',
  RTF = 'Rich Text Format (RTF)',
  // extension-specific : images
  ICO = 'Icon',
  BMP = 'Bitmap (BMP)',
  GIF = 'Graphics Interchange Format (GIF)',
  JPEG = 'Joint Photographic Experts Group (JPEG)',
  PNG = 'Portable Network Graphics (PNG)',
  SVG = 'Scalable Vector Graphics (SVG vector)',
  TIFF = 'Tagged Image File Format (TIFF)',
  WEBP = 'Raster image format for web graphics (WEBP)',
  // extension-specific : archives
  RAR = 'Roshal Archive (Rar)',
  ZIP = 'Archive (ZIP)',
  '7Z' = 'Archive (7-Zip)',
  // extension-specific : data transfer
  JSON = 'JavaScript Object Notation (JSON)',
  // extra value to use as fallback in functions
  Unknown = 'Unknown',
}

export const FileKindList: Array<FileKind> = [
  // generic
  {
    isGeneric: true,
    categories: [
      FileCategory.Audio
    ],
    format: FileFormat.Audio,
    fileTypes: [
      {
        extension: '*',
        MIMEType: 'audio/*'
      }
    ]
  },
  {
    isGeneric: true,
    categories: [
      FileCategory.Font
    ],
    format: FileFormat.Font,
    fileTypes: [
      {
        extension: '*',
        MIMEType: 'font/*'
      }
    ]
  },
  {
    isGeneric: true,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.Image,
    fileTypes: [
      {
        extension: '*',
        MIMEType: 'image/*'
      }
    ]
  },
  {
    isGeneric: true,
    categories: [
      FileCategory.Text
    ],
    format: FileFormat.Text,
    fileTypes: [
      {
        extension: '*',
        MIMEType: 'text/*'
      }
    ]
  },
  {
    isGeneric: true,
    categories: [
      FileCategory.Video
    ],
    format: FileFormat.Video,
    fileTypes: [
      {
        extension: '*',
        MIMEType: 'video/*'
      }
    ]
  },
  // application-specific
  {
    isGeneric: false,
    categories: [
      FileCategory.Document,
      FileCategory.Presentation,
      FileCategory.Slides
    ],
    format: FileFormat.AppleKeynote,
    fileTypes: [
      {
        extension: '.key',
        MIMEType: 'application/x-iwork-keynote-sffkey'
      },
      {
        extension: '.key',
        MIMEType: 'application/vnd.apple.keynote'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Document,
      FileCategory.Spreadsheet
    ],
    format: FileFormat.AppleNumbers,
    fileTypes: [
      {
        extension: '.numbers',
        MIMEType: 'application/x-iwork-numbers-sffnumbers'
      },
      {
        extension: '.numbers',
        MIMEType: 'application/vnd.apple.numbers'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Document
    ],
    format: FileFormat.ApplePages,
    fileTypes: [
      {
        extension: '.pages',
        MIMEType: 'application/x-iwork-pages-sffpages'
      },
      {
        extension: '.pages',
        MIMEType: 'application/vnd.apple.pages'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Document,
      FileCategory.Spreadsheet
    ],
    format: FileFormat.MSExcel,
    fileTypes: [
      {
        extension: '.xls',
        MIMEType: 'application/vnd.ms-excel'
      },
      {
        extension: '.xlt',
        MIMEType: 'application/vnd.ms-excel'
      },
      {
        extension: '.xla',
        MIMEType: 'application/vnd.ms-excel'
      },
      {
        extension: '.xlsx',
        MIMEType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
      {
        extension: '.xltx',
        MIMEType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template'
      },
      {
        extension: '.xlsm',
        MIMEType: 'application/vnd.ms-excel.sheet.macroEnabled.12'
      },
      {
        extension: '.xltm',
        MIMEType: 'application/vnd.ms-excel.template.macroEnabled.12'
      },
      {
        extension: '.xlam',
        MIMEType: 'application/vnd.ms-excel.addin.macroEnabled.12'
      },
      {
        extension: '.xlsb',
        MIMEType: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Document,
      FileCategory.Presentation,
      FileCategory.Slides
    ],
    format: FileFormat.MSPowerPoint,
    fileTypes: [
      {
        extension: '.ppt',
        MIMEType: 'application/vnd.ms-powerpoint'
      },
      {
        extension: '.pot',
        MIMEType: 'application/vnd.ms-powerpoint'
      },
      {
        extension: '.pps',
        MIMEType: 'application/vnd.ms-powerpoint'
      },
      {
        extension: '.ppa',
        MIMEType: 'application/vnd.ms-powerpoint'
      },
      {
        extension: '.pptx',
        MIMEType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      },
      {
        extension: '.potx',
        MIMEType: 'application/vnd.openxmlformats-officedocument.presentationml.template'
      },
      {
        extension: '.ppsx',
        MIMEType: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
      },
      {
        extension: '.ppam',
        MIMEType: 'application/vnd.ms-powerpoint.addin.macroEnabled.12'
      },
      {
        extension: '.pptm',
        MIMEType: 'application/vnd.ms-powerpoint.presentation.macroEnabled.12'
      },
      {
        extension: '.potm',
        MIMEType: 'application/vnd.ms-powerpoint.template.macroEnabled.12'
      },
      {
        extension: '.ppsm',
        MIMEType: 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Document
    ],
    format: FileFormat.MSWord,
    fileTypes: [
      {
        extension: '.doc',
        MIMEType: 'application/msword'
      },
      {
        extension: '.dot',
        MIMEType: 'application/msword'
      },
      {
        extension: '.docx',
        MIMEType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      },
      {
        extension: '.dotx',
        MIMEType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template'
      },
      {
        extension: '.docm',
        MIMEType: 'application/vnd.ms-word.document.macroEnabled.12'
      },
      {
        extension: '.dotm',
        MIMEType: 'application/vnd.ms-word.template.macroEnabled.12'
      }
    ]
  },
  // extension-specific : documents
  {
    isGeneric: false,
    categories: [
      FileCategory.Document,
      FileCategory.Spreadsheet
    ],
    format: FileFormat.CSV,
    fileTypes: [
      {
        extension: '.csv',
        MIMEType: 'text/csv'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Document,
      FileCategory.eBook
    ],
    format: FileFormat.EPUB,
    fileTypes: [
      {
        extension: '.epub',
        MIMEType: 'application/epub+zip'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Document,
      FileCategory.Presentation,
      FileCategory.Slides
    ],
    format: FileFormat.PDF,
    fileTypes: [
      {
        extension: '.pdf',
        MIMEType: 'application/pdf'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Document
    ],
    format: FileFormat.RTF,
    fileTypes: [
      {
        extension: '.rtf',
        MIMEType: 'application/rtf'
      }
    ]
  },
  // extension-specific : images
  {
    isGeneric: false,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.BMP,
    fileTypes: [
      {
        extension: '.bmp',
        MIMEType: 'image/bmp'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.GIF,
    fileTypes: [
      {
        extension: '.gif',
        MIMEType: 'image/gif'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.ICO,
    fileTypes: [
      {
        extension: '.ico',
        MIMEType: 'image/vnd.microsoft.icon'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.JPEG,
    fileTypes: [
      {
        extension: '.jpeg, .jpg',
        MIMEType: 'image/jpeg'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.PNG,
    fileTypes: [
      {
        extension: '.png',
        MIMEType: 'image/png'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.SVG,
    fileTypes: [
      {
        extension: '.svg',
        MIMEType: 'image/svg+xml'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.TIFF,
    fileTypes: [
      {
        extension: '.tif, .tiff',
        MIMEType: 'image/tiff'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Image
    ],
    format: FileFormat.WEBP,
    fileTypes: [
      {
        extension: '.webp',
        MIMEType: 'image/webp'
      }
    ]
  },
  // extension-specific : archives
  {
    isGeneric: false,
    categories: [
      FileCategory.Archive
    ],
    format: FileFormat.RAR,
    fileTypes: [
      {
        extension: '.rar',
        MIMEType: 'application/vnd.rar'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Archive
    ],
    format: FileFormat.ZIP,
    fileTypes: [
      {
        extension: '.zip',
        MIMEType: 'application/zip'
      }
    ]
  },
  {
    isGeneric: false,
    categories: [
      FileCategory.Archive
    ],
    format: FileFormat['7Z'],
    fileTypes: [
      {
        extension: '.7z',
        MIMEType: 'application/x-7z-compressed'
      }
    ]
  },
  // extension-specific : data transfer
  {
    isGeneric: false,
    categories: [
      FileCategory.DataTransfer
    ],
    format: FileFormat.JSON,
    fileTypes: [
      {
        extension: '.json',
        MIMEType: 'application/json'
      }
    ]
  }
];
