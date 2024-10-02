import { BarChart } from './BarChart';
import { CategoryAmount, TransactionAmountByMonth } from './Dashboard';
import { PieChart } from './PieChart';

type ChartsContainerProps = {
  categories: CategoryAmount[];
  transactionsAmountByMonth: TransactionAmountByMonth[];
};

export const ChartsContainer = ({
  categories,
  transactionsAmountByMonth,
}: ChartsContainerProps) => {
  return (
    <div className="flex flex-col gap-5 justify-between w-full md:w-[60%] h-full px-2 py-4">
      <div className="flex flex-col gap-20 justify-between w-[90%] mx-auto">
        <div className="w-[70%] mx-auto">
          <BarChart transactionsAmountByMonth={transactionsAmountByMonth} />
        </div>
        <div className="w-[70%] mx-auto">
          <PieChart categories={categories} />
        </div>
      </div>
    </div>
  );
};
