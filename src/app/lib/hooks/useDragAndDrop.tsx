import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateProduct, productsInfo } from '../features/productsInfoSlice';
import { reorderRows } from '../features/rowsInfoSlice';

export const useDragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateList = (product: productsInfo, rowId: number): void => {
        dispatch(updateProduct({ productId: product.id, rowId: rowId}));
    };
    const handleReorderRows = (fromRowId: number, toRowId: number): void => {
        // Dispatch an action to reorder rows
        // This function should be implemented in your Redux slice
        dispatch(reorderRows({ fromRowId, toRowId }));
    };
    const handleDragging = (dragging: boolean) => setIsDragging(dragging);

    return {
        isDragging,
        handleUpdateList,
        handleReorderRows,
        handleDragging,
    };
};