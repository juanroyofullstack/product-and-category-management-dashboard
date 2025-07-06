import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const productsMockData = [
    {
        id: 1,
        title: 'Product 1', 
        description: 'Description for Product 1',
        image: 'https://via.placeholder.com/150',
        price: 19.99,
        row: 1,
    },
];

export interface productsInfo {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    row: number;
}

const initialState: productsInfo[] = productsMockData;

export const productsInfoSlice = createSlice({
    name: 'productsInfo',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<productsInfo>) => {
            state.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            return state.filter((product) => product.id !== action.payload);
        },
        removeAllProductsAsociatedToRow: (state, action: PayloadAction<number>) => {
            return state.filter((product) => product.row !==  action.payload);
        },
        updateProduct: (state, action: PayloadAction<{ productId: number; rowId: number; }>) => {
            const index = state.findIndex(product => product.id === action.payload.productId);
            if (index !== -1) {
                state[index].row = action.payload.rowId;
            }
        },
    },
});

export const {
    addProduct,
    removeProduct,
    removeAllProductsAsociatedToRow,
    updateProduct,
} = productsInfoSlice.actions;

export default productsInfoSlice.reducer;