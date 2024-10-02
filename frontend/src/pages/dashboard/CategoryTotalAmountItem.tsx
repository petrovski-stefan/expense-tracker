import useCurrencyContext from '../../currency-context/use-currency-context';

type CategoryTotalAmountItemProps = {
  name: string;
  total_amount: number;
};

export const CategoryTotalAmountItem = ({ name, total_amount }: CategoryTotalAmountItemProps) => {
  const { symbol } = useCurrencyContext();
  return (
    <li className="py-1 px-2 my-1 rounded-md w-[90%] mx-auto bg-white">
      <div className="flex justify-between">
        <p className="text-indigo-700 font-bold">{name}</p>
        <p className="font-bold">
          {total_amount}
          {symbol}
        </p>
      </div>
    </li>
  );
};
