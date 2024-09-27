import { useEffect, useState } from 'react';
import useAuthContext from '../../auth-context/use-auth-context';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../config/custom-axios';
import { CategoryItem } from './CategoryItem';
import { CategoryModalForm } from './CategoryModalForm';

export type Category = {
  id: number;
  name: string;
};

type CategoryResponseData = {
  categories: Category[];
};

type CategoryManagerProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export const CategoryManager = ({ isModalOpen, setIsModalOpen }: CategoryManagerProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { authInfo } = useAuthContext();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response: AxiosResponse<CategoryResponseData> = await axiosInstance.get(
          '/category-list',
          {
            headers: {
              Authorization: `Token ${authInfo.token}`,
            },
          }
        );
        if (response.status === 200) {
          setCategories([...response.data.categories]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <CategoryModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setCategories={setCategories}
      />
      <div className="w-1/2">
        <h1>Manage your categories</h1>
        <ul>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              {...category}
              setCategories={setCategories}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
