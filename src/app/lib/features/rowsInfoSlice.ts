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
        id: '1',
        title: 'Row 1',
        state: RowState.LEFT,
        productsCount: 1,
    },  
];

export interface rowsInfo {
    id: string;
    title: string;
    state: RowState;
    productsCount: number;
}

const initialState: rowsInfo[] = rowMockData;


export const rowsInfoSlice = createSlice({
    name: 'rowsInfo',
    initialState,
    reducers: {
        addRow: (state, action: PayloadAction<rowsInfo>) => {
            state.push(action.payload);
        },
        increaseRowProductCount: (state, action: PayloadAction<string>) => {
            const player = state.find(
                (row) => row.id === action.payload,
            );
            if(player) {
                player.productsCount += 1;
            }
        },
        removeRow: (state, action: PayloadAction<string>) => {
            return state.filter((row) => row.id !== action.payload);
        },
        decreaseRowProductCount: (state, action: PayloadAction<string | undefined>) => {
            const row = state.find(
                (row) => row.id === action.payload,
            );
            if(row) {
                row.productsCount -= 1;
            }
        },
        updateRow: (state, action: PayloadAction<rowsInfo>) => {
            return state.map((row) =>
                row.id === action.payload.id ? action.payload : row,
            );
        },
        setLeft: (state, action: PayloadAction<string>) => {
            return state.map((row) =>
                row.id === action.payload ? { ...row, state: RowState.LEFT } : row,
            );
        },
        setCenter: (state, action: PayloadAction<string>) => {
            return state.map((row) =>
                row.id === action.payload ? { ...row, state: RowState.CENTER } : row,
            );
        },
        setRight: (state, action: PayloadAction<string>) => {
            return state.map((row) =>
                row.id === action.payload ? { ...row, state: RowState.RIGHT } : row,
            );
        },
    },
});

export const {
    addRow,
    increaseRowProductCount,
    removeRow,
    decreaseRowProductCount,
    updateRow,
    setLeft,
    setCenter,
    setRight,
} = rowsInfoSlice.actions;

export default rowsInfoSlice.reducer;