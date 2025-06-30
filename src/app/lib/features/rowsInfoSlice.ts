import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum RowState {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
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
        removeRow: (state, action: PayloadAction<rowsInfo>) => {
            const rowToRemove =  state.find((row) => row.id === action.payload.id);
            if (rowToRemove) {
                state = state.filter((row) => row.id !== rowToRemove.id);
            }
        },
        updateRow: (state, action: PayloadAction<rowsInfo>) => {
            state = state.map((row) =>
                row.id === action.payload.id ? action.payload : row,
            );
        },
        setLeft: (state, action: PayloadAction<rowsInfo>) => {
            state = state.map((row) =>
                row.id === action.payload.id ? { ...row, state: RowState.LEFT } : row,
            );
        },
        setCenter: (state, action: PayloadAction<rowsInfo>) => {
            state = state.map((row) =>
                row.id === action.payload.id ? { ...row, state: RowState.CENTER } : row,
            );
        },
        setRight: (state, action: PayloadAction<rowsInfo>) => {
            state = state.map((row) =>
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