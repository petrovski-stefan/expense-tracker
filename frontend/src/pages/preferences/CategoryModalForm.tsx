import { FormEvent, useState } from 'react';
import { Category } from './CategoryManager';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../config/custom-axios';
import useAuthContext from '../../auth-context/use-auth-context';

type CategoryModalForm = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const CategoryModalForm = ({
  isModalOpen,
  setIsModalOpen,
  setCategories,
}: CategoryModalForm) => {
  const [name, setName] = useState('');
  const { authInfo } = useAuthContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<Category> = await axiosInstance.post(
        '/category',
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Token ${authInfo.token}`,
          },
        }
      );
      if (response.status === 201) {
        setCategories((oldCategories) => [...oldCategories, response.data]);
        setName('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        isModalOpen
          ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-4/6 sm:w-3/6 md:w-2/6 bg-white rounded-lg p-2'
          : 'hidden'
      }`}
    >
      <div className="relative p-2">
        <h3 className="mb-5 py-2 font-bold text-xl sm:text-2xl">Add new category</h3>
        <form className="flex flex-col gap-3">
          <div className="flex justify-between">
            <label className="w-[40%] sm:w-[30%]">Category's name</label>
            <input
              className="w-[60%] sm:w-[70%] border border-black rounded-md"
              type="text"
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="px-2 py-1 text-white bg-indigo-700 rounded-full w-4/5 mx-auto mt-2"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
        <button
          className="absolute top-1 right-2"
          onClick={() => setIsModalOpen(false)}
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};
