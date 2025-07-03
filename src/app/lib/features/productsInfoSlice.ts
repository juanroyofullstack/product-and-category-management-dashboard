import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const productsMockData = [
    {
        id: '1',
        title: 'Product 1', 
        description: 'Description for Product 1',
        image: 'https://via.placeholder.com/150',
        price: 19.99,
        row: '1',
    },
];

export interface productsInfo {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    row: string;
}

const initialState: productsInfo[] = productsMockData;

export const productsInfoSlice = createSlice({
    name: 'productsInfo',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<productsInfo>) => {
            state.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            return state.filter((product) => product.id !== action.payload);
        },
        removeAllProductsAsociatedToRow: (state, action: PayloadAction<string>) => {
            state.filter((product) => product.row !==  action.payload);
        },
        updateProduct: (state, action: PayloadAction<productsInfo>) => {
            const index = state.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
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