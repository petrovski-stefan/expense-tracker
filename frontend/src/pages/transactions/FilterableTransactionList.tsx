import { FormEvent, useEffect, useState } from 'react';
import useAuthContext from '../../auth-context/use-auth-context';
import { TransactionItem } from './TransactionItem';
import { Transaction } from '../../models/transaction-types';
import { deleteTransaction, getAllTransactions } from '../../services/transaction-service';

type Filters = {
  fromDate: string;
  toDate: string;
};

type FilterableTransactionListProps = {
  transactions: Array<Transaction>;
  setTransactions: React.Dispatch<React.SetStateAction<Array<Transaction>>>;
  setIsModalOpen: (value: boolean) => void;
  setTransactionToEdit: (value: Transaction) => void;
};

export const FilterableTransactionList = ({
  transactions,
  setTransactions,
  setIsModalOpen,
  setTransactionToEdit,
}: FilterableTransactionListProps) => {
  const [dateFilters, setDateFilters] = useState<Filters>({ fromDate: '', toDate: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { authInfo } = useAuthContext();

  useEffect(() => {
    if (authInfo.token !== '') {
      getTransactions(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactions = async (queryParamsString: string | undefined) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await getAllTransactions(authInfo.token, queryParamsString);

      if (response.status === 200) {
        setTransactions([...response.data.transactions]);
      }
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Error');
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteTransaction(authInfo.token, id);
      if (response.status === 204) {
        setTransactions((oldTransactions) =>
          oldTransactions.filter((transaction) => transaction.id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const handleUpdateFilters = (e: FormEvent) => {
    e.preventDefault();

    const queryParamsString = Object.keys(dateFilters)
      .filter((key) => dateFilters[key as keyof typeof dateFilters] !== '')
      .map((key) => `${key}=${dateFilters[key as keyof typeof dateFilters]}`)
      .join('&');

    getTransactions(queryParamsString);
  };

  const handleClearFilters = (e: FormEvent) => {
    e.preventDefault();
    setDateFilters({ fromDate: '', toDate: '' });
    getTransactions(undefined);
  };

  const transactionItems = transactions.map((transaction) => (
    <TransactionItem
      key={transaction.id}
      {...transaction}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  ));

  return (
    <div className="w-full mx-auto md:mx-0 text-center">
      <form className="flex flex-col md:flex-row gap-3 w-1/2 mx-auto">
        <div>
          <label>Start date</label>
          <input
            type="date"
            value={dateFilters.fromDate}
            onChange={(e) => setDateFilters({ ...dateFilters, fromDate: e.target.value })}
          />
        </div>
        <div>
          <label>End date</label>
          <input
            type="date"
            value={dateFilters.toDate}
            onChange={(e) => setDateFilters({ ...dateFilters, toDate: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <button
            className="bg-indigo-700 text-white p-1 font-bold rounded-xl"
            onClick={handleUpdateFilters}
          >
            Update filters
          </button>
          <button
            className="bg-white p-1 font-bold rounded-xl"
            onClick={handleClearFilters}
          >
            Reset filters
          </button>
        </div>
      </form>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && <ul>{transactionItems}</ul>}
      {error !== undefined && <h1>{error}</h1>}
    </div>
  );
};
