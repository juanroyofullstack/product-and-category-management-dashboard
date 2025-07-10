import React, { useCallback } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { categoriesInfo, setLeft, setCenter, setRight, CategoryStateSelectText } from '../lib/features/categoriesInfoSlice';
import Products from './Products';
import { useDragAndDrop } from '../lib/hooks/useDragAndDrop';
import { selectProductsByCategory } from '../lib/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import CategoryHeader from './ui/CategoryHeader';
import XIconDeletionCategory from './ui/XIconDeletionCategory';
import ProductCard from './ProductCard';

interface CategoryProps {
    category: categoriesInfo;
}

const Category = ({ category }: CategoryProps) => {
    const { handleUpdateList, handleReorderCategories, handleDragging, handleDragEnd, handleUpdateCategories } = useDragAndDrop();
    const products = useAppSelector(state => selectProductsByCategory(state, category.id));
    const dispatch = useAppDispatch();

    const handleChange = useCallback((e: SelectChangeEvent) => {
        const value = e.target.value;
        switch (value) {
            case CategoryStateSelectText.start:
                dispatch(setLeft(category.id));
                break;
            case CategoryStateSelectText.center:
                dispatch(setCenter(category.id));
                break;
            case CategoryStateSelectText.end:
                dispatch(setRight(category.id));
                break;
            default:
                break;
        }
    }, [dispatch, category.id]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const productTransfer = e.dataTransfer.getData('product');
        const categoryTransfer = e.dataTransfer.getData('category');
        if(categoryTransfer && !productTransfer) {
            const categoryTransferParse = JSON.parse(e.dataTransfer.getData('category'));
            handleReorderCategories(categoryTransferParse.id, category.id);
        } 
        if(productTransfer) {
            const product = JSON.parse(e.dataTransfer.getData('product'));
            if(product.category === category.id) {
                handleDragging(false);
                return;
            }
            handleUpdateList(product, category.id);
            handleUpdateCategories(product.category, category.id);
        }
        handleDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
        e.preventDefault();

    const handleDragStartCategories = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('category', JSON.stringify(category));
        handleDragging(true);
    };

    return (
        <div className="Category flex flex-col items-center justify-center w-full h-full gap-4" data-testid="category">
            <div key={category.id} className='flex flex-col justify-around w-full p-4 border rounded-lg'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragStart={handleDragStartCategories} 
                onDragEnd={handleDragEnd}
                onPointerDown={e => e.stopPropagation()}
                draggable
            >
                <XIconDeletionCategory category={category} />
                <CategoryHeader category={category} handleChange={handleChange} />
                <Products  category={category}>
                    {products && products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </Products>
            </div>  
        </div>
    );
};

export default Category;