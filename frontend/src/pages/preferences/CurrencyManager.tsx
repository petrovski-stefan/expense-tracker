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
    <div className="w-4/5 md:w-1/2 pt-4 flex flex-col gap-y-5 mx-auto">
      <h1 className="text-center font-bold">Select your default currency</h1>
      <select
        className="3/4 md:w-1/4 text-center mx-auto p-2 rounded-md"
        value={currency}
        onChange={(e) => handleChange(e.target.value as keyof typeof availableCurrencies)}
      >
        {options}
      </select>
    </div>
  );
};
