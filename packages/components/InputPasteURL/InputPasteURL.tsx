import { isValidUrl } from '@app/helpers';
import { ColoursHex } from '@app/types';
import { IonIcon } from '@lolab/components';
import {
  ChangeEvent, CSSProperties, KeyboardEvent, useCallback, useState
} from 'react';
import { Input } from 'reactstrap';

// const KEY_CODE_ENTER = 13;
const KEY_ENTER = 'Enter';

const initialSate = {
  isValid: false,
  url: ''
};

const styleInputAction: CSSProperties = {
  top: '157px',
  right: '30px'
};

export interface InputPasteURLProps {
  disabled: boolean;
  onValidUrl: (url: string) => void;
}

export const InputPasteURL = ({
  disabled,
  onValidUrl
}: InputPasteURLProps): JSX.Element => {

  const [
    state,
    setState
  ] = useState<typeof initialSate>(initialSate);

  const updateState = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => setState(isValidUrl(e.target.value)),
    []
  );

  const processUrl = useCallback(
    (): void => {
      if (!state.isValid) return;
      onValidUrl(state.url);
      setState(initialSate);
    },
    [
      onValidUrl,
      state.isValid,
      state.url
    ]
  );

  const shouldProcessUrl = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key !== KEY_ENTER) return;
      processUrl();
    },
    [
      processUrl
    ]
  );

  return <>
    <Input
      type="text"
      placeholder="Add a link"
      disabled={disabled}
      valid={!!state.url.length && state.isValid}
      invalid={!!state.url.length && !state.isValid}
      value={state.url}
      onChange={updateState}
      onKeyDown={shouldProcessUrl}
      className="text-primary pr-6"
    />
    {state.isValid && (
      <span
        className="position-absolute no-select cursor-pointer text-sm text-secondary d-flex align-items-center"
        style={styleInputAction}
        onClick={processUrl}
        tabIndex={-1}
        role="button"
      >
        <span className="mt-1 mr-1">
          <IonIcon
            name="return-down-back"
            color={ColoursHex.$secondary}
          />
        </span>
        Enter
      </span>
    )}
  </>;
};
