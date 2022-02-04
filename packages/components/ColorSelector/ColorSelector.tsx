import { ColoursHex } from '@app/types';
import {
  CSSProperties, useMemo, useState
} from 'react';
import {
  ChromePicker, ColorResult
} from 'react-color';
import { Input } from 'reactstrap';

const backgroundStyles: CSSProperties = {
  left: 0,
  right: 0,
  bottom: 0,
  top: 0
};

export const ColorSelector = ({
  className,
  disabled,
  disabledAlpha,
  initialColor,
  onChange
}: {
  className?: string;
  disabled?: boolean;
  disabledAlpha?: boolean;
  initialColor?: string;
  onChange?: (obj: Pick<ColorResult, 'hex' | 'rgb'>) => Promise<void>;
}): JSX.Element => {

  const [
    color,
    setColor
  ] = useState<string>(initialColor?.length ? initialColor : ColoursHex.$white);

  const [
    showPicker,
    setShowPicker
  ] = useState<boolean>(false);

  const togglePicker = () => setShowPicker(prevState => !prevState);

  const _className = useMemo(
    () => `position-relative ${className}`,
    [
      className
    ]
  );

  const _style = useMemo(
    () => ({
      height: '24px',
      width: '24px',
      backgroundColor: color
    }),
    [
      color
    ]
  );

  return (
    <div className={_className}>
      <Input
        className={disabled ? undefined : 'cursor-pointer'}
        readOnly={true}
        disabled={disabled}
        style={_style}
        onMouseEnter={e => (e.target as HTMLInputElement).focus()}
        onMouseLeave={e => (e.target as HTMLInputElement).blur()}
        onClick={togglePicker}
      />
      {!disabled && showPicker && <>
        <div
          className="position-fixed z-index-9999"
          style={backgroundStyles}
          onClick={togglePicker}
          tabIndex={-1}
          role="button"
        ></div>
        <ChromePicker
          className="position-absolute z-index-9999 mt-2"
          color={color}
          onChange={async ({
            hex, rgb
          }) => {
            setColor(hex);
            if (onChange) await onChange({
              hex,
              rgb
            });
          }}
          disableAlpha={disabledAlpha}
        />
      </>}
    </div>
  );
};
