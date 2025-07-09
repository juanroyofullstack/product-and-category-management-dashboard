import React, { useState, FormEvent } from 'react';
import { Button, Box } from '@mui/material';
import { useAppDispatch } from '../lib/hooks';
import useClickOutside from '../lib/hooks/useClickOutside';
import { addRow, RowState } from '../lib/features/rowsInfoSlice';

const ShowAddRowComponent = () => {
    const [rowName, setRowName] = useState('');
    const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(false);
    const dispatch = useAppDispatch();
    
    const handleAddRowClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsComponentVisible(false);
        dispatch(addRow({ id: Date.now(), title: rowName, state: RowState.LEFT, productsCount: 0 }));
        setRowName('');
    };

    if (!isComponentVisible) {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsComponentVisible(true)}
                data-testid="add-category-button"
            >
                Add Category
            </Button>
        );
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4" ref={ref}>
            <Box
                component="form"
                onSubmit={e => handleAddRowClick(e)}
            >
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Enter category title"
                        className="p-2 border rounded"
                        onChange={(e) => setRowName(e.target.value)}
                        data-testid="category-name-input"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type='submit'
                        disabled={!rowName}
                        data-testid="save-category-button"
                    >
                        Save Category
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default ShowAddRowComponent;