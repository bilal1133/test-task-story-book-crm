import {
  InputSearch, InputSearchSize
} from '@lolab/components';
import { useArrayFilter } from '@app/hooks';
import {
  Fragment,
  useCallback,
  useEffect, useMemo, useState
} from 'react';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';

export const DropdownSearch = <T extends unknown>({
  name,
  placeholder,
  className,
  initialSearchText,
  searchText,
  options,
  displaySelection,
  allowCreate,
  disabled,
  size,
  displayFn,
  onSelect,
  onCreate,
  onFocus
}: {
  name: string;
  placeholder: string;
  className?: string;
  initialSearchText?: string;
  searchText?: string;
  options?: Array<T>;
  displaySelection?: boolean;
  allowCreate?: boolean;
  disabled?: boolean;
  size?: InputSearchSize;
  displayFn: (item: T) => string; // BEWARE: function to select what to display [string NO html]
  onSelect: (item?: T) => void;
  onCreate?: (label: string) => Promise<void>;
  onFocus?: () => void;
}): JSX.Element => {

  const [
    isOpen,
    setIsOpen
  ] = useState(false);

  const [
    isCreating,
    setIsCreating
  ] = useState(false);

  const {
    filtered: filteredOptions,
    searchText: _searchText,
    setSearchText
  } = useArrayFilter({
    array: options,
    searchText: searchText ?? initialSearchText
  });

  useEffect(
    () => {
      if (typeof searchText === 'string' && searchText !== _searchText) setSearchText(searchText);
    },
    [
      _searchText,
      searchText,
      setSearchText
    ]
  );

  const hasValidSelectedItem = useMemo(
    () => !!options?.find(item => displayFn(item) === _searchText),
    [
      _searchText,
      displayFn,
      options
    ]
  );

  const canCreateItem = useMemo(
    // () => allowCreate && !!_searchText?.length && !options?.find(item => displayFn(item) === _searchText), // commented sd we can always show the "create" option
    () => allowCreate,
    [
      allowCreate
    ]
  );

  const hasNewItem = useMemo( // this has been added when the one above has been commented, to lookup whether the "create" option should in fact create because there is a new item
    () => !!_searchText?.length && !options?.find(item => displayFn(item) === _searchText),
    [
      _searchText,
      displayFn,
      options
    ]
  );

  const selectItem = useCallback(
    (item?: T) => {
      onSelect(item);
      setSearchText(displaySelection && !!item ? displayFn(item) : '');
    },
    [
      displayFn,
      displaySelection,
      onSelect,
      setSearchText
    ]
  );

  const shouldCreateItem = useCallback(
    async () => {
      if (!hasNewItem) {
        // TODO: ? focus input ?
        return;
      }
      if (!onCreate) return;
      setIsCreating(true);
      await onCreate(_searchText);
      setIsCreating(false);
      setSearchText(displaySelection ? _searchText : '');
    },
    [
      _searchText,
      displaySelection,
      hasNewItem,
      onCreate,
      setSearchText
    ]
  );

  const onChange = useCallback(
    (val: string) => {
      onSelect();
      setSearchText(val);
    },
    [
      onSelect,
      setSearchText
    ]
  );

  const onSearch = useCallback(
    async () => {
      if (filteredOptions.length === 1) {
        selectItem(filteredOptions[0]);
      } else if (filteredOptions.length === 0 && canCreateItem) {
        await shouldCreateItem();
      } else {
        selectItem();
      }
      if (isOpen) setIsOpen(false);
    },
    [
      canCreateItem,
      filteredOptions,
      isOpen,
      selectItem,
      shouldCreateItem
    ]
  );

  const onClear = useCallback(
    () => {
      onSelect();
      setSearchText('');
      if (isOpen) setIsOpen(false);
    },
    [
      isOpen,
      onSelect,
      setSearchText
    ]
  );

  return (
    <Dropdown
      className={`w-100 ${className}`}
      direction="down"
      isOpen={isOpen}
      toggle={() => setIsOpen(false)}
      onFocus={() => {
        if (isCreating) return;
        if (!isOpen) setIsOpen(true);
        // ^^^^ BEWARE: we need this to make 'DropdownSearch' properly working when focused via keyboard
        if (onFocus) onFocus();
      }}
    >
      <DropdownToggle
        tag="div"
        disabled={true}
        // ^^^^ BEWARE: we need this to make 'DropdownSearch' properly working when focused via keyboard
      >
        <InputSearch
          name={name}
          placeholder={isCreating ? 'Saving, please wait...' : placeholder}
          searchText={isCreating ? '' : _searchText}
          disabled={isCreating || disabled}
          size={size}
          invalid={!!_searchText.length && !hasValidSelectedItem}
          onChange={onChange}
          onSearch={onSearch}
          onClear={onClear}
        />
      </DropdownToggle>
      <DropdownMenu
        className="w-100"
        modifiers={{ setMaxHeight: {
          enabled: true,
          fn: (data) => {
            return {
              ...data,
              styles: {
                ...data.styles,
                overflow: 'auto',
                maxHeight: '300px'
              }
            };
          }
        } }}
      >
        {!filteredOptions.length && <DropdownItem header>
            No results
        </DropdownItem>}
        {canCreateItem && <>
          {!filteredOptions.length && <DropdownItem divider />}
          <DropdownItem
            tabIndex={0}
            onClickCapture={shouldCreateItem}
          >
            {!hasNewItem && <span>+ Type to create new</span>}
            {hasNewItem && <span>+ Create: {_searchText}</span>}
          </DropdownItem>
          {!!filteredOptions.length && <DropdownItem divider />}
        </>}
        {!!filteredOptions.length && filteredOptions.map((item, index) => (
          <Fragment key={index}>
            <DropdownItem
              tabIndex={0}
              onClick={() => selectItem(item)}
            >
              {displayFn(item)}
            </DropdownItem>
            {(index < (filteredOptions.length - 1)) && (
              <DropdownItem
                className="w-100"
                divider
              />
            )}
          </Fragment>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
