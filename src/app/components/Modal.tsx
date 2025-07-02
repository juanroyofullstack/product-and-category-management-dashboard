import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useAppDispatch } from '../lib/hooks';
import { removeRow } from '../lib/features/rowsInfoSlice';
import { removeAllProductsAsociatedToRow } from '../lib/features/productsInfoSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeletionModal({ rowId }: {rowId: string}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    return (
        <div>
            <CloseIcon 
                className="cursor-pointer text-grey-700 hover:text-red-700"
                onClick={handleOpen}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        You're about to delete a row, all cards within it will be deleted as well.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to proceed?
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            dispatch(removeRow(rowId)); 
                            dispatch(removeAllProductsAsociatedToRow(rowId));
                        } }
                    >
                        DELETE
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}