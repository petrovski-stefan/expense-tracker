import axios from 'axios';
import { FormEvent, useState } from 'react';
import useAuthContext from './auth-context/use-auth-context';
import { useNavigate } from 'react-router-dom';

type LoginCredentials = {
  username: string;
  password: string;
};

type LoginResponse = {
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

  const { login } = useAuthContext();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(undefined);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account/login', {
        username: loginCredentials.username,
        password: loginCredentials.password,
      });

      if (response.status === 200) {
        const { token, username, message } = response.data as LoginResponse;
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
    <div className="flex items-center justify-center h-full">
      <form className="flex flex-col gap-4 p-3">
        {error && <h1>{error}</h1>}
        {loading && <h1>Loading</h1>}
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
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};
