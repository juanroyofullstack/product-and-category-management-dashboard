import { RootState } from '../store';

export const selectProducts = (state: RootState) => state.products;

export const selectRows = (state: RootState) => state.rows;
