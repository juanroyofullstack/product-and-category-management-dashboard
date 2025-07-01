import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectProductsByRow = createSelector(
    [
        (state: RootState) => state.products,
        (_: RootState, rowId: string) => rowId,
    ],
    (products, rowId) => products.filter(product => product.row === rowId),
);

export const selectRows = (state: RootState) => state.rows;