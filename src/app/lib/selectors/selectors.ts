import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectProductsByCategory = createSelector(
    [
        (state: RootState) => state.products,
        (_: RootState, categoryId: number) => categoryId,
    ],
    (products, categoryId) => products.filter(product => product.category === categoryId),
);

export const selectCategory = (state: RootState) => state.categories;

export const selectDataIsFetchedWithoutErrors = (state: RootState) => state.dataFetch.loaded && !state.dataFetch.error;

export const selectDataIsLoading = (state: RootState) => state.dataFetch.loading;

export const selectDataIsLoadedWithErrors = (state: RootState) => state.dataFetch.loaded && state.dataFetch.error;