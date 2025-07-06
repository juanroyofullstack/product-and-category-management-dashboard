import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateProduct, productsInfo } from '../features/productsInfoSlice';
import { reorderRows, increaseRowProductCount, decreaseRowProductCount } from '../features/rowsInfoSlice';

export const useDragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateList = (product: productsInfo, rowId: number): void => {
        dispatch(updateProduct({ productId: product.id, rowId: rowId}));
    };
    const handleReorderRows = (fromRowId: number, toRowId: number): void => {
        dispatch(reorderRows({ fromRowId, toRowId }));
    };
    const handleUpdateRows = (productRowId: number, rowId: number): void => {
        dispatch(increaseRowProductCount(rowId));
        dispatch(decreaseRowProductCount(productRowId));
    };
    const handleDragging = (dragging: boolean) => setIsDragging(dragging);
    const handleDragEnd = () => handleDragging(false);

    return {
        isDragging,
        handleUpdateList,
        handleReorderRows,
        handleUpdateRows,
        handleDragging,
        handleDragEnd,
    };
};