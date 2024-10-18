import useCurrencyContext from '../../currency-context/use-currency-context';
import { Transaction } from '../../models/transaction-types';

type ReducedTransactionItemProps = Transaction;

export const ReducedTransactionItem = ({
  amount,
  category,
  date,
  note,
}: ReducedTransactionItemProps) => {
  const { symbol } = useCurrencyContext();
  const dateString = new Date(date).toDateString();
  const noteString = note === '' ? 'No details' : note;
  const slicedNote = `${noteString.slice(0, 20)}${noteString.length > 20 ? '...' : ''}`;
  const categoryString = category?.name ?? 'Uncategorized';

  return (
    <li className="py-1 px-2 my-1 rounded-md w-[90%] mx-auto bg-white">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between md:w-[40%]">
          <p className="bg-indigo-700 text-white text-center rounded-lg">{categoryString}</p>
          <p className="text-xs text-center font-bold">{dateString}</p>
        </div>

        <div>
          <p className="font-bold text-right">
            {amount}
            {symbol}
          </p>
          <p className="font-bold text-right text-xs">{slicedNote}</p>
        </div>
      </div>
    </li>
  );
};
