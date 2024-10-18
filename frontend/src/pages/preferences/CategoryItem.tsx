import useAuthContext from '../../auth-context/use-auth-context';
import { Category } from '../../models/category-types';
import { deleteCategory } from '../../services/category-service';

type CategoryProps = {
  id: number;
  name: string;
  setCategories: React.Dispatch<React.SetStateAction<Array<Category>>>;
};

export const CategoryItem = ({ id, name, setCategories }: CategoryProps) => {
  const { authInfo } = useAuthContext();

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteCategory(authInfo.token, id);
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
        <div className="bg-red-700 px-2 py-1 rounded-lg my-auto">
          <button
            onClick={() => handleDelete(id)}
            className="text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};
