'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { addRow, RowState } from '../lib/features/rowsInfoSlice';
import { selectRows } from '../lib/selectors/selectors';
import { useAppSelector, useAppDispatch } from '../lib/hooks';

import Products from '../components/Products';

const RowContainer = () => { 
    const [showAddRow, setShowAddRow] = useState(false);
    const [rowName, setRowName] = useState('');
    const rows = useAppSelector(selectRows);
    
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {rows.length > 0 ? (
                rows.map((row) => (
                    <div key={row.id} className={`flex juatify-${row.state} w-full p-4 border rounded-lg`}>
                        <h2 className="text-lg font-bold">{row.title}</h2>
                        <div className="flex flex-wrap items-center justify-center w-full h-full gap-4">
                            <Products rowId={row.id}/>
                        </div>
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