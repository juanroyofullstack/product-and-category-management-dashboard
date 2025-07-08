import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import productsInfoSlice from './features/productsInfoSlice';
import rowsInfoSlice from './features/rowsInfoSlice';
import dataFetch from './features/dataFetchSlice';

import { getDashboardData } from './api';

export const store = configureStore({
    reducer: {
        products: productsInfoSlice,
        rows: rowsInfoSlice,
        dataFetch: dataFetch,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: getDashboardData,
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
