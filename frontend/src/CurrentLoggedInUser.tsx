import useAuthContext from './auth-context/use-auth-context';

export const CurrentLoggedInUser = () => {
  const { authInfo } = useAuthContext(); // TODO: move to props?
  return (
    <div className="flex items-center justify-center text-white">USER:{authInfo.username}</div>
  );
};
