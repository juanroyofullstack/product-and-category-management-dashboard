import React, { useState } from 'react';
import { Box, Button, MenuItem, Modal, Select, SelectChangeEvent, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { removeAllProductsAsociatedToRow, removeProduct } from '../lib/features/productsInfoSlice';
import type { productsInfo } from '../lib/features/productsInfoSlice';
import { removeRow, decreaseRowProductCount } from '../lib/features/rowsInfoSlice';

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

export default function DeletionModal({ rowId, product }: { rowId?: number, product?: productsInfo }) {
    const [open, setOpen] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const productsCount = useAppSelector(state => state.rows.find(row => row.id === rowId)?.productsCount);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    const handleChange = (e: SelectChangeEvent) => {
        e.preventDefault();
        const value = e.target.value;
        if (value === 'Delete') {
            handleOpen();
        }
        setShowSelect(false);
    };
    
    return (
        <div>
            {!product &&
                <CloseIcon 
                    className="cursor-pointer text-grey-700 hover:text-red-700"
                    onClick={handleOpen}
                />
            }
            {!rowId && 
                <MoreHorizIcon onClick={() => {setShowSelect(!showSelect);}} />
            }
            {!rowId && showSelect &&
                 <Select
                     labelId="demo-simple-select-label"
                     className="justify-self-start"
                     id="demo-simple-select"
                     value={''}
                     label="Position"
                     onChange={handleChange}
                 >
                     <MenuItem value={'Delete'}>Delete</MenuItem>
                 </Select>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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