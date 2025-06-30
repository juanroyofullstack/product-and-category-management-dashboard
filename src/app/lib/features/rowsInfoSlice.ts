import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum RowState {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

export interface rowsInfo {
    id: string;
    title: string;
    state: RowState;
}

interface rowsInfoState {
    rows: rowsInfo[];
}

const initialState: rowsInfoState = {
    rows: [],
};

export const rowsInfoSlice = createSlice({
    name: 'rowsInfo',
    initialState,
    reducers: {
        addRow: (state, action: PayloadAction<rowsInfo>) => {
            state.rows.push(action.payload);
        },
        removeRow: (state, action: PayloadAction<rowsInfo>) => {
            const rowToRemove =  state.rows.find((row) => row.id === action.payload.id);
            if (rowToRemove) {
                state.rows = state.rows.filter((row) => row.id !== rowToRemove.id);
            }
        },
        updateRow: (state, action: PayloadAction<rowsInfo>) => {
            state.rows = state.rows.map((row) =>
                row.id === action.payload.id ? action.payload : row,
            );
        },
        setLeft: (state, action: PayloadAction<rowsInfo>) => {
            state.rows = state.rows.map((row) =>
                row.id === action.payload.id ? { ...row, state: RowState.LEFT } : row,
            );
        },
        setCenter: (state, action: PayloadAction<rowsInfo>) => {
            state.rows = state.rows.map((row) =>
                row.id === action.payload.id ? { ...row, state: RowState.CENTER } : row,
            );
        },
        setRight: (state, action: PayloadAction<rowsInfo>) => {
            state.rows = state.rows.map((row) =>
                row.id === action.payload.id ? { ...row, state: RowState.RIGHT } : row,
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