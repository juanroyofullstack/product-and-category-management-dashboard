import { useAppSelector } from '../lib/hooks';
import { selectProductsByRow } from '../lib/selectors/selectors';
import DeletionModal from './Modal';

const Products = ({ rowId }: { rowId: string }) => {
    const products = useAppSelector(state => selectProductsByRow(state, rowId));
    
    return (
        <>
            {products && products.map((product) => (
                <div key={product.id} className="p-4 border rounded">
                    <DeletionModal product={product} />
                    {product.title && <h3 className="text-md font-semibold">{product.title}</h3>}
                    {product.description && <p className="text-sm text-gray-600">{product.description}</p>}
                </div>
            ))}
        </>
    );
};

export default Products;