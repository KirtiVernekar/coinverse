import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const cryptoCoinApiHeaders = {
//   'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
//   'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
// };

const cryptoCoinApiHeaders = {
  'x-rapidapi-key': 'aca5e9a749msh0a659f3e7fbe313p17716ajsn7d9ff7907a41',
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoCoinApiHeaders });

export const cryptoCoinApi = createApi({
  reducerPath: 'cryptoCoinApi',
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CRYPTO_API_URL }),
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
      // query: () => createRequest(`/coins`),     //to fetch all coins
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetExchangesQuery, useGetCryptoHistoryQuery } = cryptoCoinApi;