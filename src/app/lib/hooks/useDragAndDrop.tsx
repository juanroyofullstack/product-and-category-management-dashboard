import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateProduct, productsInfo } from '../features/productsInfoSlice';

export const useDragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateList = (product: productsInfo, rowId: string): void => {
        dispatch(updateProduct({...product, row: rowId}));
    };

    const handleDragging = (dragging: boolean) => setIsDragging(dragging);

    return {
        isDragging,
        handleUpdateList,
        handleDragging,
    };
};