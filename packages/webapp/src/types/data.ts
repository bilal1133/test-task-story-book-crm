import { CurrencyCodeISO4217 } from '@app/constants';

export enum TimeFrequency { // TODO: rename to TimeFrequencyMS so it's clear it's milliseconds
  // amount of time, in milliseconds
  OneSecond = 1000 * 1,
  OneMinute = 1000 * 60,
  OneHour = 1000 * 60 * 60,
  OneDay = 1000 * 60 * 60 * 24,
  OneWeek = 1000 * 60 * 60 * 24 * 7
}

export enum ColoursHex { // BEWARE: keep in sync with 'src/styles/_variables.scss'
  $black = '#000000',
  $blue = '#544cf9',
  $indigo = '#733aef',
  $purple = '#8053f6',
  $pink = '#fc9f9d',
  $red = '#fc2d65',
  $orange = '#ff7f24',
  $yellow = '#ffeb2e',
  $green = '#1fdd94',
  $teal = '#00bbc0',
  $cyan = '#c2ff75',
  $white = '#ffffff',

  $default = '#252525',
  $primary = '#636363',
  $secondary = '#afafaf',
  $tertiary = '#efefef'
}

export interface MoneyAmount {
  currencyCode: CurrencyCodeISO4217;
  amount: string; // only numbers and one dot in the middle (e.g. '1234.56')
  formattedAmount: string; // programmatically added via 'formatCurrency' e.g. '$ 123.45'
}

export interface Timestamp {
  // all fields are in ISO FORMAT, TIMEZONE UTC -> .toISOString()
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string; // for soft-delete
}

export interface DBDocument extends Timestamp {
  _id: firebase.default.firestore.DocumentReference['id'];
  _path: firebase.default.firestore.DocumentReference['path'];
}
