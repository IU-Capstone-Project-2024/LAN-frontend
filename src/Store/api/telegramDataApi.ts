import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const telegramApi = createApi({
  reducerPath: 'telegramApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://innolan.ru/api/auth/signin' }),
  endpoints: (builder) => ({
    sendTelegramData: builder.mutation({
      query: (data) => ({
        url: 'telegram',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSendTelegramDataMutation } = telegramApi;
