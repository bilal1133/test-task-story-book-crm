import { getTimeZoneFromBrowser } from '@app/helpers';
import moment, { Moment } from 'moment';
import {
  HTMLProps,
  useMemo, useState
} from 'react';
import Datetime from 'react-datetime';

// BEWARE: because this is a DATE SELECTOR, we only care about the day number, hence we handle all dates as UTC and force the picker to use utc as well
interface InputDateRangeState {
  startDate?: Moment;
  endDate?: Moment;
}

// THIS FUNCTION ADDS ON THE DAY TAG OF THE DATE PICKER
// 'middle-date' className which means that this day will have no border radius
// 'start-date' className which means that this day will only have left border radius
// 'end-date' className which means that this day will only have right border radius
// this way, the selected dates will look nice and will only be rounded at the ends
const getClassNameDatetimeDays = (date: Moment, state: InputDateRangeState): string => {
  // const startDate = state.startDate._d.toISOString();
  // if (state.startDate && state.endDate) {
  // }
  if (state.startDate && state.endDate && !state.startDate.isSame(state.endDate)) {
    if (date.isAfter(state.startDate) && date.isBefore(state.endDate)) {
      return ' middle-date';
    }
    if (date.isSame(state.endDate)) {
      return ' end-date';
    }
    if (date.isSame(state.startDate)) {
      return ' start-date';
    }
  }
  return '';
};

// BEWARE: because this is a DATE SELECTOR, we only care about the day number, hence we handle all dates as UTC and force the picker to use utc as well
export const InputDateRange = ({
  className,
  classNameInput,
  disabled,
  singleDateOnly,
  initialState,
  onSelect,
  onFocus
}: {
  className?: string;
  classNameInput?: string;
  disabled?: boolean;
  singleDateOnly?: boolean; // when 'singleDateOnly' equals 'true', ONLY use 'startDate' and set 'endDate' to 'undefined'
  initialState?: {
    startDateUTC?: string;
    endDateUTC?: string;
    // we do NOT care about timezone here as we handle all dates as UTC
  };
  onSelect?: ({
    startDateUTC,
    endDateUTC,
    timeZone
  }: {
    startDateUTC?: string;
    endDateUTC?: string;
    timeZone: string;
  }) => void;
  onFocus?: () => void;
}): JSX.Element => {

  const [
    state,
    setState
  ] = useState<InputDateRangeState>({
    startDate: initialState?.startDateUTC
      ? moment(initialState.startDateUTC, true)
      : undefined,
    endDate: singleDateOnly
      ? undefined
      : (initialState?.endDateUTC
        ? moment(initialState.endDateUTC, true)
        : undefined)
  });

  const _utc = true;
  const _open: boolean | undefined = useMemo(
    () => disabled ? false : undefined,
    [
      disabled
    ]
  );
  const _dateFormat = 'ddd MMM Do YYYY';
  const _timeFormat = false;
  const _inputPropsForStartDate: HTMLProps<HTMLInputElement> = useMemo(
    () => ({
      placeholder: singleDateOnly ? 'Select a date' : 'Start date',
      className: `form-control ${classNameInput}`,
      readOnly: true,
      style: {
        backgroundColor: 'unset', // undo readOnly style
        cursor: 'pointer'
      }
    }),
    [
      classNameInput,
      singleDateOnly
    ]
  );
  const _inputPropsForEndDate: HTMLProps<HTMLInputElement> = useMemo(
    () => ({
      ..._inputPropsForStartDate,
      placeholder: 'End date'
    }),
    [
      _inputPropsForStartDate
    ]
  );

  const handleDateTimeChange = (prop: keyof InputDateRangeState, date: Moment) => {

    if (prop === 'endDate' && !!state.startDate && date.isBefore(state.startDate)) {
      const newState: InputDateRangeState = {
        startDate: date,
        endDate: date
      };
      setState(newState);
      if (onSelect) onSelect({
        startDateUTC: newState.startDate?.toISOString(), // returns a timestamp in UTC
        endDateUTC: singleDateOnly ? undefined : newState.endDate?.toISOString(), // returns a timestamp in UTC
        timeZone: getTimeZoneFromBrowser()
      });

    } else if (prop === 'startDate' && !!state.endDate && date.isAfter(state.endDate)) {
      const newState: InputDateRangeState = {
        startDate: date,
        endDate: date
      };
      setState(newState);
      if (onSelect) onSelect({
        startDateUTC: newState.startDate?.toISOString(), // returns a timestamp in UTC
        endDateUTC: singleDateOnly ? undefined : newState.endDate?.toISOString(), // returns a timestamp in UTC
        timeZone: getTimeZoneFromBrowser()
      });

    } else {
      setState(prevState => {
        const newState: InputDateRangeState = {
          ...prevState,
          [prop]: date
        };
        if (onSelect) onSelect({
          startDateUTC: newState.startDate?.toISOString(), // returns a timestamp in UTC
          endDateUTC: singleDateOnly ? undefined : newState.endDate?.toISOString(), // returns a timestamp in UTC
          timeZone: getTimeZoneFromBrowser()
        });
        return newState;
      });
    }
  };

  return <div className={`d-flex align-items-center justify-content-between ${className}`}>

    <Datetime
      className="w-100"
      utc={_utc}
      open={_open}
      dateFormat={_dateFormat}
      inputProps={_inputPropsForStartDate}
      timeFormat={_timeFormat}
      value={state.startDate}
      onChange={date => {
        // The callback receives the selected moment object as only parameter, if the date in the input is valid.
        // If the date in the input is not valid, the callback receives the value of the input (a string).
        if (typeof date === 'string') return;
        handleDateTimeChange('startDate', date);
      }}
      renderDay={(props, currentDate: Moment) => (
        <td
          {...props}
          className={`${props.className} ${getClassNameDatetimeDays(currentDate, state)}`}
        >
          {currentDate.date()}
        </td>
      )}
      onOpen={onFocus}
    />

    {!singleDateOnly && (
      <Datetime
        className="w-100 ml-3"
        utc={_utc}
        open={_open}
        dateFormat={_dateFormat}
        timeFormat={_timeFormat}
        inputProps={_inputPropsForEndDate}
        value={state.endDate}
        onChange={date => {
        // The callback receives the selected moment object as only parameter, if the date in the input is valid.
        // If the date in the input is not valid, the callback receives the value of the input (a string).
          if (typeof date === 'string') return;
          handleDateTimeChange('endDate', date);
        }}
        renderDay={(props, currentDate: Moment) => (
          <td
            {...props}
            className={`${props.className} ${getClassNameDatetimeDays(currentDate, state)}`}
          >
            {currentDate.date()}
          </td>
        )}
        onOpen={onFocus}
      />
    )}

  </div>;
};
