import { useAppSelector } from '../lib/hooks';
import { selectProductsByRow } from '../lib/selectors/selectors';

const Products = ({ rowId }: { rowId: string }) => {
    const products = useAppSelector(state => selectProductsByRow(state, rowId));
    
    return (
        <>
            {products && products.map((product) => (
                <div key={product.id} className="p-4 border rounded">
                    {product.title && <h3 className="text-md font-semibold">{product.title}</h3>}
                </div>
            ))}
        </>
    );
};

export default Products;