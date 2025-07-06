import { Button } from '@mui/material';

const ZoomInZoomOut = ({zoomIn, zoomOut, resetZoom, scale}: {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    scale: number;
}) => { 
    return  (
        <div className="Controls flex items-center gap-2 pl-7 pb-5 z-10">
            <Button onClick={zoomOut}>-</Button>
            <span className="Controls-percentage text-black">{Math.round(scale * 100)}%</span>
            <Button onClick={zoomIn}>+</Button>
            <Button onClick={resetZoom}>Reset</Button>
        </div>
    );
};

export default ZoomInZoomOut;