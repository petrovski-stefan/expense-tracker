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
      <div className="md:min-h-[90%] md:flex">
        <CategoryManager
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <CurrencyManager />
      </div>
    </div>
  );
};
