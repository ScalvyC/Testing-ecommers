import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../constants/types";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
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
  }),
});

export const { useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetProductsByCategoryQuery
 } = dummyJsonApi;