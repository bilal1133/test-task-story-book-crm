import {
  DropdownSearch, InputSearchSize
} from '@lolab/components';
import {
  RawTimeZone, rawTimeZones
} from '@vvo/tzdb';

export const InputTimeZone = ({
  className,
  // searchText,
  disabled,
  size,
  onSelect
}: {
  className?: string;
  // searchText?: string;
  disabled?: boolean;
  size?: InputSearchSize;
  onSelect: (timeZoneName?: RawTimeZone['name']) => void;
}): JSX.Element => {

  return <DropdownSearch
    className={className}
    name="timezone"
    placeholder="Select a time zone"
    disabled={disabled}
    size={size}
    // searchText={searchText}
    options={rawTimeZones}
    displaySelection={true}
    displayFn={({ name }: RawTimeZone) => name}
    onSelect={(rawTimeZone?: RawTimeZone) => {
      if (onSelect) onSelect(rawTimeZone?.name);
    }}
  />;
};
