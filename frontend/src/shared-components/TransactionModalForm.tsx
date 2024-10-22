import { FormEvent, useEffect, useState } from 'react';
import useAuthContext from '../auth-context/use-auth-context';
import { Transaction } from '../models/transaction-types';
import { getAllCategories } from '../services/category-service';
import { Category } from '../models/category-types';
import { createTransaction, editTransaction } from '../services/transaction-service';

type TransactionModalFormProps = {
  transaction?: Transaction;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setTransactions: React.Dispatch<React.SetStateAction<Array<Transaction>>>;
};

type TransactionFormData = {
  amount: number;
  date: string;
  note: string;
  category_id: number;
};

const getFormInitialData = (transaction: Transaction | undefined) => {
  if (transaction === undefined) {
    return {
      amount: 0,
      date: '',
      note: '',
      category_id: -1,
    } as TransactionFormData;
  }

  return {
    amount: transaction.amount,
    date: transaction.date,
    note: transaction.note,
    category_id: transaction.category ? transaction.category.id : -1,
  };
};

export const TransactionModalForm = ({
  transaction,
  isModalOpen,
  setIsModalOpen,
  setTransactions,
}: TransactionModalFormProps) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: 0,
    date: '',
    note: '',
    category_id: -1,
  });
  const [categories, setCategories] = useState<Array<Category>>([]);
  const { authInfo } = useAuthContext();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategories(authInfo.token);
        if (response.status === 200) {
          setCategories([...response.data.categories]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (transaction) {
      setFormData(getFormInitialData(transaction));
    }
  }, [transaction]);

  const handleRequest = (transaction: Transaction | undefined, formData: TransactionFormData) => {
    if (transaction) {
      return editTransaction(authInfo.token, transaction.id, formData);
    }
    return createTransaction(authInfo.token, formData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await handleRequest(transaction, formData);

      console.log(response);
      if (response.status === 201 || response.status === 200) {
        if (transaction === undefined) {
          setTransactions((oldTransactions) => [...oldTransactions, response.data.transaction]);
        } else {
          setTransactions((oldTransactions) => [
            ...oldTransactions.filter((currTransaction) => currTransaction.id !== transaction.id),
            response.data.transaction,
          ]);
        }
        setFormData({ amount: 0, date: '', note: '', category_id: -1 });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        isModalOpen
          ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10  w-4/6 sm:w-3/6 md:w-2/6 bg-white rounded-lg p-2'
          : 'hidden'
      }`}
    >
      <div className="relative p-2">
        <h3 className="mb-5 py-2 font-bold text-xl sm:text-2xl">
          {transaction ? 'Edit Transaction' : 'Add new transaction'}
        </h3>
        <form className="flex flex-col gap-3">
          <div className="w-full flex justify-between">
            <label className="w-[40%] sm:w-[30%]">Amount</label>
            <input
              className="w-[60%] sm:w-[70%] border border-black rounded-md"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
            />
          </div>

          <div className="flex justify-between">
            <label className="w-[40%] sm:w-[30%]">Date</label>
            <input
              className="w-[60%] sm:w-[70%] border border-black rounded-md"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="flex justify-between">
            <label className="w-[40%] sm:w-[30%]">Note</label>
            <input
              className="w-[60%] sm:w-[70%] border border-black rounded-md"
              type="text"
              value={formData.note}
              maxLength={50}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>

          <div className="flex justify-between">
            <label className="w-[40%] sm:w-[30%]">Category</label>
            <select
              className="w-[60%] sm:w-[70%] border border-black rounded-md"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
            >
              <option
                defaultChecked
                value="-1"
              >
                Choose a category
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="px-2 py-1 text-white bg-indigo-700 rounded-full w-4/5 mx-auto mt-2"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
        <button
          className="absolute top-1 right-2"
          onClick={() => setIsModalOpen(false)}
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};
