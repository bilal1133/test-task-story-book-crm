import { IonIcon } from '@lolab/components';
import classnames from 'classnames';
import {
  CSSProperties, FocusEvent, useEffect, useState
} from 'react';
import { Input } from 'reactstrap';
import styles from './InputSearch.module.scss';

export type InputSearchSize = 'sm' | 'default' | 'lg';

const inputStyle: { [key in InputSearchSize]: CSSProperties } = {
  sm: { paddingRight: '30px' },
  default: { paddingRight: '40px' },
  lg: { paddingRight: '60px' }
};

const iconWrapperStyle: { [key in InputSearchSize]: CSSProperties } = {
  sm: {
    top: '0px',
    right: '0px',
    height: '100%',
    width: '30px'
  },
  default: {
    top: '0px',
    right: '0px',
    height: '100%',
    width: '40px'
  },
  lg: {
    top: '0px',
    right: '0px',
    height: '100%',
    width: '60px'
  }
};

const iconStyle: { [key in InputSearchSize]: CSSProperties } = {
  sm: { fontSize: '12px' },
  default: { fontSize: '16px' },
  lg: { fontSize: '22px' }
};

interface InputSearchProps {
  name: string;
  placeholder?: string;
  className?: string;
  size?: InputSearchSize;
  disabled?: boolean;
  searchText?: string;
  style?: CSSProperties;
  invalid?: boolean;
  onChange: (val: string) => void;
  onSearch: (val: string) => void;
  onClear: (val: string) => void;
  onFocus?: (val: string, e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (val: string, e: FocusEvent<HTMLInputElement>) => void;
}

export const InputSearch = ({
  name,
  placeholder = 'Search',
  className = '',
  size = 'default',
  disabled,
  searchText,
  style,
  invalid,
  onChange,
  onSearch,
  onClear,
  onFocus,
  onBlur
}: InputSearchProps): JSX.Element => {

  const [
    _searchText,
    setSearchText
  ]  = useState<string>(searchText ?? '');

  useEffect(
    () => {
      if (typeof searchText === 'string' && searchText !== _searchText) setSearchText(searchText);
    },
    [
      _searchText,
      searchText
    ]
  );

  return (
    <div className={`position-relative ${className}`}>
      <Input
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        name={`search ${name}`}
        value={_searchText}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-100 ${size === 'sm' ? 'form-control-sm' : (size === 'lg' ? 'form-control-lg' : '')}`}
        style={{
          ...inputStyle[size],
          ...style
        }}
        invalid={invalid}
        onChange={(e) => {
          if (disabled) return;
          setSearchText(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter') {
            if (onSearch) onSearch(_searchText);
            (e.target as HTMLInputElement).blur();
          }
        }}
        onFocus={(e) => {
          if (onFocus) onFocus(_searchText, e);
        }}
        onBlur={(e) => {
          if (disabled) return;
          if (onBlur) onBlur(_searchText, e);
        }}
      />
      <div
        role="button"
        className={classnames(
          `input-search__icon-btn position-absolute d-flex align-items-center justify-content-center ${styles.inputSearchIcon}`,
          {
            'cursor-pointer': !disabled,
            'cursor-not-allowed': disabled,
            'pointer-events-none': disabled
          }
        )}
        tabIndex={disabled ? -1 : 0}
        style={{ ...iconWrapperStyle[size] }}
        onClick={() => {
          if (disabled) return;
          setSearchText('');
          if (onClear) onClear('');
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter') {
            setSearchText('');
            if (onClear) onClear('');
            (e.target as HTMLInputElement).blur();
          }
        }}
      >
        {!_searchText && <IonIcon
          name="search-outline"
          style={{ ...iconStyle[size] }}
        />}
        {!!_searchText && <IonIcon
          name="close-outline"
          style={{ ...iconStyle[size] }}
        />}
      </div>
    </div>
  );
};
