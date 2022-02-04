import {
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useMemo, useState
} from 'react';

interface InputToggleProps {
  checked: boolean; // do NOT use this inside the component, use _checked instead
  labelUnchecked: string;
  labelChecked: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  name?: string;
  labelSize?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  onChange?: (checked: boolean) => Promise<void>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// eslint-disable-next-line react/display-name
export const InputToggle = forwardRef<HTMLDivElement, InputToggleProps>((
  {
    checked,
    labelUnchecked,
    labelChecked,
    className,
    style,
    disabled,
    name,
    labelSize,
    onChange,
    onMouseEnter,
    onMouseLeave
  }: InputToggleProps,
  ref
) => {

  const [
    _checked,
    setChecked
  ] = useState<boolean>(checked);

  useEffect(
    () => {
      if (_checked !== checked) {
        setChecked(checked);
      }
    },
    [
      _checked,
      checked
    ]
  );

  const [
    isBusy,
    setisBusy
  ] = useState<boolean>(false);

  const isDisabled = useMemo(
    () => disabled || isBusy,
    [
      disabled,
      isBusy
    ]
  );

  const onChangeCallback = useCallback(
    async () => {
      if (isDisabled) return;
      setisBusy(true);
      setChecked(!_checked);
      if (onChange) await onChange(!_checked);
      setisBusy(false);
    },
    [
      _checked,
      isDisabled,
      onChange
    ]
  );

  return (
    <div
      ref={ref}
      className={`d-flex align-items-end ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <label
        className="custom-toggle no-select mb-0"
        style={{ transform: labelSize === 'xs' ? 'scale(0.8)' : undefined }}
      >
        <input
          name={name}
          type="checkbox"
          checked={_checked}
          onChange={onChangeCallback}
          disabled={isDisabled}
        />
        <span
          className={`custom-toggle-slider no-bounce ${isDisabled ? 'cursor-not-allowed' : ''}`}
        />
      </label>
      <span
        className={`ml-${labelSize === 'xs' ? '1' : '2'} text-${labelSize} ${isDisabled ? 'is-disabled' : ''}`}
        tabIndex={-1}
        role="button"
        onClick={onChangeCallback}
      >
        {_checked ? labelChecked : labelUnchecked}
      </span>
    </div>
  );
});
