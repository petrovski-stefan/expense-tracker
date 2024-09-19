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
    <div className="flex items-center justify-center h-full">
      {error && <h1>{error}</h1>}
      {loading && <h1>Loading</h1>}
      <form className="flex flex-col gap-4 p-3">
        <div>Register</div>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) =>
            setRegisterCredentials({ ...registerCredentials, username: e.target.value })
          }
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e) =>
            setRegisterCredentials({ ...registerCredentials, password: e.target.value })
          }
        />

        <label>Confirm Password</label>
        <input
          type="password"
          onChange={(e) =>
            setRegisterCredentials({ ...registerCredentials, confirmPassword: e.target.value })
          }
        />

        <button
          className="px-2 py-1 text-white bg-indigo-700 rounded-full"
          type="submit"
          onClick={handleRegister}
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
