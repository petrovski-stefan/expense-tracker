import { useState } from 'react';
import { CurrentLoggedInUser } from '../../shared-components/CurrentLoggedInUser';
import { FilterableTransactionList } from './FilterableTransactionList';
import { TransactionType } from '../dashboard/Dashboard';
import { TransactionModalForm } from '../../shared-components/TransactionModalForm';

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<TransactionType | undefined>(
    undefined
  );

  return (
    <>
      <TransactionModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        transaction={transactionToEdit}
        setTransactions={setTransactions}
      />
      <div
        className={`min-h-screen flex flex-col p-2 ${isModalOpen ? 'opacity-30' : 'opacity-100'}`}
      >
        <div className="hidden md:h-[10%] md:flex md:flex-row-reverse">
          <CurrentLoggedInUser />
        </div>
        <div className="flex flex-col p-2 w-full mt-4 mx-auto">
          <FilterableTransactionList
            transactions={transactions}
            setTransactions={setTransactions}
            setIsModalOpen={setIsModalOpen}
            setTransactionToEdit={setTransactionToEdit}
          />
        </div>
      </div>
    </>
  );
};
