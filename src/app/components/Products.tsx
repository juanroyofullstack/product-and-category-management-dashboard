import { productsInfo } from '../lib/features/productsInfoSlice';
import { useAppSelector } from '../lib/hooks';
import { selectProductsByRow } from '../lib/selectors/selectors';

const Products = ({ rowId }: { rowId: string }) => {
    const products = useAppSelector(state => selectProductsByRow(state, rowId));
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <h1 className="text-2xl font-bold">Products</h1>
            {/* Add your product components here */}
        </div>
    );
};

export default Products;