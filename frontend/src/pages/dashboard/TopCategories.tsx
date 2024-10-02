import { CategoryTotalAmountItem } from './CategoryTotalAmountItem';
import { CategoryAmount } from './Dashboard';

type TopCategoriesProps = { categories: CategoryAmount[] };

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  const categoryItems = categories.slice(0, 5).map((category) => {
    return (
      <CategoryTotalAmountItem
        key={category.id}
        {...category}
      />
    );
  });
  return <ul>{categoryItems}</ul>;
};
