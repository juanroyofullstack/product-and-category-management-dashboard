import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateProduct, productsInfo } from '../features/productsInfoSlice';

export const useDragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateList = (product: productsInfo, rowId: number): void => {
        dispatch(updateProduct({ productId: product.id, rowId: rowId}));
    };

    const handleDragging = (dragging: boolean) => setIsDragging(dragging);

    return {
        isDragging,
        handleUpdateList,
        handleDragging,
    };
};