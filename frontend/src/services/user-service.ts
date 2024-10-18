import { AxiosPromise } from 'axios';
import axiosInstance from './custom-axios';

const POST_LOGIN = '/account/login';
const POST_REGISTER = '/account/register';

export type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  username: string;
  token: string;
  message?: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponse = {
  username: string;
  token: string;
  message?: string;
};

export const postLoginUser = (loginCredientals: LoginRequest): AxiosPromise<LoginResponse> => {
  return axiosInstance.post(POST_LOGIN, loginCredientals);
};

export const postRegisterUser = (
  registerCredientals: RegisterRequest
): AxiosPromise<RegisterResponse> => {
  return axiosInstance.post(POST_REGISTER, registerCredientals);
};
