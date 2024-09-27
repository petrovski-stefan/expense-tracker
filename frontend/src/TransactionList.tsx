import { TransactionType } from './pages/dashboard/Dashboard';
import { Transaction } from './Transaction';

type TransactionListProps = {
  transactions: TransactionType[];
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="w-full md:w-[40%] mx-auto md:mx-0 text-center">
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
