import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from './auth-context/use-auth-context';

type RegisterCredentials = {
  username: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponse = {
  username: string;
  token: string;
  message: string;
};

type ApiError = {
  response: {
    data: {
      username?: string[];
    };
  };
};

export const Register = () => {
  const [registerCredentials, setRegisterCredentials] = useState<RegisterCredentials>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (registerCredentials.password !== registerCredentials.confirmPassword) {
      setError('Passwords do not match. Try again.');
      return;
    }

    if (
      registerCredentials.username === '' ||
      registerCredentials.password === '' ||
      registerCredentials.confirmPassword === ''
    ) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError(undefined);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account/register', {
        username: registerCredentials.username,
        password: registerCredentials.password,
      });

      if (response.status === 201) {
        const { token, username, message } = response.data as RegisterResponse;
        login(username, token);
        setLoading(false);
        navigate('/');
        console.log(message);
      }
    } catch (error) {
      const { response } = error as ApiError;
      setLoading(false);

      if (response.data.username && response.data.username?.length > 0) {
        setError(response.data.username[0]);
      }
      console.log(response);
    }
  };

  return (
    <div className="flex items-center justify-center h-3/4">
      <form className="flex flex-col gap-4 p-3 w-3/5 sm:w-2/5 md:w-4/12">
        {error && <h1>{error}</h1>}
        {loading && <h1>Please wait...</h1>}
        <label className="font-semibold">Username</label>
        <input
          type="text"
          className="p-1 rounded-md border-2 border-indigo-700"
          onChange={(e) =>
            setRegisterCredentials({ ...registerCredentials, username: e.target.value })
          }
        />

        <label className="font-semibold">Password</label>
        <input
          type="password"
          className="p-1 rounded-md border-2 border-indigo-700"
          onChange={(e) =>
            setRegisterCredentials({ ...registerCredentials, password: e.target.value })
          }
        />

        <label className="font-semibold">Confirm Password</label>
        <input
          type="password"
          className="p-1 rounded-md border-2 border-indigo-700"
          onChange={(e) =>
            setRegisterCredentials({ ...registerCredentials, confirmPassword: e.target.value })
          }
        />

        <button
          className="px-2 py-1 text-white bg-indigo-700 rounded-full w-5/6 mx-auto"
          type="submit"
          onClick={handleRegister}
        >
          Create an account
        </button>

        <Link
          to="/login"
          className="hover:text-indigo-700 text-center"
        >
          Have an account? Log in instead!
        </Link>
      </form>
    </div>
  );
};
