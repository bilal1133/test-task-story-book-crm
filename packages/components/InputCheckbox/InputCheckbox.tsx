import {
  ReactNode, useEffect, useState
} from 'react';

export const InputCheckbox = ({
  checked = false,
  children,
  className,
  classNameWrapper,
  disabled,
  name,
  labelSize = 'sm',
  onChange
}: {
    checked: boolean; // do NOT use this inside the component, use _checked instead
    children: ReactNode;
    className?: string;
    classNameWrapper?: string;
    disabled?: boolean;
    name?: string;
    labelSize?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
    onChange?: (checked: boolean) => void;
}): JSX.Element => {

  const [
    _checked,
    setChecked
  ] = useState<boolean>(checked);

  useEffect(
    () => {
      if (checked !== _checked) {
        setChecked(checked);
      }
    },
    [
      _checked,
      checked
    ]
  );

  const onChangeCallback = () => {
    const newVal = !_checked;
    setChecked(newVal);
    if (onChange) {
      onChange(newVal);
    }
  };

  return (
    <label
      className={`InputCheckbox bounce no-select d-flex align-items-center mb-0 ${disabled ? 'is-disabled' : 'cursor-pointer'} ${className}`}
    >
      <span
        className={classNameWrapper}
        style={{
          transform: 'scale(0.8)',
          marginLeft: '-3.5px'
          // transformOrigin: '0 0' // this will move the checkbox A LOT
        }}
      >
        <input
          name={name}
          type="checkbox"
          checked={_checked}
          onChange={onChangeCallback}
          disabled={disabled}
        />
        <svg
          viewBox="0 0 21 21"
          style={{ marginTop: '1px' }}
        >
          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
      </span>
      <span className={`w-100 ml-${labelSize === 'xs' ? '1' : '2'} text-${labelSize}`}>
        {children}
      </span>
    </label>
  );
};
