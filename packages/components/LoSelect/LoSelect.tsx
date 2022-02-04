import { ColoursHex, TimeFrequency } from '@app/types';
import { isArray, isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActionMeta, default as Select } from 'react-select';

const dotStyles = (color: string) => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colorDotStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: (styles: any) => ({
    ...styles,
    ...dotStyles('transparent'),
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placeholder: (styles: any) => ({
    ...styles,
    ...dotStyles(ColoursHex.$secondary),
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  singleValue: (styles: any, { data }: { data: { color: string } }) => ({
    ...styles,
    ...dotStyles(data.color),
  }),
};

export interface LoSelectOption<T> {
  value: T;
  label: string;
  color?: string;
  font?: string;
  weights: (string | number)[];
}

interface LoSelectProps<T> {
  className?: string;
  autoBlur?: boolean; // BEWARE: we blur otherwise the select stays focused and triggers a re-render
  options: Array<LoSelectOption<T>>;
  defaultValue?: LoSelectOption<T> | Array<LoSelectOption<T>>;
  enableColorDot?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  onChange: ({
    option,
    options,
    actionMeta,
  }: {
    option?: LoSelectOption<T>;
    options?: Array<LoSelectOption<T>>; // use this property when 'isMulti' is true
    actionMeta: ActionMeta<LoSelectOption<T>>;
  }) => void | Promise<void>;
}

export const LoSelect = <T,>({
  className,
  autoBlur = true,
  options,
  defaultValue,
  enableColorDot = false,
  placeholder,
  isSearchable = true,
  isClearable,
  isMulti,
  onChange,
}: LoSelectProps<T>) => {
  const [ref, setRef] = useState<unknown | null>(null);

  const [
    _styles,
    setStyles,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] = useState<any>({ ...(enableColorDot ? colorDotStyles : {}) });

  useEffect(() => {
    const newStyles = { ...(enableColorDot ? colorDotStyles : {}) };
    if (!isEqual(_styles, newStyles)) {
      setStyles(newStyles);
    }
  }, [_styles, enableColorDot]);

  return (
    <Select
      ref={setRef}
      className={className}
      classNamePrefix="select"
      defaultValue={defaultValue}
      options={options}
      styles={_styles}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isMulti={isMulti}
      onChange={async (value, actionMeta) => {
        if (autoBlur && (actionMeta.action === 'clear' || actionMeta.action === 'select-option')) {
          // a bit of delay to make sure the input is blurred
          setTimeout(() => (ref as HTMLSelectElement | null)?.blur(), 0.1 * TimeFrequency.OneSecond);
        }
        await onChange({
          option: (isArray(value) ? undefined : value) as LoSelectOption<T> | undefined,
          options: isArray(value) ? value : undefined,
          actionMeta,
        });
      }}
    />
  );
};
