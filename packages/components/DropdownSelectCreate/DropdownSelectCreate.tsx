import {
  IonIcon, LoBadge
} from '@lolab/components';
import { sortAlphabeticallyArr } from '@app/helpers';
import { ColoursHex } from '@app/types';
import classnames from 'classnames';
import { useState } from 'react';
import {
  DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown
} from 'reactstrap';

// TODO: delete me !

interface DropdownSelectCreateState {
  value: string;
  options: Array<string>;
  selected: Array<string>;
  isCreating: boolean;
}

// TODO: use label/value with value nanoid() ? <<< this will affect the capability to change label retroactively automatically // TODO: TO BE DISCUSSED

export const DropdownSelectCreate = ({
  className,
  label,
  options,
  selected,
  onCreate, // TODO: sort out 'onCreate'
  onSelect,
  multiSelect
}: {
  className?: string;
  label: string;
  options: Array<string>;
  selected?: Array<string>;
  onCreate?: (option: string) => Promise<void>;
  onSelect?: (selected: Array<string>) => void;
  multiSelect?: boolean;
}): JSX.Element => {
  const allOptions = sortAlphabeticallyArr({ arr: [
    ...options
  ] });

  const [
    state,
    setState
  ] = useState<DropdownSelectCreateState>({
    value: '',
    options: [
      ...allOptions
    ],
    selected: selected
      ? [
        ...selected
      ]
      : [],
    isCreating: false
  });

  const updateInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setState(prevState => ({
      ...prevState,
      value: value,
      options: allOptions.filter(option => value.length ? option.toLowerCase().trim().includes(value.toLowerCase().trim()) : true),
      selected: multiSelect ? state.selected : (value.length ? state.selected : [])
    }));
  };

  const getSelectionForOption = ({ option }: { option: string }): Array<string> => multiSelect
    ? sortAlphabeticallyArr({ arr: [
      ...new Set([
        ...state.selected,
        option
      ])
    ] })
    : [
      option
    ];

  const selectOption = ({
    option, create
  }: { option: string, create?: boolean; }): void => {
    if (create) {
      setState(prevState => ({
        ...prevState,
        isCreating: true
      }));
    }
    const selection = getSelectionForOption({ option });
    if (onSelect) onSelect(selection);
    if (create) {
      setTimeout(() => {
        // create new option and select it
        // TODO: run onCreate here instead of this fake one.... !!!
        // TODO: do stuff in firebase
        // TODO: do we need to set state after allOptions gets updated from the top (i.e. parent compoent) ?
        allOptions.unshift(option);
        setState(prevState => ({
          ...prevState,
          value: option,
          options: [
            ...allOptions
          ],
          selected: selection,
          isCreating: false
        }));
      }, 2000);
    } else {
      // select new option
      setState(prevState => ({
        ...prevState,
        value: option,
        selected: selection
      }));
    }
  };

  const unselectOption = ({ option }: { option: string; }): void => {
    if (!multiSelect) {
      return;
    }
    setState(prevState => ({
      ...prevState,
      selected: state.selected.filter(selectedOption => selectedOption !== option)
    }));
  };

  const shouldClearSelection = (): void => {
    if (multiSelect) {
      // multiSelect: true -> clear value, keep selection
      setState(prevState => ({
        ...prevState,
        value: '',
        options: [
          ...allOptions
        ]
      }));
    } else if (!!state.value.length && !allOptions.map(option => option.toLowerCase().trim()).includes(state.value.toLowerCase().trim())) {
      // multiSelect: false -> clear value and selection
      setState(prevState => ({
        ...prevState,
        value: '',
        options: [
          ...allOptions
        ],
        selected: []
      }));
    }
  };

  return <div className={`dropdown-select-create ${className}`}>
    <UncontrolledDropdown
      className="d-flex align-items-center cursor-pointer no-select"
      onToggle={shouldClearSelection}
      tag="div"
    >
      <DropdownToggle
        className="w-100 position-relative"
        tag="div"
      >
        <Input
          name="value"
          type="text"
          placeholder={label}
          value={state.isCreating ? 'Updating...' : state.value}
          disabled={state.isCreating}
          onChange={updateInputValue}
          onFocus={e => e.target.placeholder = 'Search...'}
          onBlur={e => e.target.placeholder = label}
          style={{ paddingRight: '40px' }}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <span
          className="position-absolute"
          style={{
            right: '14px',
            top: '14px'
          }}
        >
          <IonIcon name="chevron-down-outline" />
        </span>
      </DropdownToggle>
      {!state.isCreating &&
        <DropdownMenu
          className="w-100"
          style={{ overflow: 'auto' }}
        >
          {!!state.options.length && state.options.map((option, index) =>
            <DropdownItem
              key={index}
              onClick={() => selectOption({
                option,
                create: false
              })}
            >
              <span className={classnames({ 'font-weight-bold': state.selected.includes(option) })}>
                {option}
              </span>
            </DropdownItem>)}
          {!state.options.length &&
            <DropdownItem
              onClick={() => selectOption({
                option: state.value,
                create: true
              })}
            >
                Add &ldquo;{state.value}&rdquo;
            </DropdownItem>}
        </DropdownMenu>}
    </UncontrolledDropdown>
    {multiSelect && !!state.selected.length &&
      <div className="mt-1 d-flex flex-row flex-wrap">
        {state.selected.map((option, index) =>
          <span
            key={index}
            className="dropdown-select-create__selected mt-2 mr-1 d-flex align-items-center"
          >
            <LoBadge
              color={ColoursHex.$default}
            >
              {option}
            </LoBadge>
            <span
              className="dropdown-select-create__selected__remove cursor-pointer d-flex align-items-stretch"
              onClick={() => unselectOption({ option })}
            >
              <IonIcon name="trash-outline" />
            </span>
          </span>)}
      </div>}
  </div>;
};
