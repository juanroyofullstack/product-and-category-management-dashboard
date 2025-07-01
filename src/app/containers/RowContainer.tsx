'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { addRow, RowState } from '../lib/features/rowsInfoSlice';
import Row from '../components/Row';
import { selectRows } from '../lib/selectors/selectors';
import { useAppSelector, useAppDispatch } from '../lib/hooks';


const RowContainer = () => { 
    const [showAddRow, setShowAddRow] = useState(false);
    const [rowName, setRowName] = useState('');
    const rows = useAppSelector(selectRows);
    
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {rows.length > 0 ? (
                rows.map((row) => (
                    <Row key={row.id} row={row} />
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
                    <input
                        type="text"
                        placeholder="Enter row title"
                        className="p-2 border rounded"
                        onChange={(e) => setRowName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type='button'
                        disabled={!rowName}
                        onClick={() => {
                            setShowAddRow(false);
                            dispatch(addRow({ id: Date.now().toString(), title: rowName, state: RowState.LEFT }));
                        }}
                    >
                        Save Row
                    </Button>
                </div>
            )}
        </div>
    );
};

export default RowContainer;