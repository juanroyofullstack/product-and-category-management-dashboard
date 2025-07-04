import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { productsInfo } from '../lib/features/productsInfoSlice';
import DeletionModal from './Modal';
import { useDragAndDrop } from '../lib/hooks/useDragAndDrop';

const SortableProductCard = ({ product }: { product: productsInfo }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.id, data: { type: 'product' } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ProductCard product={product} />
        </div>
    );
};

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
            onPointerDown={e => e.stopPropagation()}
        >
            <DeletionModal product={product} />
            {product.title && <h3 className="text-md font-semibold">{product.title}</h3>}
            {product.description && <p className="text-sm text-gray-600">{product.description}</p>}
        </div>
    );
};

export default ProductCard;