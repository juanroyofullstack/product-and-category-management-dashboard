import { productsInfo } from '../lib/features/productsInfoSlice';
import { useDragAndDrop } from '../lib/hooks/useDragAndDrop';
import DeletionModal from './Modal';

const ProductCard = ({ product }: { product: productsInfo })=> {
    	const { handleDragging } = useDragAndDrop();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('product', JSON.stringify(product));
        handleDragging(true);
    };

    const handleDragEnd = () => handleDragging(false);
    return ( 
        <div key={product.id} className="p-4 border rounded" 
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <DeletionModal product={product} />
            {product.title && <h3 className="text-md font-semibold">{product.title}</h3>}
            {product.description && <p className="text-sm text-gray-600">{product.description}</p>}
        </div>
    );
};

export default ProductCard;