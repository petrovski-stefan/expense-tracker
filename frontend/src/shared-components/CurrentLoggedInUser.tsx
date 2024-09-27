import useAuthContext from '../auth-context/use-auth-context';

export const CurrentLoggedInUser = () => {
  const { authInfo } = useAuthContext();
  return (
    <div className="flex items-center justify-center">
      <p
        className={`text-white font-bold ${
          authInfo.token === '' ? 'hidden' : ''
        } md:bg-indigo-700 rounded-full p-2`}
      >
        Hello, {authInfo.username}!
      </p>
    </div>
  );
};
