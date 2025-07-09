import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const productsMockData = [
    {
        id: 1,
        title: 'Product 1', 
        description: 'Description for Product 1',
        image: 'https://via.placeholder.com/150',
        price: 19.99,
        category: 1,
    },
];

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
        removeAllProductsAsociatedToRow: (state, action: PayloadAction<number>) => {
            return state.filter((product) => product.category !==  action.payload);
        },
        updateProduct: (state, action: PayloadAction<{ productId: number; rowId: number; }>) => {
            const index = state.findIndex(product => product.id === action.payload.productId);
            if (index !== -1) {
                state[index].category = action.payload.rowId;
            }
        },
    },
});

export const {
    addProductsOnFetch,
    addProduct,
    removeProduct,
    removeAllProductsAsociatedToRow,
    updateProduct,
} = productsInfoSlice.actions;

export default productsInfoSlice.reducer;