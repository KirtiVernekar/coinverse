import { configureStore } from '@reduxjs/toolkit';

import { cryptoCoinApi } from '../services/cryptoCoinApi';
//import { cryptoNewsApi } from '../services/cryptoNewsApi';

export default configureStore({
  reducer: {
    [cryptoCoinApi.reducerPath]: cryptoCoinApi.reducer,
    //[cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});