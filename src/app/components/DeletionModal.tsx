import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { removeAllProductsAsociatedToRow, removeProduct } from '../lib/features/productsInfoSlice';
import type { productsInfo } from '../lib/features/productsInfoSlice';
import { removeRow, decreaseRowProductCount } from '../lib/features/rowsInfoSlice';
import DeletionTrigger from './ui/DeletionTrigger';
import UiModal from './ui/UiModal';

export interface ModalProps {
    rowId?: number;
    product?: productsInfo;
    isProduct?: boolean;
    isRow?: boolean;
}

export interface DeletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

export const DeletionModal = ({ 
    rowId, 
    product, 
}: ModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    
    const productsCount = useAppSelector(state => 
        state.categories.find(category => category.id === rowId)?.productsCount,
    );
    
    const dispatch = useAppDispatch();

    const getConfirmationMessage = () => {
        if (rowId && !product) {
            const hasProducts = productsCount && productsCount > 0;
            return `You're about to delete a category${hasProducts ? ', all cards within it will be deleted as well.' : ''}`;
        }
        if (product && !rowId) {
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
        if (rowId && !product) {
            dispatch(removeRow(rowId));
            dispatch(removeAllProductsAsociatedToRow(rowId));
        } else if (product && !rowId) {
            dispatch(removeProduct(product.id));
            dispatch(decreaseRowProductCount(product.category));
        }
        handleCloseModal();
    };

    return (
        <div className="Modal relative">
            <DeletionTrigger
                onDelete={handleDelete}
                isProductTrigger={!rowId}
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
