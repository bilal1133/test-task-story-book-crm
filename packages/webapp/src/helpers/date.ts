import {
  format, parseISO
} from 'date-fns';
import { enGB } from 'date-fns/locale';

export const generateTimestampIsoFormatTimeZoneUTC = (): string => (new Date()).toISOString();

export const getTimeZoneFromBrowser = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;

// https://date-fns.org/v2.16.1/docs/format
export const readableDate = (timestampIsoFormatTimeZoneUTC: string, dateFormat = 'PPPPp', includeTimezone = false): string =>
  includeTimezone
    ? `${format(parseISO(timestampIsoFormatTimeZoneUTC), dateFormat, { locale: enGB })} (${getTimeZoneFromBrowser()})` // e.g. Tuesday, 18 August 2020 at 23:49 (Europe/London)
    : format(parseISO(timestampIsoFormatTimeZoneUTC), dateFormat, { locale: enGB }); // e.g. Tuesday, 18 August 2020 at 23:49
// ^^^^ BEWARE: use 'enUS' to see PST/EST used instead of GMT-X
