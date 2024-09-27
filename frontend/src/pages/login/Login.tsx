import { AxiosResponse } from 'axios';
import { FormEvent, useState } from 'react';
import useAuthContext from '../../auth-context/use-auth-context';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/custom-axios';

type LoginCredentials = {
  username: string;
  password: string;
};

type LoginResponseData = {
  username: string;
  token: string;
  message: string;
};

type ApiError = {
  response: {
    data: {
      non_field_errors?: string[];
    };
  };
};

export const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (loginCredentials.username === '' || loginCredentials.password === '') {
      setError('Please fill both fields.');
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      const response: AxiosResponse<LoginResponseData> = await axiosInstance.post(
        '/account/login',
        loginCredentials
      );

      if (response.status === 200) {
        const { token, username, message } = response.data;
        login(username, token);
        setLoading(false);
        navigate('/');
        console.log(message);
      }
    } catch (error) {
      const { response } = error as ApiError;
      setLoading(false);

      if (response.data.non_field_errors && response.data.non_field_errors?.length > 0) {
        setError(response.data.non_field_errors[0]);
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
          onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })}
        />

        <label className="font-semibold">Password</label>
        <input
          type="password"
          className="p-1 rounded-md border-2 border-indigo-700"
          onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
        />

        <button
          className="px-2 py-1 text-white bg-indigo-700 rounded-full w-3/5 mx-auto"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>

        <Link
          to="/register"
          className="hover:text-indigo-700 text-center"
        >
          Or, create an account!
        </Link>
      </form>
    </div>
  );
};
