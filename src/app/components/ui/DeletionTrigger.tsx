import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';

interface DeletionTriggerProps {
    onDelete: () => void;
    isProductTrigger?: boolean;
    showDeleteButton?: boolean;
    onToggleDeleteButton?: () => void;
}

const DeletionTrigger = ({
    onDelete,
    isProductTrigger = false,
    showDeleteButton = false,
    onToggleDeleteButton,
}: DeletionTriggerProps) => {
    if (isProductTrigger) {
        return (
            <div className="flex flex-col absolute right-0 top-0 z-10" data-testid="deletion-trigger-product">
                <MoreHorizIcon 
                    className="self-end" 
                    onClick={onToggleDeleteButton} 
                    data-testid="show-delete-button"
                />
                {showDeleteButton && (
                    <Button 
                        variant="contained"
                        className="self-end w-min"
                        onClick={onDelete}
                        data-testid="delete-product"
                    >
                        Delete
                    </Button>
                )}
            </div>
        );
    }

    return (
        <CloseIcon 
            className="cursor-pointer text-grey-700 hover:text-red-700"
            onClick={onDelete}
            data-testid="deletion-trigger-category"
        />
    );
};

export default DeletionTrigger;