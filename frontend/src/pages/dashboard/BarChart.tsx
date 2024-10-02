import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { BarElement } from 'chart.js';
import { TransactionAmountByMonth } from './Dashboard';
ChartJS.register(BarElement);

type BarChartProps = { transactionsAmountByMonth: TransactionAmountByMonth[] };
export const BarChart = ({ transactionsAmountByMonth }: BarChartProps) => {
  const data = {
    labels: transactionsAmountByMonth.map((transaction) => transaction.month),
    datasets: [
      {
        label: 'Transaction amount by month',
        data: transactionsAmountByMonth.map((transaction) => transaction.total_amount),
      },
    ],
  };
  return (
    <Bar
      className="mx-auto"
      data={data}
    ></Bar>
  );
};
