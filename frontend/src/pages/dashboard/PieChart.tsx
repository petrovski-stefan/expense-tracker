import { CategoryAmount } from './Dashboard';
import { Pie } from 'react-chartjs-2';

type PieChartProps = { categories: CategoryAmount[] };

export const PieChart = ({ categories }: PieChartProps) => {
  const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const data = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: 'Total Spendings',
        data: categories.map((category) => category.total_amount),
        backgroundColor: categories.map(() => generateRandomColor()),
      },
    ],
  };

  return (
    <Pie
      className="mx-auto"
      data={data}
    />
  );
};
