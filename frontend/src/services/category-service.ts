import { AxiosPromise } from 'axios';
import axiosInstance from './custom-axios';
import getAuthHeader from './utils';
import { Category } from '../models/category-types';

const CATEGORY_BASE_PATH = '/categories/';

type AllCategoriesResponse = {
  categories: Array<Category>;
};

type CreateCategoryRequest = {
  name: string;
};

export const getAllCategories = (
  authToken: string,
  queryParams: string = ''
): AxiosPromise<AllCategoriesResponse> | AxiosPromise => {
  return axiosInstance.get(`${CATEGORY_BASE_PATH}?${queryParams}`, getAuthHeader(authToken));
};

export const createCategory = (authToken: string, categoryData: CreateCategoryRequest) => {
  return axiosInstance.post(CATEGORY_BASE_PATH, categoryData, getAuthHeader(authToken));
};

export const deleteCategory = (authToken: string, categoryId: number) => {
  return axiosInstance.delete(`${CATEGORY_BASE_PATH}${categoryId}`, getAuthHeader(authToken));
};
