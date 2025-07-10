import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addProductsOnFetch } from './productsInfoSlice';
import { addCategoriesOnFetch } from './categoriesInfoSlice';
import { getDashboardData } from '../api';

interface DataState {
    loading: boolean;
    loaded: boolean;
    error: string | null;
}

const initialState: DataState = {
    loading: false,
    loaded: true,
    error: null,
};

export const fetchData = createAsyncThunk<any>(
    'dataFetch/fetchData',
    async (_, { dispatch }) => {
        try {
            const response = await getDashboardData();
            if (response.status !== 'success') throw new Error('Network response was not ok');
            const data = await response.data;

            dispatch(addProductsOnFetch(data.products));
            dispatch(addCategoriesOnFetch(data.categories));

            return data;
        } catch (error: any) {
            return error.message;
        }
    },
);

const dataFetchSlice = createSlice({
    name: 'dataFetch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.loaded = false;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.loaded = true;
                state.error = null;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.loaded = true;
                state.error = action.payload as string;
            });
    },
});

export default dataFetchSlice.reducer;