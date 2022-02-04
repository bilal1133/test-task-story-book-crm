import { CurrencyInfo } from '@app/types';

// source: https://www.iso.org/iso-4217-currency-codes.html
// publish date: August 29, 2018
export enum CurrencyCodeISO4217 {
  AED = 'AED',
  AFN = 'AFN',
  ALL = 'ALL',
  AMD = 'AMD',
  ANG = 'ANG',
  AOA = 'AOA',
  ARS = 'ARS',
  AUD = 'AUD',
  AWG = 'AWG',
  AZN = 'AZN',
  BAM = 'BAM',
  BBD = 'BBD',
  BDT = 'BDT',
  BGN = 'BGN',
  BHD = 'BHD',
  BIF = 'BIF',
  BMD = 'BMD',
  BND = 'BND',
  BOB = 'BOB',
  BRL = 'BRL',
  BSD = 'BSD',
  BTN = 'BTN',
  BWP = 'BWP',
  BYN = 'BYN',
  BZD = 'BZD',
  CAD = 'CAD',
  CDF = 'CDF',
  CHF = 'CHF',
  CLP = 'CLP',
  CNY = 'CNY',
  COP = 'COP',
  CRC = 'CRC',
  CUC = 'CUC',
  CUP = 'CUP',
  CVE = 'CVE',
  CZK = 'CZK',
  DJF = 'DJF',
  DKK = 'DKK',
  DOP = 'DOP',
  DZD = 'DZD',
  EGP = 'EGP',
  ERN = 'ERN',
  ETB = 'ETB',
  EUR = 'EUR',
  FJD = 'FJD',
  FKP = 'FKP',
  GBP = 'GBP',
  GEL = 'GEL',
  GHS = 'GHS',
  GIP = 'GIP',
  GMD = 'GMD',
  GNF = 'GNF',
  GTQ = 'GTQ',
  GYD = 'GYD',
  HKD = 'HKD',
  HNL = 'HNL',
  HRK = 'HRK',
  HTG = 'HTG',
  HUF = 'HUF',
  IDR = 'IDR',
  ILS = 'ILS',
  INR = 'INR',
  IQD = 'IQD',
  IRR = 'IRR',
  ISK = 'ISK',
  JMD = 'JMD',
  JOD = 'JOD',
  JPY = 'JPY',
  KES = 'KES',
  KGS = 'KGS',
  KHR = 'KHR',
  KMF = 'KMF',
  KPW = 'KPW',
  KRW = 'KRW',
  KWD = 'KWD',
  KYD = 'KYD',
  KZT = 'KZT',
  LAK = 'LAK',
  LBP = 'LBP',
  LKR = 'LKR',
  LRD = 'LRD',
  LSL = 'LSL',
  LYD = 'LYD',
  MAD = 'MAD',
  MDL = 'MDL',
  MGA = 'MGA',
  MKD = 'MKD',
  MMK = 'MMK',
  MNT = 'MNT',
  MOP = 'MOP',
  MRU = 'MRU',
  MUR = 'MUR',
  MVR = 'MVR',
  MWK = 'MWK',
  MXN = 'MXN',
  MYR = 'MYR',
  MZN = 'MZN',
  NAD = 'NAD',
  NGN = 'NGN',
  NIO = 'NIO',
  NOK = 'NOK',
  NPR = 'NPR',
  NZD = 'NZD',
  OMR = 'OMR',
  PAB = 'PAB',
  PEN = 'PEN',
  PGK = 'PGK',
  PHP = 'PHP',
  PKR = 'PKR',
  PLN = 'PLN',
  PYG = 'PYG',
  QAR = 'QAR',
  RON = 'RON',
  RSD = 'RSD',
  RUB = 'RUB',
  RWF = 'RWF',
  SAR = 'SAR',
  SBD = 'SBD',
  SCR = 'SCR',
  SDG = 'SDG',
  SEK = 'SEK',
  SGD = 'SGD',
  SHP = 'SHP',
  SLL = 'SLL',
  SOS = 'SOS',
  SRD = 'SRD',
  SSP = 'SSP',
  STN = 'STN',
  SVC = 'SVC',
  SYP = 'SYP',
  SZL = 'SZL',
  THB = 'THB',
  TJS = 'TJS',
  TMT = 'TMT',
  TND = 'TND',
  TOP = 'TOP',
  TRY = 'TRY',
  TTD = 'TTD',
  TWD = 'TWD',
  TZS = 'TZS',
  UAH = 'UAH',
  UGX = 'UGX',
  USD = 'USD',
  UYU = 'UYU',
  UZS = 'UZS',
  VES = 'VES',
  VND = 'VND',
  VUV = 'VUV',
  WST = 'WST',
  XAF = 'XAF',
  XCD = 'XCD',
  XDR = 'XDR',
  XOF = 'XOF',
  XPF = 'XPF',
  XSU = 'XSU',
  XUA = 'XUA',
  YER = 'YER',
  ZAR = 'ZAR',
  ZMW = 'ZMW',
  ZWL = 'ZWL'
}

