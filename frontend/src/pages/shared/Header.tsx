import { CurrentLoggedInUser } from './CurrentLoggedInUser';

type HeaderProps = {
  buttonText: string;
  setIsModalOpen: (value: boolean) => void;
};

// For big screens only
export const Header = ({ buttonText, setIsModalOpen }: HeaderProps) => {
  return (
    <div className="hidden md:h-[10%] md:flex md:justify-between">
      <div className="flex items-center gap-10">
        <div className="p-2 font-bold">{new Date().toDateString()}</div>
        <div>
          <button
            className="inline-block bg-indigo-700 text-white rounded-full p-2"
            onClick={() => setIsModalOpen(true)}
          >
            {buttonText}
          </button>
        </div>
      </div>

      <CurrentLoggedInUser />
    </div>
  );
};
