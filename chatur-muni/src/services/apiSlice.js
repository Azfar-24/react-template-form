import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "./axiosInstance";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: process.env.REACT_APP_API_URL }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data }; // Modify this based on your response structure
    } catch (axiosError) {
      const err = axiosError;
      if (err.response?.status === 401) {
        // Handle unauthorized errors (e.g., token refresh or redirect to login)
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "get",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com", // Use the dummy API base URL
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ params }) => ({
        url: `/posts`,
        method: "GET",
        params: params,
      }),
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: `/posts`,
        method: "POST",
        data: postData,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = apiSlice;
export const Api = apiSlice;
