import React, { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { rowsInfo, setLeft, setCenter, setRight, RowStateSelectText } from '../lib/features/rowsInfoSlice';
import { useDragAndDrop } from '../lib/hooks/useDragAndDrop';
import { useAppDispatch } from '../lib/hooks';
import Products from '../components/Products';
import AddProductModal from './AddProductModal';
import DeletionModal from './Modal';


const Row = ({ row }:{ row: rowsInfo }) => {
    const [rowState, setRowState ] = useState<string>(RowStateSelectText[row.state]);
    const { handleUpdateList, handleReorderRows, handleDragging } = useDragAndDrop();
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

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const productTransfer = e.dataTransfer.getData('product');
        const rowTransfer = e.dataTransfer.getData('row');
        if(rowTransfer) {
            const rowTransfer = JSON.parse(e.dataTransfer.getData('row'));
            handleReorderRows(rowTransfer.id, row.id);
        } 
        if(productTransfer) {
            const product = JSON.parse(e.dataTransfer.getData('product'));
            handleUpdateList(product, row.id);
        }
        handleDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
        e.preventDefault();

    const handleDragStartRow = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('row', JSON.stringify(row));
        handleDragging(true);
    };

    const handleDragEnd = () => handleDragging(false);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {row ? (
                <div key={row.id} className='flex flex-col justify-around w-full p-4 border rounded-lg'
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div onDragStart={handleDragStartRow}
                        onDragEnd={handleDragEnd}
                        draggable>=</div>
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