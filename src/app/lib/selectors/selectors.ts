import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectProductsByRow = createSelector(
    [
        (state: RootState) => state.products,
        (_: RootState, rowId: number) => rowId,
    ],
    (products, rowId) => products.filter(product => product.row === rowId),
);

export const selectRows = (state: RootState) => state.rows;

export const selectDataIsFetchedWithoutErrors = (state: RootState) => state.dataFetch.loaded && !state.dataFetch.error;

export const selectDataIsLoading = (state: RootState) => state.dataFetch.loading;

export const selectDataIsLoadedWithErrors = (state: RootState) => state.dataFetch.loaded && state.dataFetch.error;