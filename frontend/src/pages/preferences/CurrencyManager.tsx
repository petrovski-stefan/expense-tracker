import useCurrencyContext from '../../currency-context/use-currency-context';

export const CurrencyManager = () => {
  const { currency, availableCurrencies, handleChange } = useCurrencyContext();

  const options = Object.keys(availableCurrencies).map((key) => {
    return (
      <option
        key={key}
        value={key}
      >
        {key}
      </option>
    );
  });
  return (
    <div className="w-1/2">
      <h1>Select your default currency</h1>
      <select
        value={currency}
        onChange={(e) => handleChange(e.target.value as keyof typeof availableCurrencies)}
      >
        {options}
      </select>
    </div>
  );
};
