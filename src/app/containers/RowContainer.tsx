'use client';

import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { addRow, RowState } from '../lib/features/rowsInfoSlice';
import { selectRows } from '../lib/selectors/selectors';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import useZoom from '../lib/hooks/useZoom';
import Row from '../components/Row';

const RowContainer = () => { 
    const [showAddRow, setShowAddRow] = useState(false);
    const [rowName, setRowName] = useState('');
    const { scale, zoomIn, zoomOut, resetZoom } = useZoom({
        minScale: 0.5,
        maxScale: 2,
        step: 0.2,
    });
    const rows = useAppSelector(selectRows);

    const dispatch = useAppDispatch();
    
    return (
        <div className="RowContainer flex flex-col pt-20 w-full">
            <div className="Controls flex items-center gap-2 pl-7 pb-5 z-10">
                <Button onClick={zoomOut}>-</Button>
                <span className="Controls-percentage text-black">{Math.round(scale * 100)}%</span>
                <Button onClick={zoomIn}>+</Button>
                <Button onClick={resetZoom}>Reset</Button>
            </div>
            <div className="RowContainer flex flex-col items-center justify-center w-full h-full  px-6 gap-4"   
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.2s ease',
                }} >
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
                            <div className="flex flex-col gap-2">
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
                            </div>
                        </Box>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RowContainer;