import useCurrencyContext from '../../currency-context/use-currency-context';
import { TransactionType } from '../dashboard/Dashboard';

type TransactionItemProps = TransactionType & {
  handleDelete: (id: number) => void;
  handleUpdate: (transaction: TransactionType) => void;
};

export const TransactionItem = ({
  id,
  amount,
  category,
  date,
  note,
  handleDelete,
  handleUpdate,
}: TransactionItemProps) => {
  const { symbol } = useCurrencyContext();
  const dateString = new Date(date).toDateString();
  const noteString = note === '' ? 'No details' : note;
  const categoryString = category?.name ?? 'Uncategorized';

  return (
    <li className="py-1 px-2 my-1 rounded-md w-5/6 mx-auto bg-white">
      <div className="flex justify-between">
        <div className="md:w-[20%] xl:w-[15%]">
          <p className="bg-indigo-700 text-white rounded-lg">{categoryString}</p>
          <p className="text-sm">{dateString}</p>
        </div>

        <div>
          <p className="font-bold text-center">
            {amount}
            {symbol}
          </p>
          <p className="font-bold text-center">{noteString}</p>
        </div>
        <div className="flex flex-col gap-1 md:flex-row w-[25%] justify-around">
          <div className="bg-green-700 px-4 py-1 rounded-lg my-auto">
            <button
              onClick={() => handleUpdate({ id, amount, category, date, note })}
              className="text-white"
            >
              Edit
            </button>
          </div>
          <div className="bg-red-700 px-2 py-1 rounded-lg my-auto">
            <button
              onClick={() => handleDelete(id)}
              className="text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
