import { ReactNode } from 'react';
import { rowsInfo } from '../lib/features/rowsInfoSlice';
import AddProductModal from './AddProductModal';

const justifyMap: Record<string, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
};

const Products = ({ row, children }: { row: rowsInfo; children: ReactNode }) => {
    return (
        <>
            <div className={`Products flex flex-wrap items-center ${justifyMap[row.state]} w-full h-full gap-4`}>
                {children}
            </div>   
            <div className="flex items-center justify-end w-full h-full gap-4">
                {row.productsCount < 3 && <AddProductModal rowId={row.id} />}
            </div>  
        </>
    );
};

export default Products;