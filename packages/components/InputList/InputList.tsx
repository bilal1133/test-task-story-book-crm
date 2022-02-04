import { nanoid } from 'nanoid';
import {
  ChangeEvent, Fragment, KeyboardEvent, useMemo, useState
} from 'react';
import { Input } from 'reactstrap';

export interface InputListProps {
  type: 'LIST' | 'CHECKBOX' | 'RADIO';
  mode?: 'WRITE' | 'READ';
  appearance?: 'DEFAULT' | 'BORDER';
  placeholder?: string;
  size?: 'sm' | undefined | 'lg';
  className?: string;
  initialState?: InputListState;
  onChange: (state: InputListState) => void;
  isValid?: (label: InputListOption['label']) => boolean;
}

export interface InputListState {
  // type: 'LIST' | 'CHECKBOX' | 'RADIO';
  // mode: 'WRITE' | 'READ';
  options: Array<InputListOption>;
}

 interface InputListOption {
  id: string;
  label: string;
  isSelected?: boolean; // only for 'CHECKBOX' and 'RADIO'
  emoji?: string;       // only for 'LIST'
}

export const InputList = ({
  type,
  mode = 'WRITE',
  appearance = 'DEFAULT',
  placeholder,
  size,
  className,
  initialState,
  onChange,
  isValid
}: InputListProps): JSX.Element => {

  const [
    state,
    setState
  ] = useState<InputListState>(initialState
    ? initialState
    : { options: [
      {
        id: nanoid(),
        label: ''
      }
    ] });

  const onChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (mode === 'READ') return;
    // update option property: 'label'
    setState(prevState => {
      const newState: InputListState = {
        ...prevState,
        options: prevState.options.map((option, optionIndex) => {
          if (optionIndex === index) {
            const newOption: InputListOption = {
              ...option,
              label: e.target.value
            };
            return newOption;
          }
          return option;
        })
      };
      onChange(newState);
      return newState;
    });
  };

  const onKeyDownEvent = (e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement; }, index: number) => {
    if (mode === 'READ') return;
    if (e.key === 'Enter') {
      // insert a new option after this one and focus it
      const nextIndex = index + 1;
      const newOption: InputListOption = {
        id: nanoid(),
        label: ''
      };
      setState(prevState => {
        const newState: InputListState = {
          ...prevState,
          options: [
            ...prevState.options.slice(0, nextIndex),
            newOption,
            ...prevState.options.slice(nextIndex)
          ]
        };
        onChange(newState);
        return newState;
      });
      setTimeout(() => {
        // focus on the next one
        const nextInput = document.querySelector<HTMLInputElement>(`#id-${newOption.id}`);
        if (!nextInput) return;
        nextInput.focus();
      });
    }

    if (e.key === 'Backspace') {
      // if there are more options and this one is empty, remove it and focus on the previous one
      if (state.options.length === 1) return;
      if (e.target.value.length) return;
      const prevIndex = index === 0 ? 0 : (index - 1);
      const nextIndex = index + 1;
      setState(prevState => {
        const newState: InputListState = {
          ...prevState,
          options: [
            ...prevState.options
              .slice(0, index)
              .map(option => ({ ...option })),
            ...prevState.options
              .slice(nextIndex)
              .map(option => ({ ...option }))
          ]
        };
        onChange(newState);
        return newState;
      });
      setTimeout(() => {
        // focus on the previous one
        const prevInput = document.querySelector<HTMLInputElement>(`#id-${state.options[prevIndex].id}`);
        if (!prevInput) return;
        prevInput.focus();
      });
    }
  };

  // const onSelect = (isSelected: boolean, index: number) => {
  //   if (mode === 'READ') return;
  //   // update option property: 'isSelected'
  //   setState(prevState => {
  //     const newState: InputListState = {
  //       ...prevState,
  //       options: prevState.options.map((option, optionIndex) => {
  //         if (optionIndex === index) {
  //           const newOption: InputListOption = {
  //             ...option,
  //             isSelected
  //           };
  //           return newOption;
  //         }
  //         return option;
  //       })
  //     };
  //     onChange(newState);
  //     return newState;
  //   });
  // };

  const _inputPropReadOnly: boolean | undefined = useMemo(
    () => {
      if (mode === 'READ') return true;
      if (mode === 'WRITE') return false;
      return undefined;
    },
    [
      mode
    ]
  );

  const _inputPropClassName: string | undefined = useMemo(
    () => {
      if (!appearance || appearance === 'DEFAULT') {
        if (mode === 'READ') return 'cursor-default form-control-flush';
        if (mode === 'WRITE') return 'no-border__only-bottom';
      }
      if (appearance === 'BORDER') {
        if (mode === 'READ' && appearance === 'BORDER') return 'cursor-default';
        if (mode === 'WRITE' && appearance === 'BORDER') return '';
      }
      return undefined;
    },
    [
      appearance,
      mode
    ]
  );

  return <div className={className}>

    {state.options.map((
      {
        id,
        label
        // isSelected
      },
      index
    ) => (
      <Fragment key={id}>

        {type ==='LIST' && <>
          <Input
            id={`id-${id}`} // used to focus programmatically
            bsSize={size} // BEWARE: other components use `form-control-*` classes
            readOnly={_inputPropReadOnly}
            className={_inputPropClassName}
            placeholder={placeholder ?? 'Enter text'}
            value={label}
            onChange={(e) => onChangeEvent(e, index)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement; }) => onKeyDownEvent(e, index)}
            invalid={isValid ? !isValid(label) : undefined}
          />
        </>}

        {/* {type ==='LIST' && <>
          <ListItemPretty emoji="v">
            <Input
              id={`id-${id}`} // used to focus programmatically
              bsSize={size}
              readOnly={_inputPropReadOnly}
              className={_inputPropClassName}
              placeholder="Enter text"
              value={label}
            onChange={(e) => onChangeEvent(e, index)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement; }) => onKeyDownEvent(e, index)}
            />
          </ListItemPretty>
        </>}

        {type ==='RADIO' && <>
          <InputRadio
            checked={!!isSelected}
            onChange={checked => onSelect(checked, index)}
          >
            <Input
              id={`id-${id}`} // used to focus programmatically
              bsSize={size}
              readOnly={_inputPropReadOnly}
              className={_inputPropClassName}
              placeholder="Enter text"
              value={label}
            onChange={(e) => onChangeEvent(e, index)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement; }) => onKeyDownEvent(e, index)}
            />
          </InputRadio>
        </>}

        {type ==='CHECKBOX' && <>
          <InputCheckbox
            checked={!!isSelected}
            onChange={checked => onSelect(checked, index)}
          >
            <Input
              id={`id-${id}`} // used to focus programmatically
              bsSize={size}
              readOnly={_inputPropReadOnly}
              className={_inputPropClassName}
              placeholder="Enter text"
              value={label}
            onChange={(e) => onChangeEvent(e, index)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement; }) => onKeyDownEvent(e, index)}
            />
          </InputCheckbox>
        </>} */}

      </Fragment>
    ))}

  </div>;
};
