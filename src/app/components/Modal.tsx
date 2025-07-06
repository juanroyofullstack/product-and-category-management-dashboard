import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { removeAllProductsAsociatedToRow, removeProduct } from '../lib/features/productsInfoSlice';
import type { productsInfo } from '../lib/features/productsInfoSlice';
import { removeRow, decreaseRowProductCount } from '../lib/features/rowsInfoSlice';
import './Modal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

export default function DeletionModal({ rowId, product, isProduct, isRow }: { rowId?: number, product?: productsInfo }) {
    const [open, setOpen] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const productsCount = useAppSelector(state => state.rows.find(row => row.id === rowId)?.productsCount);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleOpen();
        setShowButton(false);
    };
    
    return (
        <div className="Modal relative">
            {!product &&
                <CloseIcon 
                    className="cursor-pointer text-grey-700 hover:text-red-700"
                    onClick={handleOpen}
                />
            }
            <div className="flex flex-col">
                {!rowId && 
                    <MoreHorizIcon className="self-end" onClick={() => {setShowButton(!showButton);}} />
                }
                {!rowId && showButton &&
                <Button 
                    variant="contained"
                    className="self-end w-min absolute top-7 right-0 z-10"
                    onClick={handleChange}
                >
                     Delete
                </Button>
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-2xl p-4">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-black pb-2">
                        {rowId && `You\'re about to delete a row${productsCount && productsCount > 0 ? ', all cards within it will be deleted as well.' : ''}`}
                        {product && 'You\'re about to delete a product, this action cannot be undone.'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black pb-2">
                        Are you sure you want to proceed?
                    </Typography>
                    <div className="flex justify-center gap-4 text-black pb-2 pt-2">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                if(rowId && !product) {
                                    dispatch(removeRow(rowId)); 
                                    dispatch(removeAllProductsAsociatedToRow(rowId));
                                }
                                if(product && !rowId) {
                                    dispatch(removeProduct(product.id));
                                    dispatch(decreaseRowProductCount(product.row));
                                }
                            } 
                            }
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}