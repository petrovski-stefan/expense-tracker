import { useNavigate } from 'react-router-dom';
import { CurrentLoggedInUser } from '../../shared-components/CurrentLoggedInUser';
import { TransactionList } from '../../TransactionList';
import { ChartsContainer } from './ChartsContainer';
import useAuthContext from '../../auth-context/use-auth-context';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { TransactionModalForm } from './TransactionModalForm';

export type TransactionType = {
  id: number;
  amount: number;
  note: string;
  date: string;
  category: {
    name: string;
  };
};

type TransactionsData = {
  transactions: TransactionType[];
};

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
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
        const response: AxiosResponse<TransactionsData> = await axios.get(
          'http://127.0.0.1:8000/api/transactions-list',
          {
            headers: {
              Authorization: `Token ${authInfo.token}`,
            },
          }
        );

        if (response.status === 200) {
          setTransactions([...response.data.transactions]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (authInfo.token !== '') {
      getTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TransactionModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setTransactions={setTransactions}
      />
      <div className={`h-full flex flex-col z-0 ${isModalOpen ? 'opacity-30' : 'opacity-100'}`}>
        <div className="hidden md:h-[10%] md:flex md:justify-between">
          <div className="flex items-center gap-10">
            <div className="p-2">{new Date().toDateString()}</div>
            <div>
              <button
                className="inline-block bg-indigo-700 text-white rounded-full p-2"
                onClick={() => setIsModalOpen(true)}
              >
                Add transaction
              </button>
            </div>
          </div>

          <CurrentLoggedInUser />
        </div>

        <div className="h-full md:h-[90%] md:flex">
          <ChartsContainer />
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </>
  );
};
