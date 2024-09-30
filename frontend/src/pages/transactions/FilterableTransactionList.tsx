import { FormEvent, useEffect, useState } from 'react';
import useAuthContext from '../../auth-context/use-auth-context';
import axiosInstance from '../../config/custom-axios';
import { TransactionType } from '../dashboard/Dashboard';
import { TransactionItem } from './TransactionItem';
import { AxiosResponse } from 'axios';

type TransactionsData = {
  transactions: TransactionType[];
};

type Filters = {
  fromDate: string;
  toDate: string;
};

type FilterableTransactionListProps = {
  transactions: TransactionType[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  setIsModalOpen: (value: boolean) => void;
  setTransactionToEdit: (value: TransactionType) => void;
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
      const path = `/transaction${queryParamsString ?? ''}`;
      const response: AxiosResponse<TransactionsData> = await axiosInstance.get(path, {
        headers: {
          Authorization: `Token ${authInfo.token}`,
        },
      });

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
      const response = await axiosInstance.delete(`/transaction/${id}`, {
        headers: {
          Authorization: `Token ${authInfo.token}`,
        },
      });
      if (response.status === 204) {
        setTransactions((oldTransactions) =>
          oldTransactions.filter((transaction) => transaction.id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (transaction: TransactionType) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const handleUpdateFilters = (e: FormEvent) => {
    e.preventDefault();

    const queryParamsString = `?${Object.keys(dateFilters)
      .filter((key) => dateFilters[key as keyof typeof dateFilters] !== '')
      .map((key) => `${key}=${dateFilters[key as keyof typeof dateFilters]}`)
      .join('&')}`;

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
