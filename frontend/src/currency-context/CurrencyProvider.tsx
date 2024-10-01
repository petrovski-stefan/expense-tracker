import { ReactNode, useState } from 'react';
import { currencyContext } from './use-currency-context';

const CURRENCIES = { USD: '$', GBP: '£', EUR: '€' };

export type Currency = keyof typeof CURRENCIES;

type CurrencyProviderProps = { children: ReactNode };

const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const presentCurrency = localStorage.getItem('ET_CURRENCY');

    if (presentCurrency === null) {
      return 'USD';
    }
    return presentCurrency as Currency;
  });

  const handleChange = (value: Currency) => {
    setCurrency(value);
    localStorage.setItem('ET_CURRENCY', value);
  };

  const value = {
    currency,
    handleChange,
    symbol: CURRENCIES[currency],
    availableCurrencies: CURRENCIES,
  };

  return <currencyContext.Provider value={value}>{children}</currencyContext.Provider>;
};

export default CurrencyProvider;
