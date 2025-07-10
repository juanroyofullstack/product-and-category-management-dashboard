import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../lib/store';
import ZoomInZoomOut from './ZoomInZoomOut';    

const zoomInMock = jest.fn();
const zoomOutMock = jest.fn();
const resetZoomMock = jest.fn();

const renderComponent = () => {
    return render(
        <Provider store={store}>
            <ZoomInZoomOut zoomIn={zoomInMock} zoomOut={zoomOutMock} resetZoom={resetZoomMock} scale={100} />
        </Provider>,
    );
};  

describe('ZoomInZoomOut', () => {
    it('renders ZoomInZoomOut with correct props', () => {
        const { getByTestId } = renderComponent();

        expect(getByTestId('zoom-controls')).toBeInTheDocument();
        expect(getByTestId('zoom-in-button')).toBeInTheDocument();
        expect(getByTestId('zoom-out-button')).toBeInTheDocument();
    });

    it('calls zoomIn and zoomOut functions on button click', () => {
        const { getByTestId } = renderComponent();
        
        const zoomInButton = getByTestId('zoom-in-button');
        const zoomOutButton = getByTestId('zoom-out-button');

        zoomInButton.click();
        zoomOutButton.click();

        expect(zoomInMock).toHaveBeenCalled();
        expect(zoomOutMock).toHaveBeenCalled();
    });

    it('calls resetZoom function on reset button click', () => {
        const { getByTestId } = renderComponent();
        
        const resetButton = getByTestId('reset-zoom-button');
        resetButton.click();

        expect(resetZoomMock).toHaveBeenCalled();
    });
});