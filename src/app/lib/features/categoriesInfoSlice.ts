import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum CategoryState {
    LEFT = 'start',
    CENTER = 'center',
    RIGHT = 'end',
}

export enum CategoryStateSelectText {
    start = 'Left',
    center = 'Center',
    end = 'End',
}

export interface categoriesInfo {
    id: number;
    title: string;
    state: CategoryState;
    productsCount: number;
}

const initialState: categoriesInfo[] = [];

export const categoriesInfoSlice = createSlice({
    name: 'categoriesInfo',
    initialState,
    reducers: {
        addCategoriesOnFetch: (state, action: PayloadAction<categoriesInfo[]>) => {
            return state = action.payload;
        },
        addCategory: (state, action: PayloadAction<categoriesInfo>) => {
            state.push(action.payload);
        },
        increaseCategoryProductCount: (state, action: PayloadAction<number>) => {
            const category = state.find(
                (category) => category.id === action.payload,
            );
            if(category) {
                category.productsCount += 1;
            }
        },
        removeCategory: (state, action: PayloadAction<number>) => {
            return state.filter((category) => category.id !== action.payload);
        },
        decreaseCategoryProductCount: (state, action: PayloadAction<number | undefined>) => {
            const category = state.find(
                (category) => category.id === action.payload,
            );
            if(category) {
                category.productsCount -= 1;
            }
        },
        updateCategory: (state, action: PayloadAction<categoriesInfo>) => {
            return state.map((category) =>
                category.id === action.payload.id ? action.payload : category,
            );
        },
        reorderCategory: (state, action: PayloadAction<{ fromCategoryId: number, toCategoryId: number }>) => {
            const { fromCategoryId, toCategoryId } = action.payload;
            const fromIndex = state.findIndex(category => category.id === fromCategoryId);
            const toIndex = state.findIndex(category => category.id === toCategoryId);
            if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
            const [movedCategory] = state.splice(fromIndex, 1);
            state.splice(toIndex, 0, movedCategory);
        },
        setLeft: (state, action: PayloadAction<number>) => {
            return state.map((category) =>
                category.id === action.payload ? { ...category, state: CategoryState.LEFT } : category,
            );
        },
        setCenter: (state, action: PayloadAction<number>) => {
            return state.map((category) =>
                category.id === action.payload ? { ...category, state: CategoryState.CENTER } : category,
            );
        },
        setRight: (state, action: PayloadAction<number>) => {
            return state.map((category) =>
                category.id === action.payload ? { ...category, state: CategoryState.RIGHT } : category,
            );
        },
    },
});

export const {
    addCategoriesOnFetch,
    addCategory,
    increaseCategoryProductCount,
    removeCategory,
    decreaseCategoryProductCount,
    updateCategory,
    reorderCategory,
    setLeft,
    setCenter,
    setRight,
} = categoriesInfoSlice.actions;

export default categoriesInfoSlice.reducer;