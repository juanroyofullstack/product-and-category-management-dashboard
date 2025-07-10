import { Button } from '@mui/material';

const ZoomInZoomOut = ({zoomIn, zoomOut, resetZoom, scale}: {
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    scale: number;
}) => { 
    return  (
        <div className="Controls flex items-center gap-2 pl-7 pb-5 z-10" data-testid="zoom-controls">
            <Button 
                onClick={zoomOut} 
                variant="contained"
                color="primary"
                data-testid="zoom-out-button"
            >
                    -
            </Button>
            <span className="Controls-percentage text-black">{Math.round(scale * 100)}%</span>
            <Button 
                onClick={zoomIn} 
                variant="contained"
                color="primary" 
                data-testid="zoom-in-button">
                    +
            </Button>
            <Button 
                onClick={resetZoom} 
                variant="contained"
                color="primary"
                data-testid="reset-zoom-button">
                    Reset
            </Button>
        </div>
    );
};

export default ZoomInZoomOut;