export const currencyList: Array<CurrencyInfo> = [
  {
    code: CurrencyCodeISO4217.AED,
    name: 'UAE Dirham',
    symbol: 'AED'
  },
  {
    code: CurrencyCodeISO4217.AFN,
    name: 'Afghani',
    symbol: 'AFN'
  },
  {
    code: CurrencyCodeISO4217.ALL,
    name: 'Lek',
    symbol: 'ALL'
  },
  {
    code: CurrencyCodeISO4217.AMD,
    name: 'Armenian Dram',
    symbol: 'AMD'
  },
  {
    code: CurrencyCodeISO4217.ANG,
    name: 'Netherlands Antillean Guilder',
    symbol: 'ANG'
  },
  {
    code: CurrencyCodeISO4217.AOA,
    name: 'Kwanza',
    symbol: 'AOA'
  },
  {
    code: CurrencyCodeISO4217.ARS,
    name: 'Argentine Peso',
    symbol: 'ARS'
  },
  {
    code: CurrencyCodeISO4217.AUD,
    name: 'Australian Dollar',
    symbol: 'AU$'
  },
  {
    code: CurrencyCodeISO4217.AWG,
    name: 'Aruban Florin',
    symbol: 'AWG'
  },
  {
    code: CurrencyCodeISO4217.AZN,
    name: 'Azerbaijan Manat',
    symbol: 'AZN'
  },
  {
    code: CurrencyCodeISO4217.BAM,
    name: 'Convertible Mark',
    symbol: 'BAM'
  },
  {
    code: CurrencyCodeISO4217.BBD,
    name: 'Barbados Dollar',
    symbol: 'BBD'
  },
  {
    code: CurrencyCodeISO4217.BDT,
    name: 'Taka',
    symbol: 'BDT'
  },
  {
    code: CurrencyCodeISO4217.BGN,
    name: 'Bulgarian Lev',
    symbol: 'BGN'
  },
  {
    code: CurrencyCodeISO4217.BHD,
    name: 'Bahraini Dinar',
    symbol: 'BHD'
  },
  {
    code: CurrencyCodeISO4217.BIF,
    name: 'Burundi Franc',
    symbol: 'BIF'
  },
  {
    code: CurrencyCodeISO4217.BMD,
    name: 'Bermudian Dollar',
    symbol: 'BMD'
  },
  {
    code: CurrencyCodeISO4217.BND,
    name: 'Brunei Dollar',
    symbol: 'BND'
  },
  {
    code: CurrencyCodeISO4217.BOB,
    name: 'Boliviano',
    symbol: 'BOB'
  },
  {
    code: CurrencyCodeISO4217.BRL,
    name: 'Brazilian Real',
    symbol: 'R$'
  },
  {
    code: CurrencyCodeISO4217.BSD,
    name: 'Bahamian Dollar',
    symbol: 'BSD'
  },
  {
    code: CurrencyCodeISO4217.BTN,
    name: 'Ngultrum',
    symbol: 'BTN'
  },
  {
    code: CurrencyCodeISO4217.BWP,
    name: 'Pula',
    symbol: 'BWP'
  },
  {
    code: CurrencyCodeISO4217.BYN,
    name: 'Belarusian Ruble',
    symbol: 'BYN'
  },
  {
    code: CurrencyCodeISO4217.BZD,
    name: 'Belize Dollar',
    symbol: 'BZD'
  },
  {
    code: CurrencyCodeISO4217.CAD,
    name: 'Canadian Dollar',
    symbol: 'CA$'
  },
  {
    code: CurrencyCodeISO4217.CDF,
    name: 'Congolese Franc',
    symbol: 'CDF'
  },
  {
    code: CurrencyCodeISO4217.CHF,
    name: 'Swiss Franc',
    symbol: 'CHF'
  },
  {
    code: CurrencyCodeISO4217.CLP,
    name: 'Chilean Peso',
    symbol: 'CLP'
  },
  {
    code: CurrencyCodeISO4217.CNY,
    name: 'Yuan Renminbi',
    symbol: 'CN¥'
  },
  {
    code: CurrencyCodeISO4217.COP,
    name: 'Colombian Peso',
    symbol: 'COP'
  },
  {
    code: CurrencyCodeISO4217.CRC,
    name: 'Costa Rican Colon',
    symbol: 'CRC'
  },
  {
    code: CurrencyCodeISO4217.CUC,
    name: 'Peso Convertible',
    symbol: 'CUC'
  },
  {
    code: CurrencyCodeISO4217.CUP,
    name: 'Cuban Peso',
    symbol: 'CUP'
  },
  {
    code: CurrencyCodeISO4217.CVE,
    name: 'Cabo Verde Escudo',
    symbol: 'CVE'
  },
  {
    code: CurrencyCodeISO4217.CZK,
    name: 'Czech Koruna',
    symbol: 'CZK'
  },
  {
    code: CurrencyCodeISO4217.DJF,
    name: 'Djibouti Franc',
    symbol: 'DJF'
  },
  {
    code: CurrencyCodeISO4217.DKK,
    name: 'Danish Krone',
    symbol: 'DKK'
  },
  {
    code: CurrencyCodeISO4217.DOP,
    name: 'Dominican Peso',
    symbol: 'DOP'
  },
  {
    code: CurrencyCodeISO4217.DZD,
    name: 'Algerian Dinar',
    symbol: 'DZD'
  },
  {
    code: CurrencyCodeISO4217.EGP,
    name: 'Egyptian Pound',
    symbol: 'EGP'
  },
  {
    code: CurrencyCodeISO4217.ERN,
    name: 'Nakfa',
    symbol: 'ERN'
  },
  {
    code: CurrencyCodeISO4217.ETB,
    name: 'Ethiopian Birr',
    symbol: 'ETB'
  },
  {
    code: CurrencyCodeISO4217.EUR,
    name: 'Euro',
    symbol: '€'
  },
  {
    code: CurrencyCodeISO4217.FJD,
    name: 'Fiji Dollar',
    symbol: 'FJD'
  },
  {
    code: CurrencyCodeISO4217.FKP,
    name: 'Falkland Islands Pound',
    symbol: 'FKP'
  },
  {
    code: CurrencyCodeISO4217.GBP,
    name: 'Pound Sterling',
    symbol: '£'
  },
  {
    code: CurrencyCodeISO4217.GEL,
    name: 'Lari',
    symbol: 'GEL'
  },
  {
    code: CurrencyCodeISO4217.GHS,
    name: 'Ghana Cedi',
    symbol: 'GHS'
  },
  {
    code: CurrencyCodeISO4217.GIP,
    name: 'Gibraltar Pound',
    symbol: 'GIP'
  },
  {
    code: CurrencyCodeISO4217.GMD,
    name: 'Dalasi',
    symbol: 'GMD'
  },
  {
    code: CurrencyCodeISO4217.GNF,
    name: 'Guinean Franc',
    symbol: 'GNF'
  },
  {
    code: CurrencyCodeISO4217.GTQ,
    name: 'Quetzal',
    symbol: 'GTQ'
  },
  {
    code: CurrencyCodeISO4217.GYD,
    name: 'Guyana Dollar',
    symbol: 'GYD'
  },
  {
    code: CurrencyCodeISO4217.HKD,
    name: 'Hong Kong Dollar',
    symbol: 'HK$'
  },
  {
    code: CurrencyCodeISO4217.HNL,
    name: 'Lempira',
    symbol: 'HNL'
  },
  {
    code: CurrencyCodeISO4217.HRK,
    name: 'Kuna',
    symbol: 'HRK'
  },
  {
    code: CurrencyCodeISO4217.HTG,
    name: 'Gourde',
    symbol: 'HTG'
  },
  {
    code: CurrencyCodeISO4217.HUF,
    name: 'Forint',
    symbol: 'HUF'
  },
  {
    code: CurrencyCodeISO4217.IDR,
    name: 'Rupiah',
    symbol: 'IDR'
  },
  {
    code: CurrencyCodeISO4217.ILS,
    name: 'New Israeli Sheqel',
    symbol: '₪'
  },
  {
    code: CurrencyCodeISO4217.INR,
    name: 'Indian Rupee',
    symbol: '₹'
  },
  {
    code: CurrencyCodeISO4217.IQD,
    name: 'Iraqi Dinar',
    symbol: 'IQD'
  },
  {
    code: CurrencyCodeISO4217.IRR,
    name: 'Iranian Rial',
    symbol: 'IRR'
  },
  {
    code: CurrencyCodeISO4217.ISK,
    name: 'Iceland Krona',
    symbol: 'ISK'
  },
  {
    code: CurrencyCodeISO4217.JMD,
    name: 'Jamaican Dollar',
    symbol: 'JMD'
  },
  {
    code: CurrencyCodeISO4217.JOD,
    name: 'Jordanian Dinar',
    symbol: 'JOD'
  },
  {
    code: CurrencyCodeISO4217.JPY,
    name: 'Yen',
    symbol: '¥'
  },
  {
    code: CurrencyCodeISO4217.KES,
    name: 'Kenyan Shilling',
    symbol: 'KES'
  },
  {
    code: CurrencyCodeISO4217.KGS,
    name: 'Som',
    symbol: 'KGS'
  },
  {
    code: CurrencyCodeISO4217.KHR,
    name: 'Riel',
    symbol: 'KHR'
  },
  {
    code: CurrencyCodeISO4217.KMF,
    name: 'Comorian Franc ',
    symbol: 'KMF'
  },
  {
    code: CurrencyCodeISO4217.KPW,
    name: 'North Korean Won',
    symbol: 'KPW'
  },
  {
    code: CurrencyCodeISO4217.KRW,
    name: 'Won',
    symbol: '₩'
  },
  {
    code: CurrencyCodeISO4217.KWD,
    name: 'Kuwaiti Dinar',
    symbol: 'KWD'
  },
  {
    code: CurrencyCodeISO4217.KYD,
    name: 'Cayman Islands Dollar',
    symbol: 'KYD'
  },
  {
    code: CurrencyCodeISO4217.KZT,
    name: 'Tenge',
    symbol: 'KZT'
  },
  {
    code: CurrencyCodeISO4217.LAK,
    name: 'Lao Kip',
    symbol: 'LAK'
  },
  {
    code: CurrencyCodeISO4217.LBP,
    name: 'Lebanese Pound',
    symbol: 'LBP'
  },
  {
    code: CurrencyCodeISO4217.LKR,
    name: 'Sri Lanka Rupee',
    symbol: 'LKR'
  },
  {
    code: CurrencyCodeISO4217.LRD,
    name: 'Liberian Dollar',
    symbol: 'LRD'
  },
  {
    code: CurrencyCodeISO4217.LSL,
    name: 'Loti',
    symbol: 'LSL'
  },
  {
    code: CurrencyCodeISO4217.LYD,
    name: 'Libyan Dinar',
    symbol: 'LYD'
  },
  {
    code: CurrencyCodeISO4217.MAD,
    name: 'Moroccan Dirham',
    symbol: 'MAD'
  },
  {
    code: CurrencyCodeISO4217.MDL,
    name: 'Moldovan Leu',
    symbol: 'MDL'
  },
  {
    code: CurrencyCodeISO4217.MGA,
    name: 'Malagasy Ariary',
    symbol: 'MGA'
  },
  {
    code: CurrencyCodeISO4217.MKD,
    name: 'Denar',
    symbol: 'MKD'
  },
  {
    code: CurrencyCodeISO4217.MMK,
    name: 'Kyat',
    symbol: 'MMK'
  },
  {
    code: CurrencyCodeISO4217.MNT,
    name: 'Tugrik',
    symbol: 'MNT'
  },
  {
    code: CurrencyCodeISO4217.MOP,
    name: 'Pataca',
    symbol: 'MOP'
  },
  {
    code: CurrencyCodeISO4217.MRU,
    name: 'Ouguiya',
    symbol: 'MRU'
  },
  {
    code: CurrencyCodeISO4217.MUR,
    name: 'Mauritius Rupee',
    symbol: 'MUR'
  },
  {
    code: CurrencyCodeISO4217.MVR,
    name: 'Rufiyaa',
    symbol: 'MVR'
  },
  {
    code: CurrencyCodeISO4217.MWK,
    name: 'Malawi Kwacha',
    symbol: 'MWK'
  },
  {
    code: CurrencyCodeISO4217.MXN,
    name: 'Mexican Peso',
    symbol: 'MX$'
  },
  {
    code: CurrencyCodeISO4217.MYR,
    name: 'Malaysian Ringgit',
    symbol: 'MYR'
  },
  {
    code: CurrencyCodeISO4217.MZN,
    name: 'Mozambique Metical',
    symbol: 'MZN'
  },
  {
    code: CurrencyCodeISO4217.NAD,
    name: 'Namibia Dollar',
    symbol: 'NAD'
  },
  {
    code: CurrencyCodeISO4217.NGN,
    name: 'Naira',
    symbol: 'NGN'
  },
  {
    code: CurrencyCodeISO4217.NIO,
    name: 'Cordoba Oro',
    symbol: 'NIO'
  },
  {
    code: CurrencyCodeISO4217.NOK,
    name: 'Norwegian Krone',
    symbol: 'NOK'
  },
  {
    code: CurrencyCodeISO4217.NPR,
    name: 'Nepalese Rupee',
    symbol: 'NPR'
  },
  {
    code: CurrencyCodeISO4217.NZD,
    name: 'New Zealand Dollar',
    symbol: 'NZ$'
  },
  {
    code: CurrencyCodeISO4217.OMR,
    name: 'Rial Omani',
    symbol: 'OMR'
  },
  {
    code: CurrencyCodeISO4217.PAB,
    name: 'Balboa',
    symbol: 'PAB'
  },
  {
    code: CurrencyCodeISO4217.PEN,
    name: 'Sol',
    symbol: 'PEN'
  },
  {
    code: CurrencyCodeISO4217.PGK,
    name: 'Kina',
    symbol: 'PGK'
  },
  {
    code: CurrencyCodeISO4217.PHP,
    name: 'Philippine Peso',
    symbol: 'PHP'
  },
  {
    code: CurrencyCodeISO4217.PKR,
    name: 'Pakistan Rupee',
    symbol: 'PKR'
  },
  {
    code: CurrencyCodeISO4217.PLN,
    name: 'Zloty',
    symbol: 'PLN'
  },
  {
    code: CurrencyCodeISO4217.PYG,
    name: 'Guarani',
    symbol: 'PYG'
  },
  {
    code: CurrencyCodeISO4217.QAR,
    name: 'Qatari Rial',
    symbol: 'QAR'
  },
  {
    code: CurrencyCodeISO4217.RON,
    name: 'Romanian Leu',
    symbol: 'RON'
  },
  {
    code: CurrencyCodeISO4217.RSD,
    name: 'Serbian Dinar',
    symbol: 'RSD'
  },
  {
    code: CurrencyCodeISO4217.RUB,
    name: 'Russian Ruble',
    symbol: 'RUB'
  },
  {
    code: CurrencyCodeISO4217.RWF,
    name: 'Rwanda Franc',
    symbol: 'RWF'
  },
  {
    code: CurrencyCodeISO4217.SAR,
    name: 'Saudi Riyal',
    symbol: 'SAR'
  },
  {
    code: CurrencyCodeISO4217.SBD,
    name: 'Solomon Islands Dollar',
    symbol: 'SBD'
  },
  {
    code: CurrencyCodeISO4217.SCR,
    name: 'Seychelles Rupee',
    symbol: 'SCR'
  },
  {
    code: CurrencyCodeISO4217.SDG,
    name: 'Sudanese Pound',
    symbol: 'SDG'
  },
  {
    code: CurrencyCodeISO4217.SEK,
    name: 'Swedish Krona',
    symbol: 'SEK'
  },
  {
    code: CurrencyCodeISO4217.SGD,
    name: 'Singapore Dollar',
    symbol: 'SGD'
  },
  {
    code: CurrencyCodeISO4217.SHP,
    name: 'Saint Helena Pound',
    symbol: 'SHP'
  },
  {
    code: CurrencyCodeISO4217.SLL,
    name: 'Leone',
    symbol: 'SLL'
  },
  {
    code: CurrencyCodeISO4217.SOS,
    name: 'Somali Shilling',
    symbol: 'SOS'
  },
  {
    code: CurrencyCodeISO4217.SRD,
    name: 'Surinam Dollar',
    symbol: 'SRD'
  },
  {
    code: CurrencyCodeISO4217.SSP,
    name: 'South Sudanese Pound',
    symbol: 'SSP'
  },
  {
    code: CurrencyCodeISO4217.STN,
    name: 'Dobra',
    symbol: 'STN'
  },
  {
    code: CurrencyCodeISO4217.SVC,
    name: 'El Salvador Colon',
    symbol: 'SVC'
  },
  {
    code: CurrencyCodeISO4217.SYP,
    name: 'Syrian Pound',
    symbol: 'SYP'
  },
  {
    code: CurrencyCodeISO4217.SZL,
    name: 'Lilangeni',
    symbol: 'SZL'
  },
  {
    code: CurrencyCodeISO4217.THB,
    name: 'Baht',
    symbol: '฿'
  },
  {
    code: CurrencyCodeISO4217.TJS,
    name: 'Somoni',
    symbol: 'TJS'
  },
  {
    code: CurrencyCodeISO4217.TMT,
    name: 'Turkmenistan New Manat',
    symbol: 'TMT'
  },
  {
    code: CurrencyCodeISO4217.TND,
    name: 'Tunisian Dinar',
    symbol: 'TND'
  },
  {
    code: CurrencyCodeISO4217.TOP,
    name: 'Pa’anga',
    symbol: 'TOP'
  },
  {
    code: CurrencyCodeISO4217.TRY,
    name: 'Turkish Lira',
    symbol: 'TRY'
  },
  {
    code: CurrencyCodeISO4217.TTD,
    name: 'Trinidad and Tobago Dollar',
    symbol: 'TTD'
  },
  {
    code: CurrencyCodeISO4217.TWD,
    name: 'New Taiwan Dollar',
    symbol: 'NT$'
  },
  {
    code: CurrencyCodeISO4217.TZS,
    name: 'Tanzanian Shilling',
    symbol: 'TZS'
  },
  {
    code: CurrencyCodeISO4217.UAH,
    name: 'Hryvnia',
    symbol: 'UAH'
  },
  {
    code: CurrencyCodeISO4217.UGX,
    name: 'Uganda Shilling',
    symbol: 'UGX'
  },
  {
    code: CurrencyCodeISO4217.USD,
    name: 'US Dollar',
    symbol: '$'
  },
  {
    code: CurrencyCodeISO4217.UYU,
    name: 'Peso Uruguayo',
    symbol: 'UYU'
  },
  {
    code: CurrencyCodeISO4217.UZS,
    name: 'Uzbekistan Sum',
    symbol: 'UZS'
  },
  {
    code: CurrencyCodeISO4217.VES,
    name: 'Bolívar Soberano',
    symbol: 'VES'
  },
  {
    code: CurrencyCodeISO4217.VND,
    name: 'Dong',
    symbol: '₫'
  },
  {
    code: CurrencyCodeISO4217.VUV,
    name: 'Vatu',
    symbol: 'VUV'
  },
  {
    code: CurrencyCodeISO4217.WST,
    name: 'Tala',
    symbol: 'WST'
  },
  {
    code: CurrencyCodeISO4217.XAF,
    name: 'CFA Franc BEAC',
    symbol: 'FCFA'
  },
  {
    code: CurrencyCodeISO4217.XCD,
    name: 'East Caribbean Dollar',
    symbol: 'EC$'
  },
  {
    code: CurrencyCodeISO4217.XDR,
    name: 'SDR (Special Drawing Right)',
    symbol: 'XDR'
  },
  {
    code: CurrencyCodeISO4217.XOF,
    name: 'CFA Franc BCEAO',
    symbol: 'CFA'
  },
  {
    code: CurrencyCodeISO4217.XPF,
    name: 'CFP Franc',
    symbol: 'CFPF'
  },
  {
    code: CurrencyCodeISO4217.XSU,
    name: 'Sucre',
    symbol: 'XSU'
  },
  {
    code: CurrencyCodeISO4217.XUA,
    name: 'ADB Unit of Account',
    symbol: 'XUA'
  },
  {
    code: CurrencyCodeISO4217.YER,
    name: 'Yemeni Rial',
    symbol: 'YER'
  },
  {
    code: CurrencyCodeISO4217.ZAR,
    name: 'Rand',
    symbol: 'ZAR'
  },
  {
    code: CurrencyCodeISO4217.ZMW,
    name: 'Zambian Kwacha',
    symbol: 'ZMW'
  },
  {
    code: CurrencyCodeISO4217.ZWL,
    name: 'Zimbabwe Dollar',
    symbol: 'ZWL'
  }
];

export const currencySelectorOptions: Array<CurrencyInfo> = currencyList.map(currency => ({
  ...currency,
  label: currency.code === currency.symbol
    ? `${currency.code} | ${currency.name}`
    : `${currency.code} (${currency.symbol}) | ${currency.name}`
}));
