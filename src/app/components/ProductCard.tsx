import { useState } from 'react';
import Image from 'next/image';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { productsInfo } from '../lib/features/productsInfoSlice';
import { useDragAndDrop } from '../lib/hooks/useDragAndDrop';
import DeletionModal from './DeletionModal';
import './ProductCard.css';

const ProductCard = ({ product }: { product: productsInfo })=> {
    const { handleDragging, handleDragEnd } = useDragAndDrop();
    const [imageError, setImageError] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('product', JSON.stringify(product));
        handleDragging(true);
    };

    return ( 
        <div key={product.id} 
            className="ProductCard flex flex-col justify-around p-4 border max-w-xs break-words rounded"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onPointerDown={e => e.stopPropagation()}
        >
            <div className="flex justify-between mb-2">
                {product.title && <h3 className="text-md font-semibold mb-2">{product.title}</h3>}
                <DeletionModal product={product} />
            </div>
            {product.image && (
                <div className="mb-3">
                    {!imageError ? (
                        <Image 
                            src={product.image} 
                            alt={product.title || 'Product image'} 
                            width={200}
                            height={128}
                            className="w-full h-32 object-cover rounded"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="flex justify-center items-center w-full h-32 bg-gray-100 rounded">
                            <ImageNotSupportedIcon className="text-gray-400" fontSize="large" />
                        </div>
                    )}
                </div>
            )}
            <div className="">
                {product.description && <p className="text-sm text-gray-600 mb-2">{product.description}</p>}
                {product.price && (
                    <p className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;