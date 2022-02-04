import { IonIcon } from '@lolab/components';
import { ReactNode } from 'react';

interface ListItemPrettyProps {
  children: ReactNode;
  className?: string;
  icon?: string;
  emoji?: string;
  labelSize?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  disabled?: boolean;
  onSymbolClick?: () => void;
}

export const ListItemPretty = ({
  children,
  className,
  icon,
  emoji,
  labelSize,
  disabled,
  onSymbolClick
}: ListItemPrettyProps): JSX.Element => {

  return <label
    className={`mb-0 d-flex align-items-center ${disabled ? 'is-disabled' : ''} ${className}`}
  >
    {(!!icon || !!emoji) && <span
      className={`d-flex align-items-center mr-${labelSize === 'xs' ? '1' : '2'} ${onSymbolClick ? 'cursor-pointer' : ''}`}
      style={{ marginLeft: '-1px' }}
      tabIndex={-1}
      role="button"
      onClick={onSymbolClick}
    >
      {!!icon && <IonIcon
        name={icon}
        fontSize={labelSize === 'xs' ? 'smaller' : undefined}
      />}
      {!!emoji && <span>{emoji}</span>}
    </span>}
    <span className={`w-100 text-${labelSize}`}>
      {children}
    </span>
  </label>;
};
