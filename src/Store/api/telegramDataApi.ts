import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {RootState} from "@/Store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://innolan.ru/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getToken: builder.mutation({
      query: (credentials) => ({
        url: '/auth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(credentials),
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useGetTokenMutation } = authApi;
