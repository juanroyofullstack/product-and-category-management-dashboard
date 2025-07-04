import { productsInfo } from '../lib/features/productsInfoSlice';
import { useDragAndDrop } from '../lib/hooks/useDragAndDrop';
import DeletionModal from './Modal';

const ProductCard = ({ product }: { product: productsInfo })=> {
      	const { handleDragging, handleDragEnd } = useDragAndDrop();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('product', JSON.stringify(product));
        handleDragging(true);
    };

    return ( 
        <div key={product.id} 
            className="ProductCard p-4 border min-w-[200px] max-w-xs break-words rounded"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onPointerDown={e => e.stopPropagation()}
        >
            <DeletionModal product={product} />
            {product.title && <h3 className="text-md font-semibold">{product.title}</h3>}
            {product.description && <p className="text-sm text-gray-600">{product.description}</p>}
        </div>
    );
};

export default ProductCard;