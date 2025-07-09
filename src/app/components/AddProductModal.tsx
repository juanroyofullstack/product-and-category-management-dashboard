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
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddProductModal({ rowId }: { rowId: number }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setPrice('');
        setDescription('');
        setImage('');
        setImageFile(null);
    };
    const dispatch = useAppDispatch();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImage('');
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setUploading(true);

        try {
            let finalImageUrl = image;

            if (imageFile) {
                finalImageUrl = await uploadImage(imageFile);
            }

            dispatch(addProduct({
                id: Date.now(),
                title,
                description,
                image: finalImageUrl,
                price: parseFloat(price),
                row: rowId,
            }));
            dispatch(increaseRowProductCount(rowId));
            handleClose();
        } catch {
            alert('Error uploading image. Please try again.');
        } finally {
            setUploading(false);
        }
    };
    
    return (
        <div className="AddProductModal" data-testid="add-product-modal">
            <Button onClick={handleOpen}>Add product</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} 
                    component="form"
                    className='bg-white'
                    onSubmit={e => {
                        handleSubmit(e);
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-black pb-2">
                            Add Product
                    </Typography>
                    <div className="gap-4 flex flex-col bg-white">
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            className="p-2 text-m text-black border-gray-700"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            required
                            className="p-2 text-m text-black border-gray-700"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <textarea
                            placeholder="Description"
                            required
                            className="p-2 text-m text-black border-gray-700"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-600">Upload Image File:</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="p-2 text-m text-black border-gray-700"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <Button
                            variant="contained"
                            color="secondary"
                            type='submit'
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Add'}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                            disabled={uploading}
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}