import { AxiosPromise } from 'axios';
import axiosInstance from './custom-axios';
import getAuthHeader from './utils';
import { Category } from '../models/category-types';

const CATEGORY_CRUD_BASE = '/category';

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
  return axiosInstance.get(`${CATEGORY_CRUD_BASE}?${queryParams}`, getAuthHeader(authToken));
};

export const createCategory = (authToken: string, categoryData: CreateCategoryRequest) => {
  return axiosInstance.post(CATEGORY_CRUD_BASE, categoryData, getAuthHeader(authToken));
};

export const deleteCategory = (authToken: string, categoryId: number) => {
  return axiosInstance.delete(`${CATEGORY_CRUD_BASE}/${categoryId}`, getAuthHeader(authToken));
};
