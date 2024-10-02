import { TransactionType } from './Dashboard';
import { ReducedTransactionItem } from './ReducedTransactionItem';

type LastTransactionsProps = {
  transactions: TransactionType[];
};

export const LastTransactions = ({ transactions }: LastTransactionsProps) => {
  const transactionItems = transactions.slice(0, 7).map((transaction) => {
    return (
      <ReducedTransactionItem
        key={transaction.id}
        {...transaction}
      />
    );
  });

  return <ul>{transactionItems}</ul>;
};
