import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface productsInfo {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category: number;
}

const initialState: productsInfo[] = [];

export const productsInfoSlice = createSlice({
    name: 'productsInfo',
    initialState,
    reducers: {
        addProductsOnFetch: (state, action: PayloadAction<productsInfo[]>) => {
            return state = action.payload;
        },
        addProduct: (state, action: PayloadAction<productsInfo>) => {
            state.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            return state.filter((product) => product.id !== action.payload);
        },
        removeAllProductsAsociatedToCategory: (state, action: PayloadAction<number>) => {
            return state.filter((product) => product.category !==  action.payload);
        },
        updateProduct: (state, action: PayloadAction<{ productId: number; categoryId: number; }>) => {
            const index = state.findIndex(product => product.id === action.payload.productId);
            if (index !== -1) {
                state[index].category = action.payload.categoryId;
            }
        },
    },
});

export const {
    addProductsOnFetch,
    addProduct,
    removeProduct,
    removeAllProductsAsociatedToCategory,
    updateProduct,
} = productsInfoSlice.actions;

export default productsInfoSlice.reducer;