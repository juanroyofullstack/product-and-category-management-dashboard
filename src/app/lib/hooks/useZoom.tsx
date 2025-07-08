import { useState, useCallback } from 'react';

interface UseZoomOptions {
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  step?: number;
}

const useZoom = (options: UseZoomOptions = {}) => {
    const {
        initialScale = 1,
        minScale = 0.5,
        maxScale = 3,
        step = 0.1,
    } = options;

    const [scale, setScale] = useState(initialScale);

    const zoomIn = useCallback(() => {
        setScale(prevScale => Math.min(prevScale + step, maxScale));
    }, [step, maxScale]);

    const zoomOut = useCallback(() => {
        setScale(prevScale => Math.max(prevScale - step, minScale));
    }, [step, minScale]);

    const resetZoom = useCallback(() => {
        setScale(initialScale);
    }, [initialScale]);

    const setZoom = useCallback((newScale: number) => {
        setScale(Math.max(minScale, Math.min(maxScale, newScale)));
    }, [minScale, maxScale]);

    return {
        scale,
        zoomIn,
        zoomOut,
        resetZoom,
        setZoom,
    };
};

export default useZoom;