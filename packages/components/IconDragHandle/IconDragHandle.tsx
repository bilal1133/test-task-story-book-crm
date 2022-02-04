import { IonIcon } from '@lolab/components';
import { ColoursHex } from '@app/types';
import {
  CSSProperties, forwardRef, MouseEvent
} from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

interface IconDragHandleProps {
  dragHandleProps?: DraggableProvided['dragHandleProps'];
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

// eslint-disable-next-line react/display-name
export const IconDragHandle = forwardRef<HTMLElement, IconDragHandleProps>(
  ({
    dragHandleProps,
    style,
    className,
    disabled,
    onClick
  }: IconDragHandleProps, ref): JSX.Element => (
    <span
      ref={ref}
      className={`d-flex align-items-center ${disabled ? 'is-disabled' : 'cursor-move'} ${className}`}
      style={style}
      onClick={onClick}
      tabIndex={-1}
      role="button"
      {...dragHandleProps}
    >
      <IonIcon
        name="ellipsis-vertical"
        color={ColoursHex.$primary}
      />
      <IonIcon
        name="ellipsis-vertical"
        color={ColoursHex.$primary}
        style={{ marginLeft: '-10px' }}
      />
    </span>
  )
);
