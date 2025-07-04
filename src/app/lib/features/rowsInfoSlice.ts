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
        title: 'Row 1',
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

const initialState: rowsInfo[] = rowMockData;


export const rowsInfoSlice = createSlice({
    name: 'rowsInfo',
    initialState,
    reducers: {
        addRow: (state, action: PayloadAction<rowsInfo>) => {
            state.push(action.payload);
        },
        increaseRowProductCount: (state, action: PayloadAction<number>) => {
            const player = state.find(
                (row) => row.id === action.payload,
            );
            if(player) {
                player.productsCount += 1;
            }
        },
        removeRow: (state, action: PayloadAction<number>) => {
            return state.filter((row) => row.id !== action.payload);
        },
        decreaseRowProductCount: (state, action: PayloadAction<number | undefined>) => {
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
        reorderRows: (state, action: PayloadAction<{ fromRowId: number, toRowId: number }>) => {
            const { fromRowId, toRowId } = action.payload;
            const fromIndex = state.findIndex(row => row.id === fromRowId);
            const toIndex = state.findIndex(row => row.id === toRowId);
            if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
            const [movedRow] = state.splice(fromIndex, 1);
            state.splice(toIndex, 0, movedRow);
        },
        setLeft: (state, action: PayloadAction<number>) => {
            return state.map((row) =>
                row.id === action.payload ? { ...row, state: RowState.LEFT } : row,
            );
        },
        setCenter: (state, action: PayloadAction<number>) => {
            return state.map((row) =>
                row.id === action.payload ? { ...row, state: RowState.CENTER } : row,
            );
        },
        setRight: (state, action: PayloadAction<number>) => {
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
    reorderRows,
    setLeft,
    setCenter,
    setRight,
} = rowsInfoSlice.actions;

export default rowsInfoSlice.reducer;