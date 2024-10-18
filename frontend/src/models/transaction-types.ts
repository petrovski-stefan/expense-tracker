import { Category } from './category-types';

export type Transaction = {
  id: number;
  amount: number;
  note: string;
  date: string;
  category: Category | null;
};
