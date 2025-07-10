import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { productsInfo } from '../lib/features/productsInfoSlice';
import { store } from '../lib/store';
import ProductCard from './ProductCard';

jest.mock('../lib/hooks/useDragAndDrop', () => ({
    useDragAndDrop: () => ({
        handleDragging: jest.fn(),
        handleDragEnd: jest.fn(),
    }),
}));

const renderComponent = (props: productsInfo) => {
    return render(
        <Provider store={store}>
            <ProductCard product={props}/>
        </Provider>);
};

const mockProduct = {
    id: 1,
    title: 'Test Product',
    description: 'This is a test product.',
    price: 19.99,
    image: 'https://example.com/image.jpg',
    category: 1,
};

describe('ProductCard', () => {
    it('renders product title, description, and price', () => {
        const { getByText } = renderComponent(mockProduct);
        
        expect(getByText(mockProduct.title)).toBeInTheDocument();
        expect(getByText(mockProduct.description)).toBeInTheDocument();
        expect(getByText(`${mockProduct.price.toFixed(2)}€`)).toBeInTheDocument();
    });

    it('renders product image', () => {
        const { getByAltText } = renderComponent(mockProduct);
        
        expect(getByAltText(mockProduct.title || 'Product image')).toBeInTheDocument();
    });

    it('handles image error', () => {
        const { getByTestId } = renderComponent({ ...mockProduct, image: 'https://invalid-image-url.jpg' });
        
        const image = document.querySelector('img');
        if (image) {
            fireEvent.error(image);
        }
        
        expect(getByTestId('not-supported-image')).toBeInTheDocument();
    });

    it('calls handleDragStart on drag start', () => {
        const { getByTestId } = renderComponent(mockProduct);
        const card = getByTestId('product-card');

        const mockDataTransfer = {
            setData: jest.fn(),
        };

        fireEvent.dragStart(card, {
            dataTransfer: mockDataTransfer,
        });

        expect(mockDataTransfer.setData).toHaveBeenCalledWith('product', JSON.stringify(mockProduct));
    });
});