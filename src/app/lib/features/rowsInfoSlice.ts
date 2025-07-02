import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum RowState {
    LEFT = 'start',
    CENTER = 'center',
    RIGHT = 'end',
}

const rowMockData: rowsInfo[] = [
    {
        id: '1',
        title: 'Row 1',
        state: RowState.LEFT,
    },  
];

export interface rowsInfo {
    id: string;
    title: string;
    state: RowState;
}

const initialState: rowsInfo[] = rowMockData;


export const rowsInfoSlice = createSlice({
    name: 'rowsInfo',
    initialState,
    reducers: {
        addRow: (state, action: PayloadAction<rowsInfo>) => {
            state.push(action.payload);
        },
        removeRow: (state, action: PayloadAction<string>) => {
            const index = state.findIndex((row) => row.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        updateRow: (state, action: PayloadAction<rowsInfo>) => {
            state.map((row) =>
                row.id === action.payload.id ? action.payload : row,
            );
        },
        setLeft: (state, action: PayloadAction<string>) => {
            state.map((row) =>
                row.id === action.payload ? { ...row, state: RowState.LEFT } : row,
            );
        },
        setCenter: (state, action: PayloadAction<string>) => {
            state.map((row) =>
                row.id === action.payload ? { ...row, state: RowState.CENTER } : row,
            );
        },
        setRight: (state, action: PayloadAction<string>) => {
            state.map((row) =>
                row.id === action.payload ? { ...row, state: RowState.RIGHT } : row,
            );
        },
    },
});

export const {
    addRow,
    removeRow,
    updateRow,
    setLeft,
    setCenter,
    setRight,
} = rowsInfoSlice.actions;

export default rowsInfoSlice.reducer;