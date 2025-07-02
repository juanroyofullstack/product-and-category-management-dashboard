import React, { useState } from 'react';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '../lib/hooks';
import { rowsInfo, setLeft, setCenter, setRight } from '../lib/features/rowsInfoSlice';
import Products from '../components/Products';
import AddProductModal from './AddProductModal';
import DeletionModal from './Modal';

const Row = ({ row }:{ row: rowsInfo }) => {
    const [rowState, setRowState ] = useState<string>(row.state);
    const dispatch = useAppDispatch();
    const handleChange = (e: SelectChangeEvent) => {
        setRowState(e.target.value);
        const value = e.target.value;
        switch (value) {
            case 'left':
                dispatch(setLeft(row.id));
                break;
            case 'center':
                dispatch(setCenter(row.id));
                break;
            case 'right':
                dispatch(setRight(row.id));
                break;
            default:
                break;
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {row ? (
                <div key={row.id} className={`flex justify-${row.state} w-full p-4 border rounded-lg`}>
                    <h2 className="text-lg font-bold">{row.title}</h2>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rowState}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Left'}>Left</MenuItem>
                        <MenuItem value={'Center'}>Center</MenuItem>
                        <MenuItem value={'Right'}>Right</MenuItem>
                    </Select>
                    <div className="flex flex-wrap items-center justify-center w-full h-full gap-4">
                        <Products rowId={row.id}/>
                        <DeletionModal rowId={row.id} />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                               
                            } }
                        >
                            <AddProductModal rowId={row.id} />
                        </Button>
                    </div>   
                </div>
            ) : (
                <p>No rows available</p>
            )}
        </div>
    );
};

export default Row;