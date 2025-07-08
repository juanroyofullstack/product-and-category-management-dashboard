import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { useAppDispatch } from '../lib/hooks';
import { addRow, RowState } from '../lib/features/rowsInfoSlice';

const ShowAddRowComponent = () => {
    const [rowName, setRowName] = useState('');
    const [showAddRow, setShowAddRow] = useState(false);

    const dispatch = useAppDispatch();
    
    if (!showAddRow) {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAddRow(true)}
                data-testid="add-row-button"
            >
                Add Row
            </Button>
        );
    }
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <Box
                component="form"
                onSubmit={e => {
                    e.preventDefault();
                    setShowAddRow(false);
                    dispatch(addRow({ id: Date.now(), title: rowName, state: RowState.LEFT, productsCount: 0 }));
                    setRowName('');
                }}
            >
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Enter row title"
                        className="p-2 border rounded"
                        onChange={(e) => setRowName(e.target.value)}
                        data-testid="row-name-input"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type='submit'
                        disabled={!rowName}
                        data-testid="save-row-button"
                    >
                        Save Row
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default ShowAddRowComponent;