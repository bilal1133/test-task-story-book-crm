import {
  IonIcon, ModalConfirm, ModalConfirmState
} from '@lolab/components';
import { useModalConfirm } from '@app/hooks';
import {
  NextRouter, useRouter
} from 'next/router';
import {
  ReactNode, useMemo
} from 'react';
import {
  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledDropdownProps
} from 'reactstrap';

export interface OnActionCallback<T = unknown> {
  context: T,
  modalConfirmOpen: (newState: Partial<ModalConfirmState>) => void,
  router: NextRouter
}

export interface ActionMenuItem<T = unknown> {
  id: string;
  icon: string;
  label: string;
  shouldHide?: ({ context }: { context: T; }) => boolean;
  onAction?: ({
    context,
    modalConfirmOpen,
    router
  }: OnActionCallback<T>) => Promise<void>;
}

export const ActionMenu = <T extends unknown>({
  children,
  className,
  icon,
  direction,
  actions,
  context
}: {
  children?: ReactNode;
  className?: string;
  icon?: string;
  direction?: UncontrolledDropdownProps['direction'];
  actions: Array<ActionMenuItem<T>>;
  context: T;
}): JSX.Element => {

  const router = useRouter();

  const {
    modalConfirmState,
    modalConfirmOpen,
    modalConfirmClose
  } = useModalConfirm();

  const visibleActions = useMemo(
    () => actions.filter(({ shouldHide }) => shouldHide ? !shouldHide({ context }) : true), // 'true' to keep the element, 'false' otherwise
    [
      actions,
      context
    ]
  );

  return <>

    {modalConfirmState.isOpen && (
      <ModalConfirm
        state={modalConfirmState}
        isOpen={modalConfirmState.isOpen}
        toggle={modalConfirmClose}
      />
    )}

    <UncontrolledDropdown
      direction={direction}
      className={className}
    >
      <DropdownToggle
        tag="div"
        className="d-flex align-items-center p-0 cursor-pointer"
      >
        {children}
        {!children && !!icon && (
          <IonIcon
            name={icon}
            fontSize="16px"
          />
        )}
      </DropdownToggle>
      <DropdownMenu positionFixed={true}>
        {visibleActions.map(({
          id, icon, label, onAction
        }) => (
          <DropdownItem
            key={id}
            className="d-flex align-items-center"
            tabIndex={0}
            onClick={async () => {
              if (onAction) await onAction({
                context,
                modalConfirmOpen,
                router
              });
            }}
          >
            <IonIcon name={icon} />
            <span className="ml-2">
              {label}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>

  </>;
};
