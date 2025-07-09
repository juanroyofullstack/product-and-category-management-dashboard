'use client';

import { ReactNode } from 'react';
import { CircularProgress } from '@mui/material';
import useZoom from '../lib/hooks/useZoom';
import { useAppSelector } from '../lib/hooks';
import ZoomInZoomOut from '../components/ui/ZoomInZoomOut';
import ShowAddRowComponent from '../components/ShowAddRowComponent';
import './CategoryContainer.css';

interface CategoryContainerProps {
    children: ReactNode;
}

const CategoryContainer = ({ children }: CategoryContainerProps) => { 
    const { scale, zoomIn, zoomOut, resetZoom } = useZoom({
        minScale: 0.5,
        maxScale: 2,
        step: 0.2,
    });

    return (
        <div className="CategoryContainer flex flex-col pt-20 pb-10 w-full">
            <ZoomInZoomOut zoomIn={zoomIn} zoomOut={zoomOut} resetZoom={resetZoom} scale={scale} />
            <div className="flex flex-col items-center justify-center w-full h-full px-6 gap-4"   
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.2s ease',
                }} >
                {children}
                <ShowAddRowComponent/>
            </div>
        </div>
    );
};

export default CategoryContainer;