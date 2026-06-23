import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../constants/types";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type LoginRequest = {
  username: string;
  password: string;
  expiresInMins: number;
};

type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
    credentials: "include",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<Product[], number>({
      query: (limit) => `products?limit=${limit}`,
      transformResponse: (response: ProductsResponse) => response.products,
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),

    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (category) => `products/category/${category}`,
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginDetails) => ({
        url: "auth/login",
        method: "POST",
        body: loginDetails,
      }),
    }),

    getCurrentAuthUser: builder.query<AuthUser, void>({
      query: () => "auth/me",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetProductsByCategoryQuery,
  useLoginMutation,
  useGetCurrentAuthUserQuery,
} = dummyJsonApi;