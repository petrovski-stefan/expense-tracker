type TransactionType = { date: string; amount: number; category: string; note: string };

export const Transaction = ({ amount, category, date, note }: TransactionType) => {
  return (
    <li>
      {amount}$ {date} - {category} - {note}
    </li>
  );
};
