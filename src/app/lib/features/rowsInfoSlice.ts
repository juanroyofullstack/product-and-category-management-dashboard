import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum RowState {
    LEFT = 'start',
    CENTER = 'center',
    RIGHT = 'end',
}

export enum RowStateSelectText {
    start = 'Left',
    center = 'Center',
    end = 'End',
}
const rowMockData: rowsInfo[] = [
    {
        id: 1,
        title: 'Category 1',
        state: RowState.LEFT,
        productsCount: 1,
    },  
];

export interface rowsInfo {
    id: number;
    title: string;
    state: RowState;
    productsCount: number;
}

const initialState: rowsInfo[] = [];


export const rowsInfoSlice = createSlice({
    name: 'rowsInfo',
    initialState,
    reducers: {
        addRowsOnFetch: (state, action: PayloadAction<rowsInfo[]>) => {
            return state = action.payload;
        },
        addRow: (state, action: PayloadAction<rowsInfo>) => {
            state.push(action.payload);
        },
        increaseRowProductCount: (state, action: PayloadAction<number>) => {
            const category = state.find(
                (category) => category.id === action.payload,
            );
            if(category) {
                category.productsCount += 1;
            }
        },
        removeRow: (state, action: PayloadAction<number>) => {
            return state.filter((category) => category.id !== action.payload);
        },
        decreaseRowProductCount: (state, action: PayloadAction<number | undefined>) => {
            const category = state.find(
                (category) => category.id === action.payload,
            );
            if(category) {
                category.productsCount -= 1;
            }
        },
        updateRow: (state, action: PayloadAction<rowsInfo>) => {
            return state.map((category) =>
                category.id === action.payload.id ? action.payload : category,
            );
        },
        reorderRows: (state, action: PayloadAction<{ fromRowId: number, toRowId: number }>) => {
            const { fromRowId, toRowId } = action.payload;
            const fromIndex = state.findIndex(category => category.id === fromRowId);
            const toIndex = state.findIndex(category => category.id === toRowId);
            if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
            const [movedRow] = state.splice(fromIndex, 1);
            state.splice(toIndex, 0, movedRow);
        },
        setLeft: (state, action: PayloadAction<number>) => {
            return state.map((category) =>
                category.id === action.payload ? { ...category, state: RowState.LEFT } : category,
            );
        },
        setCenter: (state, action: PayloadAction<number>) => {
            return state.map((category) =>
                category.id === action.payload ? { ...category, state: RowState.CENTER } : category,
            );
        },
        setRight: (state, action: PayloadAction<number>) => {
            return state.map((category) =>
                category.id === action.payload ? { ...category, state: RowState.RIGHT } : category,
            );
        },
    },
});

export const {
    addRowsOnFetch,
    addRow,
    increaseRowProductCount,
    removeRow,
    decreaseRowProductCount,
    updateRow,
    reorderRows,
    setLeft,
    setCenter,
    setRight,
} = rowsInfoSlice.actions;

export default rowsInfoSlice.reducer;