import { generateTimestampIsoFormatTimeZoneUTC } from '@app/helpers';
import { TimeFrequency } from '@app/types';
import {
  format, utcToZonedTime
} from 'date-fns-tz';
import { enGB } from 'date-fns/locale';
import {
  useCallback,
  useEffect, useState
} from 'react';

export const TimeZoneClock = ({
  timeZone,
  dateFormat = 'PPPPp zzz',
  refreshFrequency = TimeFrequency.OneSecond
}: {
  timeZone: string;
  dateFormat?: string;
  refreshFrequency?: TimeFrequency; // based on the 'dateFormat', we might want to change this value
}): JSX.Element => {

  const getReadableDate = useCallback((): string => {
    const timestamp = utcToZonedTime(generateTimestampIsoFormatTimeZoneUTC(), timeZone);
    // const timestamp = utcToZonedTime(parseISO(generateTimestampIsoFormatTimeZoneUTC()), timeZone); // TODO: check whether we need parseISO as well
    return format(timestamp, dateFormat, {
      timeZone,
      locale: enGB // BEWARE: use 'enUS' to see PST/EST used instead of GMT-X
    });
  },
  [
    timeZone,
    dateFormat
  ]);

  const [
    readableDate,
    setReadableDate
  ] = useState<string>(getReadableDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setReadableDate(getReadableDate());
    }, refreshFrequency);
    return () => clearInterval(intervalId);
  },
  [
    getReadableDate,
    refreshFrequency
  ]);

  return <>{readableDate}</>;
};
