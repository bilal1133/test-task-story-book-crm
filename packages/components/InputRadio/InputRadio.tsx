import { IonIcon } from '@lolab/components';
import {
  ReactNode, useEffect, useState
} from 'react';

interface InputRadioProps {
  children: ReactNode;
  checked: boolean; // do NOT use this inside the component, use _checked instead
  className?: string;
  labelSize?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const InputRadio = ({
  children,
  className,
  checked,
  labelSize,
  disabled,
  onChange
}: InputRadioProps): JSX.Element => {

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
      className={`no-select mb-0 d-flex align-items-center ${disabled ? 'is-disabled' : 'cursor-pointer'} ${className}`}
      onClick={onChangeCallback}
      tabIndex={0}
      role="button"
    >
      <span
        className="d-flex align-items-center"
        style={{
          marginTop: '1px',
          marginLeft: '-1px'
        }}
      >
        <IonIcon
          name={_checked ? 'radio-button-on-outline' : 'radio-button-off-outline'}
          fontSize={labelSize === 'xs' ? 'smaller' : undefined}
        />
      </span>
      <span className={`w-100 ml-${labelSize === 'xs' || labelSize === 'sm' ? '1' : '2'} text-${labelSize}`}>
        {children}
      </span>
    </label>
  );
};
