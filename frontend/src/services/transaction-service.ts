import axiosInstance from './custom-axios';
import getAuthHeader from './utils';
import { Transaction } from '../models/transaction-types';
import { AxiosPromise } from 'axios';

const TRANSACTION_BASE_PATH = '/transactions/';

type AllTransactionsResponse = {
  transactions: Array<Transaction>;
};

type CreateUpdateTransactionRequest = {
  amount: number;
  date: string;
  note: string;
  category_id: number;
};

type TransactionResponse = {
  transaction: Transaction;
};

export const getAllTransactions = (
  authToken: string,
  queryParams: string = ''
): AxiosPromise<AllTransactionsResponse> => {
  return axiosInstance.get(`${TRANSACTION_BASE_PATH}?${queryParams}`, getAuthHeader(authToken));
};

export const createTransaction = (
  authToken: string,
  transactionData: CreateUpdateTransactionRequest
): AxiosPromise<TransactionResponse> => {
  return axiosInstance.post(TRANSACTION_BASE_PATH, transactionData, getAuthHeader(authToken));
};

export const editTransaction = (
  authToken: string,
  transactionId: number,
  transactionData: CreateUpdateTransactionRequest
): AxiosPromise<TransactionResponse> => {
  return axiosInstance.put(
    `${TRANSACTION_BASE_PATH}${transactionId}`,
    transactionData,
    getAuthHeader(authToken)
  );
};

export const deleteTransaction = (
  authToken: string,
  transactionId: string | number
): AxiosPromise => {
  return axiosInstance.delete(
    `${TRANSACTION_BASE_PATH}/${transactionId}`,
    getAuthHeader(authToken)
  );
};

export const getTransactionAmountByMonth = (authToken: string) => {
  return axiosInstance.get(`${TRANSACTION_BASE_PATH}summary/`, getAuthHeader(authToken));
};
