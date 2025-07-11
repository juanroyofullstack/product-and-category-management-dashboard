import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { removeAllProductsAsociatedToCategory, removeProduct } from '../lib/features/productsInfoSlice';
import type { productsInfo } from '../lib/features/productsInfoSlice';
import { removeCategory, decreaseCategoryProductCount } from '../lib/features/categoriesInfoSlice';
import DeletionTrigger from './ui/DeletionTrigger';
import UiModal from './ui/UiModal';

export interface ModalProps {
    categoryId?: number;
    product?: productsInfo;
    isProduct?: boolean;
    isCategory?: boolean;
}

export const DeletionModal = ({ 
    categoryId, 
    product, 
}: ModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    
    const productsCount = useAppSelector(state => 
        state.categories.find(category => category.id === categoryId)?.productsCount,
    );
    
    const dispatch = useAppDispatch();

    const getConfirmationMessage = () => {
        if (categoryId && !product) {
            const hasProducts = productsCount && productsCount > 0;
            return `You're about to delete a category${hasProducts ? ', all cards within it will be deleted as well.' : ''}`;
        }
        if (product && !categoryId) {
            return 'You\'re about to delete a product, this action cannot be undone.';
        }
        return '';
    };

    const handleDelete = () => {
        setIsModalOpen(true);
        setShowDeleteButton(false);
    };

    const handleToggleDeleteButton = () => {
        setShowDeleteButton(!showDeleteButton);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDeletion = () => {
        if (categoryId && !product) {
            dispatch(removeCategory(categoryId));
            dispatch(removeAllProductsAsociatedToCategory(categoryId));
        } else if (product && !categoryId) {
            dispatch(removeProduct(product.id));
            dispatch(decreaseCategoryProductCount(product.category));
        }
        handleCloseModal();
    };

    return (
        <div className="Modal relative">
            <DeletionTrigger
                onDelete={handleDelete}
                isProductTrigger={!categoryId}
                showDeleteButton={showDeleteButton}
                onToggleDeleteButton={handleToggleDeleteButton}
            />
            <UiModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDeletion}
                title={getConfirmationMessage()}
                description="Are you sure you want to proceed?"
            />
        </div>
    );
};

export default DeletionModal;
