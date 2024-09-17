import { Transaction } from './Transaction';

// dummy data (until api is not implemented)
const transactions = [
  { id: 1, date: '25-08-2024', amount: 500, category: 'Grocery', note: 'Shopping......' },
  { id: 2, date: '25-08-2024', amount: 200, category: 'Grocery', note: 'Shopping......' },
  { id: 3, date: '25-08-2024', amount: 150, category: 'Out', note: 'Shopping......' },
  { id: 4, date: '26-08-2024', amount: 6000, category: 'College', note: 'Shopping......' },
  { id: 5, date: '26-08-2024', amount: 10, category: 'Grocery', note: 'Shopping......' },
  { id: 6, date: '27-08-2024', amount: 800, category: 'Out', note: 'Shopping......' },
  { id: 7, date: '27-08-2024', amount: 800, category: 'Out', note: 'Shopping......' },
  { id: 8, date: '27-08-2024', amount: 800, category: 'Out', note: 'Shopping......' },
  { id: 9, date: '27-08-2024', amount: 800, category: 'Out', note: 'Shopping......' },
  { id: 10, date: '27-08-2024', amount: 800, category: 'Out', note: 'Shopping......' },
  { id: 11, date: '27-08-2024', amount: 800, category: 'Out', note: 'Shopping......' },
];

export const TransactionList = () => {
  return (
    <div className=" md:w-[40%] mx-auto md:mx-0 text-center">
      <h1>Your Latest Transactions</h1>
      <ul>
        {transactions.slice(0, 10).map((transaction) => (
          <Transaction
            key={transaction.id}
            {...transaction}
          />
        ))}
      </ul>
    </div>
  );
};
