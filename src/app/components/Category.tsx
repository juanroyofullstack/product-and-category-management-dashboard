import { SelectChangeEvent } from '@mui/material';
import { rowsInfo, setLeft, setCenter, setRight, RowStateSelectText } from '../lib/features/rowsInfoSlice';
import Products from './Products';
import { useDragAndDrop } from '../lib/hooks/useDragAndDrop';
import { selectProductsByRow } from '../lib/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import RowHeader from './ui/CategoryHeader';
import XIconDeletionRow from './ui/XIconDeletionRow';
import ProductCard from './ProductCard';

const Category = ({ category }: { category: rowsInfo }) => {
    const { handleUpdateList, handleReorderRows, handleDragging, handleDragEnd, handleUpdateRows } = useDragAndDrop();
    const products = useAppSelector(state => selectProductsByRow(state, category.id));
    const dispatch = useAppDispatch();

    const handleChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        switch (value) {
            case RowStateSelectText.start:
                dispatch(setLeft(category.id));
                break;
            case RowStateSelectText.center:
                dispatch(setCenter(category.id));
                break;
            case RowStateSelectText.end:
                dispatch(setRight(category.id));
                break;
            default:
                break;
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const productTransfer = e.dataTransfer.getData('product');
        const rowTransfer = e.dataTransfer.getData('category');
        if(rowTransfer && !productTransfer) {
            const rowTransfer = JSON.parse(e.dataTransfer.getData('category'));
            handleReorderRows(rowTransfer.id, category.id);
        } 
        if(productTransfer) {
            const product = JSON.parse(e.dataTransfer.getData('product'));
            if(product.category === category.id) {
                handleDragging(false);
                return;
            }
            handleUpdateList(product, category.id);
            handleUpdateRows(product.category, category.id);
        }
        handleDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
        e.preventDefault();

    const handleDragStartRow = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('category', JSON.stringify(category));
        handleDragging(true);
    };

    return (
        <div className="Category flex flex-col items-center justify-center w-full h-full gap-4" data-testid="category">
            <div key={category.id} className='flex flex-col justify-around w-full p-4 border rounded-lg'
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragStart={handleDragStartRow} 
                onDragEnd={handleDragEnd}
                onPointerDown={e => e.stopPropagation()}
                draggable
            >
                <XIconDeletionRow category={category} />
                <RowHeader category={category} handleChange={handleChange} />
                <Products  category={category}>
                    {products && products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </Products>
            </div>  
        </div>
    );
};

export default Category;