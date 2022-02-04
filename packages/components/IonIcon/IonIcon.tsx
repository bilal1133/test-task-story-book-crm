import { ColoursHex } from '@app/types';
import { CSSProperties } from 'react';

export const IonIcon = ({
  name,
  color,
  // className,
  fontSize,
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave
}: {
  name: string;
  color?: ColoursHex;
  // className?: string; // BEWARE: does NOT work. Do NOT enable it. Wrap IonIcon in a span instead.
  fontSize?: string;
  style?: CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}): JSX.Element => (
  <ion-icon
    name={name}
    // className={className}
    style={{
      color: color ? color : ColoursHex.$default,
      cursor: onClick ? 'pointer' : undefined,
      fontSize: fontSize ? fontSize : undefined,
      ...style
    }}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  ></ion-icon>
);
