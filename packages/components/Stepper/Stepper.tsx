import { IonIcon } from '@lolab/components';
import { useState } from 'react';

export const Stepper = ({
  number = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange
}: {
  number?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (num: number) => void;
}): JSX.Element => {

  const [
    num,
    setNum
  ] = useState<number>(number);

  return <div className="d-flex align-items-center">
    <IonIcon
      name="remove-circle-outline"
      onClick={() => setNum(prevState => {
        const _newNumber: number = prevState -= step;
        const newNumber = _newNumber < min
          ? min
          : _newNumber;
        if (onChange) onChange(newNumber);
        return newNumber;
      }) }
    />
    <span className="mx-2">{num}</span>
    <IonIcon
      name="add-circle-outline"
      onClick={() => setNum(prevState => {
        const _newNumber: number = prevState += step;
        const newNumber = _newNumber > max
          ? max
          : _newNumber;
        if (onChange) onChange(newNumber);
        return newNumber;
      }) }
    />
  </div>;
};
