import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface productsInfo {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    row: string;
}

interface productsInfoState {
    products: productsInfo[];
}

const initialState: productsInfoState = {
    products: [],
};

export const productsInfoSlice = createSlice({
    name: 'productsInfo',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<productsInfo>) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<productsInfo>) => {
            const productToRemove =  state.products.find((product) => product.id === action.payload.id);
            if (productToRemove) {
                state.products = state.products.filter((product) => product.id !== productToRemove.id);
            }
        },
        updateProduct: (state, action: PayloadAction<productsInfo>) => {
            state.products = state.products.map((product) =>
                product.id === action.payload.id ? action.payload : product,
            );
        },
    },
});

export const {
    addProduct,
    removeProduct,
    updateProduct,
} = productsInfoSlice.actions;

export default productsInfoSlice.reducer;