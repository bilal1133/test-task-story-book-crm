import { MoneyAmount } from '@app/types';

export const formatCurrency = ({
  currencyCode,
  amount
}: {
  currencyCode: MoneyAmount['currencyCode'],
  amount: MoneyAmount['amount'],
}): string => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: currencyCode
}).format(
  parseFloat(
    amount.trim().length
      ? amount
      : '0'
  )
);
