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
            className="ProductCard flex flex-col justify-around p-4 border break-words rounded"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onPointerDown={e => e.stopPropagation()}
            draggable
            data-testid="product-card"
        >
            <div className="flex justify-between mb-2 relative">
                {product.title && <h3 className="text-md z-5 font-semibold mb-2 text-black">{product.title}</h3>}
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
                            <ImageNotSupportedIcon className="text-gray-400" fontSize="large" data-testid="not-supported-image"/>
                        </div>
                    )}
                </div>
            )}
            <div className="">
                {product.description &&
                 <p className="text-sm text-gray-600 mb-2">
                     {product.description}
                 </p>
                }
                {product.price && (
                    <p className="text-lg font-bold text-black">{product.price.toFixed(2)}€</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;