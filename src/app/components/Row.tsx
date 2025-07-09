import { SelectChangeEvent } from '@mui/material';
import { rowsInfo, setLeft, setCenter, setRight, RowStateSelectText } from '../lib/features/rowsInfoSlice';
import Products from '../components/Products';
import { useDragAndDrop } from '../lib/hooks/useDragAndDrop';
import { selectProductsByRow } from '../lib/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import RowHeader from './ui/RowHeader';
import XIconDeletionRow from './ui/XIconDeletionRow';
import ProductCard from './ProductCard';

const Row = ({ row }: { row: rowsInfo }) => {
    const { handleUpdateList, handleReorderRows, handleDragging, handleDragEnd, handleUpdateRows } = useDragAndDrop();
    const products = useAppSelector(state => selectProductsByRow(state, row.id));
    const dispatch = useAppDispatch();

    const handleChange = (e: SelectChangeEvent) => {
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
        if(rowTransfer && !productTransfer) {
            const rowTransfer = JSON.parse(e.dataTransfer.getData('row'));
            handleReorderRows(rowTransfer.id, row.id);
        } 
        if(productTransfer) {
            const product = JSON.parse(e.dataTransfer.getData('product'));
            if(product.row === row.id) {
                handleDragging(false);
                return;
            }
            handleUpdateList(product, row.id);
            handleUpdateRows(product.row, row.id);
        }
        handleDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
        e.preventDefault();

    const handleDragStartRow = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('row', JSON.stringify(row));
        handleDragging(true);
    };

    return (
        <div className="Row flex flex-col items-center justify-center w-full h-full gap-4" data-testid="row">
            <div key={row.id} className='flex flex-col justify-around w-full p-4 border rounded-lg'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragStart={handleDragStartRow} 
                onDragEnd={handleDragEnd}
                onPointerDown={e => e.stopPropagation()}
                draggable
            >
                <XIconDeletionRow row={row} />
                <RowHeader row={row} handleChange={handleChange} />
                <Products  row={row}>
                    {products && products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </Products>
            </div>  
        </div>
    );
};

export default Row;