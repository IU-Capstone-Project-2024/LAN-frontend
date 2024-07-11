import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

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

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (user) => ({
        url: '/user/me',
        method: 'GET',
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (userData) => ({
        url: '/user/me',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = profileApi;
