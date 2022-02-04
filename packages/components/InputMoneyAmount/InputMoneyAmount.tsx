import { DropdownSearch } from '@lolab/components';
import {
  CurrencyCodeISO4217, currencySelectorOptions
} from '@app/constants';
import { formatCurrency } from '@app/helpers';
import { MoneyAmount } from '@app/types';
import { isEqual } from 'lodash';
import {
  useEffect, useMemo, useState
} from 'react';
import { Input } from 'reactstrap';

const defaultCurrencyCode = CurrencyCodeISO4217.GBP;

interface InputMoneyAmountState {
  isFocused: boolean;
  moneyAmount: MoneyAmount;
}

export const InputMoneyAmount = ({
  className,
  enableCurrencySelector = true,
  preselectedMoneyAmount,
  forceCurrencyCode,
  triggerForStateUpdate,
  onChange // this one needs to be wrapped into a useCallback to prevent infinite re-rendering, because it's part of a useEffect deps array
}:{
  className?: string;
  enableCurrencySelector?: boolean;
  preselectedMoneyAmount?: MoneyAmount | Partial<MoneyAmount>;
  forceCurrencyCode?: CurrencyCodeISO4217;
  triggerForStateUpdate?: unknown;
  onChange: (moneyAmount: MoneyAmount) => void; // this one needs to be wrapped into a useCallback to prevent infinite re-rendering, because it's part of a useEffect deps array
}): JSX.Element => {

  const initialState: InputMoneyAmountState = useMemo(
    () => ({
      isFocused: false,
      moneyAmount: {
        currencyCode: preselectedMoneyAmount?.currencyCode ?? defaultCurrencyCode,
        amount: preselectedMoneyAmount?.amount ?? '',
        formattedAmount: formatCurrency({
          amount: preselectedMoneyAmount?.amount ?? '',
          currencyCode: preselectedMoneyAmount?.currencyCode ?? defaultCurrencyCode
        })
      }
    }),
    [
      preselectedMoneyAmount?.amount,
      preselectedMoneyAmount?.currencyCode
    ]
  );

  const [
    state,
    setState
  ] = useState<InputMoneyAmountState>(initialState);

  useEffect(
    () => onChange(state.moneyAmount),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // onChange,
      state.moneyAmount
    ]
    // ^^^^ BEWARE: do NOT watch 'onChange' ANYWAY, it's just too easy to forget to wrap it in 'useCallback' in then parent component using 'InputMoneyAmount'
  );

  const [
    _triggerForStateUpdate,
    setTriggerForStateUpdate
  ] = useState<unknown>();

  useEffect(
    () => {
      if (!!triggerForStateUpdate && !isEqual(triggerForStateUpdate, _triggerForStateUpdate)) {
        setTriggerForStateUpdate(triggerForStateUpdate);
        if (!isEqual(state, initialState)) {
          setState(initialState);
        }
      }
    },
    [
      _triggerForStateUpdate,
      initialState,
      state,
      triggerForStateUpdate
    ]
  );

  useEffect(
    () => {
      if (!!forceCurrencyCode && state.moneyAmount.currencyCode !== forceCurrencyCode) {
        setState(prevState => {
          const newState: InputMoneyAmountState = {
            ...prevState,
            moneyAmount: {
              ...prevState.moneyAmount,
              currencyCode: forceCurrencyCode ?? defaultCurrencyCode,
              formattedAmount: formatCurrency({
                amount: prevState.moneyAmount.amount,
                currencyCode: forceCurrencyCode ?? defaultCurrencyCode
              })
            }
          };
          return newState;
        });
      }
    },
    [
      forceCurrencyCode,
      state.moneyAmount.currencyCode
    ]
  );

  return <>
    {enableCurrencySelector && (
      <DropdownSearch
        className={className}
        name="account"
        placeholder="Select a currency"
        initialSearchText={currencySelectorOptions.find(({ code }) => code === state.moneyAmount.currencyCode)?.label}
        options={currencySelectorOptions}
        displaySelection={true}
        displayFn={currencyInfo => currencyInfo?.label ?? ''}
        onSelect={(currencyInfo) => setState(prevState => {
          const newState: InputMoneyAmountState = {
            ...prevState,
            moneyAmount: {
              ...prevState.moneyAmount,
              currencyCode: currencyInfo?.code ?? defaultCurrencyCode,
              formattedAmount: formatCurrency({
                amount: prevState.moneyAmount.amount,
                currencyCode: currencyInfo?.code ?? defaultCurrencyCode
              })
            }
          };
          return newState;
        })}
      />
    )}
    <Input
      className={`${enableCurrencySelector ? 'mt-1' : undefined} ${className}`}
      type="text"
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      value={state.isFocused ? state.moneyAmount.amount : state.moneyAmount.formattedAmount}
      onFocus={() => setState(prevState => {
        const newState: InputMoneyAmountState = {
          ...prevState,
          isFocused: true
        };
        return newState;
      })}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          (e.target as HTMLInputElement).blur();
        }
      }}
      onBlur={() => setState(prevState => {
        const newState: InputMoneyAmountState = {
          ...prevState,
          isFocused: false,
          moneyAmount: {
            ...prevState.moneyAmount,
            amount: prevState.moneyAmount.amount.replace(/\.$/, '') // cleaup text ending with a dot, e.g. '123.45.'
          }
        };
        return newState;
      })}
      onChange={e => {
        if (e.target.value.endsWith('.') && state.moneyAmount.amount.includes('.')) return;
        const amount = e.target.value.replace(/^\./, '').replace(/[^0-9.]/g, '');
        setState(prevState => {
          const newState: InputMoneyAmountState = {
            ...prevState,
            moneyAmount: {
              ...prevState.moneyAmount,
              amount,
              formattedAmount: formatCurrency({
                amount,
                currencyCode: prevState.moneyAmount.currencyCode
              })
            }
          };
          return newState;
        });
      }}
    />
  </>;
};
