import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '../lib/hooks';
import { rowsInfo, setLeft, setCenter, setRight, RowStateSelectText } from '../lib/features/rowsInfoSlice';
import Products from '../components/Products';
import AddProductModal from './AddProductModal';
import DeletionModal from './Modal';


const Row = ({ row }:{ row: rowsInfo }) => {
    const [rowState, setRowState ] = useState<string>(RowStateSelectText[row.state]);
    const dispatch = useAppDispatch();

    const rowProductsCount = row.productsCount;

    const handleChange = (e: SelectChangeEvent) => {
        setRowState(e.target.value);
        const value = e.target.value;
        switch (value) {
            case RowStateSelectText.start:
                dispatch(setLeft(row.id));
                break;
            case RowStateSelectText.center:
                dispatch(setCenter(row.id));
                break;
            case RowStateSelectText.end:
                dispatch(setRight(row.id));
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {row ? (
                <div key={row.id} className='flex flex-col justify-around w-full p-4 border rounded-lg'>
                    <div key={row.id} className='flex justify-between w-full p-4'>
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-bold">{row.title}</h2>
                            <Select
                                labelId="demo-simple-select-label"
                                className="justify-self-start"
                                id="demo-simple-select"
                                value={rowState}
                                label="Position"
                                onChange={handleChange}
                            >
                                <MenuItem value={RowStateSelectText.start}>Left</MenuItem>
                                <MenuItem value={RowStateSelectText.center}>Center</MenuItem>
                                <MenuItem value={RowStateSelectText.end}>Right</MenuItem>
                            </Select>
                        </div>
                        <div className="flex items-center gap-4">
                            <DeletionModal rowId={row.id} />
                            {rowProductsCount < 3 && <AddProductModal rowId={row.id} />}
                        </div>
                    </div>
                    <Products row={row}/>
                </div>  
            ) : (
                <p>No rows available</p>
            )}
        </div>
    );
};

export default Row;