import { useAppSelector } from '../lib/hooks';
import { selectProductsByRow } from '../lib/selectors/selectors';
import { rowsInfo } from '../lib/features/rowsInfoSlice';

import ProductCard from './ProductCard';

const justifyMap: Record<string, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
};

const Products = ({ row }: { row: rowsInfo }) => {
    const products = useAppSelector(state => selectProductsByRow(state, row.id));
    
    return (
        <>
            <div className={`flex flex-wrap items-center ${justifyMap[row.state]} w-full h-full gap-4`}>
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>   
        </>
    );
};

export default Products;