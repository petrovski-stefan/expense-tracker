import { useState } from 'react';
import { Header } from '../../shared-components/Header';
import { CategoryManager } from './CategoryManager';
import { CurrencyManager } from './CurrencyManager';

export const Preferences = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col p-2 z-0`}>
      <Header
        buttonText={'Add category'}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="w-2/6 mx-auto md:hidden">
        <button
          className=" bg-indigo-700 text-white rounded-full p-2 w-full mx-auto"
          onClick={() => setIsModalOpen(true)}
        >
          Add category
        </button>
      </div>
      <div className="md:min-h-[90%] flex flex-col-reverse md:flex-row ">
        <CategoryManager
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <CurrencyManager />
      </div>
    </div>
  );
};
