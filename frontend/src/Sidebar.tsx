import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentLoggedInUser } from './CurrentLoggedInUser';

const links = [
  { path: '/', name: 'DASHBOARD' },
  { path: '/transactions', name: 'TRANSACTIONS' },
  { path: '/settings', name: 'SETTINGS' },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setIsOpen((oldValue) => !oldValue);
  };
  return (
    <>
      <div
        className={
          'md:hidden h-[10%] flex items-center bg-indigo-700 text-white ' +
          (isOpen ? ' hidden' : '')
        }
      >
        <div className="flex justify-between w-full px-4">
          <button
            className="inline-block text-2xl"
            onClick={toggleMenu}
          >
            &#9776;
          </button>

          <div className="flex items-center justify-center">EX-Tracker</div>
          <CurrentLoggedInUser />
        </div>
      </div>
      <div
        className={
          'bg-indigo-700 text-white w-2/5  md:block md:w-1/5' +
          (isOpen ? ' absolute top-0 z-10 w-full h-full ' : ' hidden')
        }
      >
        <div className="flex items-center justify-center h-1/5 font-bold text-2xl  md:text-3xl">
          EX-Tracker
        </div>
        <div className={'' + (isOpen ? ' absolute top-2 right-3 md:hidden ' : 'hidden')}>
          <button onClick={toggleMenu}>&#x2715;</button>
        </div>
        {links.map((link) => {
          return (
            <div
              key={link.name}
              className="text-lg w-full text-center mb-6 md:mb-3"
            >
              <div
                className={
                  'w-3/4  mx-auto' +
                  (location.pathname === link.path
                    ? ' underline underline-offset-4 decoration-1 decoration-white'
                    : '')
                }
              >
                <Link
                  to={link.path}
                  onClick={() => {
                    if (isOpen) setIsOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
