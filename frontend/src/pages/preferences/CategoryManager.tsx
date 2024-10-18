import { useEffect, useState } from 'react';
import useAuthContext from '../../auth-context/use-auth-context';
import { CategoryItem } from './CategoryItem';
import { CategoryModalForm } from './CategoryModalForm';
import { getAllCategories } from '../../services/category-service';
import { Category } from '../../models/category-types';

type CategoryManagerProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export const CategoryManager = ({ isModalOpen, setIsModalOpen }: CategoryManagerProps) => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const { authInfo } = useAuthContext();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategories(authInfo.token);

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
      <div className="w-4/5 md:w-1/2 pt-4 flex flex-col gap-y-5 mx-auto">
        <h1 className="text-center font-bold">Manage your categories</h1>
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
