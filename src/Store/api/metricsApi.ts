// src/services/metricsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://innolan.ru/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const metricsApi = createApi({
  reducerPath: 'metricsApi',
  baseQuery,
  endpoints: (builder) => ({
    addMetric: builder.mutation({
      query: (metric) => ({
        url: '/metric/',
        method: 'POST',
        body: metric,
      }),
    }),
    updateMetric: builder.mutation({
      query: (metric) => ({
        url: '/metric/',
        method: 'PUT',
        body: metric,
      }),
    }),
  }),
});

export const { useAddMetricMutation, useUpdateMetricMutation } = metricsApi;
