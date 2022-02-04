import { IonIcon } from '@lolab/components';
import { ColoursHex } from '@app/types';
import {
  CSSProperties, ReactNode, useMemo
} from 'react';
import { Badge } from 'reactstrap';

const styleBadgeOutline: CSSProperties = {
  borderStyle: 'solid',
  borderWidth: '1px'
};

export const LoBadge = ({
  children,
  className,
  color = ColoursHex.$default,
  outline,
  pill = true,
  style,
  onDelete
}: {
  children?: ReactNode;
  className?: string;
  color?: ColoursHex;
  outline?: boolean;
  pill?: boolean;
  style?: CSSProperties;
  onDelete?: () => Promise<void>;
}): JSX.Element => {

  const _style = useMemo(
    () => ({
      borderColor: color,
      backgroundColor: outline ? 'transparent' : color,
      color: outline ? color : ColoursHex.$white,
      ...(style ? style : {}),
      ...(outline ? styleBadgeOutline : {})
    }),
    [
      color,
      outline,
      style
    ]
  );

  return (
    <Badge
      className={`${pill ? '' : 'badge-circle'} ${className}`}
      pill={pill}
      style={_style}
    >
      <span className="d-flex align-items-center">
        {children}
        {!!onDelete && <span
          className="ml-1 d-flex align-items-center cursor-pointer"
          onClick={async () => {
            if (onDelete) await onDelete();
          }}
          tabIndex={0}
          role="button"
        >
          <IonIcon
            fontSize="1rem"
            name="close-outline"
          />
        </span>}
      </span>
    </Badge>
  );
};
