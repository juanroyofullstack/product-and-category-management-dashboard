import { configureStore } from '@reduxjs/toolkit';
import categoriesInfoSlice from './features/categoriesInfoSlice';
import dataFetch from './features/dataFetchSlice';
import productsInfoSlice from './features/productsInfoSlice';
import { getDashboardData } from './api';

export const store = configureStore({
    reducer: {
        products: productsInfoSlice,
        categories: categoriesInfoSlice,
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
