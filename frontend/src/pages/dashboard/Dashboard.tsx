import { useNavigate } from 'react-router-dom';
import { ChartsContainer } from './ChartsContainer';
import useAuthContext from '../../auth-context/use-auth-context';
import { useEffect, useState } from 'react';
import { TransactionModalForm } from '../../shared-components/TransactionModalForm';
import { AxiosResponse } from 'axios';
import { LastTransactions } from './LastTransactions';
import { TopCategories } from './TopCategories';
import { Header } from '../../shared-components/Header';
import { Transaction } from '../../models/transaction-types';
import {
  getAllTransactions,
  getTransactionAmountByMonth,
} from '../../services/transaction-service';
import { getAllCategories } from '../../services/category-service';
import { Category } from '../../models/category-types';

export type CategoryAmount = Category & { total_amount: number };

type TransactionsData = {
  transactions: Array<Transaction>;
};

export type TransactionAmountByMonth = {
  total_amount: number;
  month: string;
};

type TransactionAmountByMonthData = {
  transactionsAmountByMonth: TransactionAmountByMonth[];
};

type TopCategories = {
  categories: Array<CategoryAmount>;
};

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [categories, setCategories] = useState<CategoryAmount[]>([]);
  const [transactionsAmountByMonth, setTransactionsAmountByMonth] = useState<
    TransactionAmountByMonth[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authInfo } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authInfo.token === '') {
      navigate('/login');
    }
  });

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response: AxiosResponse<TransactionsData> = await getAllTransactions(authInfo.token);

        if (response.status === 200) {
          setTransactions([...response.data.transactions]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();
  }, []);

  useEffect(() => {
    const getTopCategories = async () => {
      try {
        const response = (await getAllCategories(
          authInfo.token,
          'topCategories=true'
        )) as AxiosResponse<TopCategories>;

        if (response.status === 200) {
          setCategories([...response.data.categories]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getTransactionsAmountByMonth = async () => {
      try {
        const response: AxiosResponse<TransactionAmountByMonthData> =
          await getTransactionAmountByMonth(authInfo.token);

        if (response.status === 200) {
          setTransactionsAmountByMonth([...response.data.transactionsAmountByMonth]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTransactionsAmountByMonth();
    getTopCategories();
  }, [JSON.stringify(transactions)]);

  return (
    <>
      <TransactionModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setTransactions={setTransactions}
      />
      <div
        className={`min-h-screen flex flex-col z-0 p-2 ${
          isModalOpen ? 'opacity-30' : 'opacity-100'
        }`}
      >
        <Header
          setIsModalOpen={setIsModalOpen}
          buttonText="Add transaction"
        />
        <div className="w-2/6 h-full mx-auto md:hidden">
          <button
            className=" bg-indigo-700 text-white rounded-full p-2 w-full mx-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Add transaction
          </button>
        </div>
        {transactions.length === 0 ? (
          <h1 className="h-[80%] m-auto text-center font-bold">
            Add at least one transaction to get started
          </h1>
        ) : (
          <div className="md:h-[80%] flex flex-col md:flex-row">
            <ChartsContainer
              categories={categories}
              transactionsAmountByMonth={transactionsAmountByMonth}
            />

            <div className="flex flex-col gap-y-3 md:w-[40%] px-2 py-4">
              <h1 className="text-center font-bold">
                Your last {transactions.slice(0, 7).length} transactions
              </h1>
              <LastTransactions transactions={transactions} />
              <h1 className="text-center font-bold">
                Top {categories.slice(0, 5).length} categories by spending
              </h1>
              <TopCategories categories={categories} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
