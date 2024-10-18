import axiosInstance from './custom-axios';
import getAuthHeader from './utils';
import { Transaction } from '../models/transaction-types';
import { AxiosPromise } from 'axios';

const TRANSACTION_CRUD_BASE = '/transaction';
const GET_TRANSACTION_TOTAL_BY_MONTH = '/transactions-by-month';

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
  return axiosInstance.get(`${TRANSACTION_CRUD_BASE}?${queryParams}`, getAuthHeader(authToken));
};

export const createTransaction = (
  authToken: string,
  transactionData: CreateUpdateTransactionRequest
): AxiosPromise<TransactionResponse> => {
  return axiosInstance.post(TRANSACTION_CRUD_BASE, transactionData, getAuthHeader(authToken));
};

export const editTransaction = (
  authToken: string,
  transactionId: number,
  transactionData: CreateUpdateTransactionRequest
): AxiosPromise<TransactionResponse> => {
  return axiosInstance.put(
    `${TRANSACTION_CRUD_BASE}/${transactionId}`,
    transactionData,
    getAuthHeader(authToken)
  );
};

export const deleteTransaction = (
  authToken: string,
  transactionId: string | number
): AxiosPromise => {
  return axiosInstance.delete(
    `${TRANSACTION_CRUD_BASE}/${transactionId}`,
    getAuthHeader(authToken)
  );
};

export const getTransactionAmountByMonth = (authToken: string) => {
  return axiosInstance.get(GET_TRANSACTION_TOTAL_BY_MONTH, getAuthHeader(authToken));
};
