import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_RAPIDAPI_KEY, REACT_APP_CRYPTO_RAPIDAPI_HOST, REACT_APP_CRYPTO_API_URL } from './apiKeys';

const cryptoCoinApiHeaders = {
  'x-rapidapi-key': REACT_APP_RAPIDAPI_KEY,
  'x-rapidapi-host': REACT_APP_CRYPTO_RAPIDAPI_HOST,
};
const baseUrl = REACT_APP_CRYPTO_API_URL;

const createRequest = (url) => ({ url, headers: cryptoCoinApiHeaders });

export const cryptoCoinApi = createApi({
  reducerPath: 'cryptoCoinApi',
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