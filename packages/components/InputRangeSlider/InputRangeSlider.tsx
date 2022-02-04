import { Input } from 'reactstrap';
import styles from './InputRangeSlider.module.scss';

export const InputRangeSlider = ({
  className,
  min,
  max,
  step,
  initialValue,
  disabled,
  onChange
}: {
  className?: string;
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}): JSX.Element => {

  return <Input
    className={`${styles.inputRangeSlider} ${className}`}
    disabled={disabled}
    type="range"
    min={min}
    max={max}
    step={step}
    defaultValue={initialValue}
    onChange={e => onChange(parseFloat(e.target.value))}
  />;
}
;
