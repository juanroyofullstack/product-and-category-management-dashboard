'use client';

import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { addRow, RowState } from '../lib/features/rowsInfoSlice';
import { selectRows } from '../lib/selectors/selectors';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import Row from '../components/Row';

const RowContainer = () => { 
    const [showAddRow, setShowAddRow] = useState(false);
    const [rowName, setRowName] = useState('');

    const rows = useAppSelector(selectRows);

    const dispatch = useAppDispatch();
    
    return (
        <div className="RowContainer flex flex-col items-center justify-center w-full h-full pt-20 px-6 gap-4" >
            {rows.length > 0 ? (
                rows.map((row) => (
                    <div key={row.id} className='w-full'>
                        <Row row={row}  />
                    </div>
                ))) : null}

            {!showAddRow && <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAddRow(!showAddRow)}
            >
                Add Row
            </Button>}

            {showAddRow && (
                <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                    <Box
                        component="form"
                        onSubmit={e => {
                            e.preventDefault();
                            setShowAddRow(false);
                            dispatch(addRow({ id: Date.now(), title: rowName, state: RowState.LEFT, productsCount: 0 }));
                            setRowName('');
                        }
                        }>
                        <input
                            type="text"
                            placeholder="Enter row title"
                            className="p-2 border rounded"
                            onChange={(e) => setRowName(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            type='submit'
                            disabled={!rowName}
                        >
                        Save Row
                        </Button>
                    </Box>
                </div>
            )}
        </div>
    );
};

export default RowContainer;