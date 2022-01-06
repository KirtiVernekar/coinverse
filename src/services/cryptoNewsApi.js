import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_RAPIDAPI_KEY, REACT_APP_NEWS_RAPIDAPI_HOST, REACT_APP_NEWS_API_URL } from './apiKeys';

const cryptoNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-key': REACT_APP_RAPIDAPI_KEY,
  'x-rapidapi-host': REACT_APP_NEWS_RAPIDAPI_HOST,
};
const baseUrl = REACT_APP_NEWS_API_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;