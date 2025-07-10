import { ReactNode } from 'react';
import { categoriesInfo } from '../lib/features/categoriesInfoSlice';
import AddProductModal from './AddProductModal';

interface ProductsProps {
    category: categoriesInfo;
    children: ReactNode;
}

const justifyMap: Record<string, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
};

const Products = ({ category, children }: ProductsProps) => {
    return (
        <>
            <div className={`Products flex flex-wrap items-center ${justifyMap[category.state]} w-full h-full gap-4 pb-2`} data-testid="products">
                {children}
            </div>   
            <div className="flex items-center justify-end w-full h-full gap-4">
                {category.productsCount < 3 && <AddProductModal categoryId={category.id} />}
            </div>  
        </>
    );
};

export default Products;