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

export const DeletionTrigger: React.FC<DeletionTriggerProps> = ({
    onDelete,
    isProductTrigger = false,
    showDeleteButton = false,
    onToggleDeleteButton,
}) => {
    if (isProductTrigger) {
        return (
            <div className="flex flex-col">
                <MoreHorizIcon 
                    className="self-end" 
                    onClick={onToggleDeleteButton} 
                />
                {showDeleteButton && (
                    <Button 
                        variant="contained"
                        className="self-end w-min absolute top-7 right-0 z-10"
                        onClick={onDelete}
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
        />
    );
};
