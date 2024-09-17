import { useState } from 'react';
import { Link } from 'react-router-dom';

type RegisterCredentials = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const [RegisterCredentials, setRegisterCredentials] = useState<RegisterCredentials>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="flex items-center justify-center h-full">
      <form className="flex flex-col gap-4 p-3">
        <div>Register</div>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) =>
            setRegisterCredentials({ ...RegisterCredentials, username: e.target.value })
          }
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e) =>
            setRegisterCredentials({ ...RegisterCredentials, password: e.target.value })
          }
        />

        <label>Confirm Password</label>
        <input
          type="password"
          onChange={(e) =>
            setRegisterCredentials({ ...RegisterCredentials, confirmPassword: e.target.value })
          }
        />

        <button
          className="px-2 py-1 text-white bg-indigo-700 rounded-full"
          type="submit"
        >
          Create an account
        </button>

        <Link
          to="/login"
          className="hover:text-indigo-700"
        >
          Have an account? Log in instead!
        </Link>
      </form>
    </div>
  );
};
