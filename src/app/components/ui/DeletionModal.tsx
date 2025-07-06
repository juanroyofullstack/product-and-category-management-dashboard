import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

export interface DeletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

export const DeletionModal: React.FC<DeletionModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-2xl p-4">
                <Typography id="modal-modal-title" variant="h6" component="h2" className="text-black pb-2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black pb-2">
                    {description}
                </Typography>
                <div className="flex justify-center gap-4 text-black pb-2 pt-2">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};
