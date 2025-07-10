import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateProduct, productsInfo } from '../features/productsInfoSlice';
import { reorderCategory, increaseCategoryProductCount, decreaseCategoryProductCount } from '../features/categoriesInfoSlice';

export const useDragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateList = (product: productsInfo, categoryId: number): void => {
        dispatch(updateProduct({ productId: product.id, categoryId: categoryId}));
    };
    const handleReorderCategories = (fromCategoryId: number, toCategoryId: number): void => {
        dispatch(reorderCategory({ fromCategoryId, toCategoryId }));
    };
    const handleUpdateCategories  = (productCategoryId: number, categoryId: number): void => {
        dispatch(increaseCategoryProductCount(categoryId));
        dispatch(decreaseCategoryProductCount(productCategoryId));
    };
    const handleDragging = (dragging: boolean) => setIsDragging(dragging);
    const handleDragEnd = () => handleDragging(false);

    return {
        isDragging,
        handleUpdateList,
        handleReorderCategories,
        handleUpdateCategories,
        handleDragging,
        handleDragEnd,
    };
};