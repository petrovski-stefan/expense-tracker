import useAuthContext from '../../auth-context/use-auth-context';
import axiosInstance from '../../config/custom-axios';
import { Category } from './CategoryManager';

type CategoryProps = {
  id: number;
  name: string;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const CategoryItem = ({ id, name, setCategories }: CategoryProps) => {
  const { authInfo } = useAuthContext();

  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/category/${id}`, {
        headers: {
          Authorization: `Token ${authInfo.token}`,
        },
      });
      if (response.status === 204) {
        setCategories((oldCategories) => oldCategories.filter((category) => category.id !== id));
        // TODO: alert is blocking. Try something else
        // alert(`Successfully deleted the category ${name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="py-1 px-2 my-1 rounded-md w-4/5 mx-auto bg-white">
      <div className="flex justify-between">
        <div className="text-indigo-700 font-bold">{name}</div>
        <button
          onClick={() => handleDelete(id)}
          className="text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
