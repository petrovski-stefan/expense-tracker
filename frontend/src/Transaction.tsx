import { TransactionType } from './pages/dashboard/Dashboard';

export const Transaction = ({ id, amount, category, date, note }: TransactionType) => {
  const dateString = new Date(date).toDateString();
  return (
    <li className="flex justify-around text-center">
      <p className="justify-center">{dateString}</p>
      <p className="justify-center">{amount}$</p>
      <div className="text-center">{id}</div>
      <div>{note}</div>
      <div>{category.name}</div>
    </li>
  );
};
