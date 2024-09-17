import { Link } from 'react-router-dom';
import { CurrentLoggedInUser } from './CurrentLoggedInUser';
import { TransactionList } from './TransactionList';
import { ChartsContainer } from './ChartsContainer';

export const Dashboard = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="hidden md:h-[10%] md:flex md:justify-between">
        <div className="flex items-center gap-10">
          <div className="p-2">{new Date().toDateString()}</div>
          <div>
            <Link
              to="/transactions"
              className=" inline-block bg-indigo-700 text-white rounded-full p-2"
            >
              Add transaction
            </Link>
          </div>
        </div>

        <CurrentLoggedInUser />
      </div>

      <div className="h-full md:h-[90%] md:flex">
        <ChartsContainer />
        <TransactionList />
      </div>
    </div>
  );
};