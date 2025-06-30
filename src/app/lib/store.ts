import { configureStore } from '@reduxjs/toolkit';
import productsInfoSlice from './features/productsInfoSlice';
import rowsInfoSlice from './features/rowsInfoSlice';

export const store = configureStore({
    reducer: {
        products: productsInfoSlice,
        rows: rowsInfoSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch