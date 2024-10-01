import { createContext, useContext } from 'react';
import { Currency } from './CurrencyProvider';

type CurrencyContext = {
  currency: Currency;
  symbol: string;
  availableCurrencies: { [key in Currency]: string };
  handleChange: (value: Currency) => void;
};

export const currencyContext = createContext<CurrencyContext | undefined>(undefined);

const useCurrencyContext = () => {
  const context = useContext(currencyContext);
  if (context === undefined) {
    throw new Error('useCurrencyContext must be used within an CurrencyProvider');
  }
  return context;
};

export default useCurrencyContext;
