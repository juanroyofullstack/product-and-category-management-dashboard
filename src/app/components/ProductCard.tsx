import { productsInfo } from '../lib/features/productsInfoSlice';
import DeletionModal from './Modal';

const ProductCard = ({ product }: { product: productsInfo })=> {
    return ( 
        <div key={product.id} className="p-4 border rounded" >
            <DeletionModal product={product} />
            {product.title && <h3 className="text-md font-semibold">{product.title}</h3>}
            {product.description && <p className="text-sm text-gray-600">{product.description}</p>}
        </div>
    );
};

export default ProductCard;