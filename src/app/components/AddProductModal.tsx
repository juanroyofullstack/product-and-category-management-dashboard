import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useAppDispatch } from '../lib/hooks';
import { increaseRowProductCount } from '../lib/features/rowsInfoSlice';

import { addProduct } from '../lib/features/productsInfoSlice';

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

export default function AddProductModal({ rowId }: { rowId: number }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        dispatch(addProduct({
            id: Date.now(),
            title,
            description,
            image,
            price: parseFloat(price),
            row: rowId,
        }));
        dispatch(increaseRowProductCount(rowId));
        setTitle('');
        setPrice('');
        setDescription('');
        setImage('');
        handleClose();
    };
    
    return (
        <div>
            <Button onClick={handleOpen}>Add product</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} 
                    component="form"
                    onSubmit={e => {
                        handleSubmit(e);
                    }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Product
                    </Typography>
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        style={{ padding: '8px', fontSize: '16px' }}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        required
                        style={{ padding: '8px', fontSize: '16px' }}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        required
                        style={{ padding: '8px', fontSize: '16px' }}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        required
                        style={{ padding: '8px', fontSize: '16px' }}
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type='submit'
                    >
                        Add
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