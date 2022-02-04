import { IonIcon } from '@lolab/components';
import { ReactNode } from 'react';

export const LoButtonLink = ({
  children,
  className,
  iconName,
  iconPosition = 'start',
  onClick
}: {
  children: ReactNode;
  className?: string;
  iconName?: string;
  iconPosition?: 'start' | 'end';
  onClick?: () => void;
}): JSX.Element => {
  return (
    <p
      className={`cursor-pointer mb-0 text-sm text-underline d-flex align-items-center on-hover--font-weight-bold ${className}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      {iconName && iconPosition === 'start' && (
        <span className="d-flex align-items-center mr-2">
          <IonIcon name={iconName} />
        </span>
      )}
      {children}
      {iconName && iconPosition === 'end' && (
        <span className="d-flex align-items-center ml-2">
          <IonIcon name={iconName} />
        </span>
      )}
    </p>
  );
};
