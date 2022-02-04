import {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Input } from 'reactstrap';

export type InputSelectSize = 'sm' | 'default' | 'lg';

interface  InputSelectOption<T = unknown> {
  preselected?: boolean; // BEWARE: triggers 'onSelect'
  label: string;
  value: T;
}

export type InputSelectOptions<T = unknown> = Array<InputSelectOption<T>>;

export const InputSelect = <T extends unknown>({
  className,
  style,
  name,
  disabled,
  size,
  placeholder = 'Select an option',
  options,
  invalid,
  onSelect,
  onFocus
}: {
  className?: string;
  style?: CSSProperties;
  name?: string;
  disabled?: boolean;
  size?: InputSelectSize;
  placeholder?: string;
  options: InputSelectOptions<T>;
  invalid?: boolean;
  onSelect: ({
    selected,
    selectedIndex
  }: {
    selected: InputSelectOption<T>;
    selectedIndex: number;
  }) => void;
  onFocus?: () => void;
}): JSX.Element => {

  const [
    selectedIndex,
    setSelectedIndex
  ] = useState<number>(-1); // by default no selection, so we see the placeholder option (see input 'value' below)

  const setSelected = useCallback(
    (selectedIndex: number) => {
      setSelectedIndex(selectedIndex);
      if (selectedIndex === -1) return;
      onSelect({
        selected: options[selectedIndex],
        selectedIndex
      });
    },
    [
      onSelect,
      options
    ]
  );

  useEffect(
    () => {
      const preselectedIndex = options.findIndex(({ preselected }) => preselected);
      if (preselectedIndex === -1) return;
      if (preselectedIndex !== selectedIndex) setSelected(preselectedIndex);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
    // ^^^^ BEWARE: empty array as we want this to run only ONCE, when the component mounts
  );

  const allOptions: InputSelectOptions = useMemo(
    () => [
      {
        label: placeholder.length ? placeholder : 'Select an option',
        value: undefined
      },
      ...options
    ],
    [
      options,
      placeholder
    ]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedIndex = parseInt(e.target.value);
      setSelected(selectedIndex);
    },
    [
      setSelected
    ]
  );

  return (
    <Input
      className={`w-100 ${size === 'sm' ? 'form-control-sm' : (size === 'lg' ? 'form-control-lg' : '')} ${className}`}
      style={style}
      type="select"
      name={name}
      disabled={disabled}
      value={Number.isInteger(selectedIndex) ? selectedIndex : undefined}
      onChange={onChange}
      readOnly={false}
      onFocus={onFocus}
      invalid={invalid}
    >
      {allOptions.map(({ label }, index) => (
        <option
          key={index}
          value={index - 1} // BEWARE: IMPORTANT subtracting one from 'allOptions', else 'setSelected' will be passed the wrong index and will throw out of bound error on last item
          disabled={index === 0} // BEWARE: IMPORTANT as per 'allOptions', the first option is disabled
        >{label}</option>
      ))}
    </Input>
  );
};
