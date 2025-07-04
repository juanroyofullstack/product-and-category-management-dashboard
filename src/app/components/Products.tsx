import { rowsInfo } from '../lib/features/rowsInfoSlice';
import { selectProductsByRow } from '../lib/selectors/selectors';
import { useAppSelector } from '../lib/hooks';
import AddProductModal from './AddProductModal';
import ProductCard from './ProductCard';

const justifyMap: Record<string, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
};

const Products = ({ row }: { row: rowsInfo }) => {
    const products = useAppSelector(state => selectProductsByRow(state, row.id));
    const rowProductsCount = row.productsCount;

    return (
        <>
            <div className={`Products flex flex-wrap items-center ${justifyMap[row.state]} w-full h-full gap-4`}>
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>   
            <div className="flex items-center justify-end w-full h-full gap-4">
                {rowProductsCount < 3 && <AddProductModal rowId={row.id} />}
            </div>  
        </>
    );
};

export default Products;