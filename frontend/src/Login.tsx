import { useState } from 'react';

type LoginCredentials = {
  username: string;
  password: string;
};

export const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  return (
    <div className="flex items-center justify-center h-full">
      <form className="flex flex-col gap-4 p-3">
        <div>Login</div>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
        />

        <button
          className="px-2 py-1 text-white bg-indigo-700 rounded-full"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};
