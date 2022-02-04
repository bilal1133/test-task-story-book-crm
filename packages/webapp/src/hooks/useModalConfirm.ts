import { ModalConfirmState } from '@lolab/components';
import {
  useMemo, useState
} from 'react';

export interface ModalConfirmHookState extends ModalConfirmState {
  isOpen: boolean;
}

const defaultState: ModalConfirmHookState = {
  isOpen: false,
  title: 'Are you sure?',
  description: '',
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  onCancel: undefined,
  onConfirm: undefined
};

export const useModalConfirm = (): {
  modalConfirmState: ModalConfirmHookState;
  modalConfirmOpen: typeof modalConfirmOpen;
  modalConfirmClose: typeof modalConfirmClose;
} => {

  const [
    state,
    setState
  ] = useState<ModalConfirmHookState>(defaultState);

  const modalConfirmOpen = (newState: Partial<Omit<ModalConfirmHookState, 'isOpen'>> = {}): void => setState({
    ...defaultState,
    ...newState,
    isOpen: true
  });

  const modalConfirmClose = () => setState({
    ...defaultState,
    isOpen: false
  });

  console.group('useModalConfirm');
  console.log('state.isOpen', state.isOpen);
  console.groupEnd();

  const _return = useMemo(
    () => ({
      modalConfirmState: state,
      modalConfirmOpen,
      modalConfirmClose
    }),
    [
      state
    ]
  );

  return _return;
};
