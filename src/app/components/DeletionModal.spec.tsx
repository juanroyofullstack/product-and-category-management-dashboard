import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { productsInfo } from '../lib/features/productsInfoSlice';
import { useAppSelector } from '../lib/hooks';
import { store } from '../lib/store';
import { DeletionModal, ModalProps} from './DeletionModal';

jest.mock('../lib/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

const mockProduct: productsInfo = {
    id: 1,
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    image: 'test-image.jpg',
    category: 1,
};

const renderComponent = (props: ModalProps) => {
    return render(
        <Provider store={store}>
            <DeletionModal categoryId={props.categoryId} product={props.product}/>
        </Provider>);
};

describe('DeletionModal', () => {
    it('renders DeletionTrigger and UiModal', () => {
        (useAppSelector as jest.Mock).mockReturnValue(0);
        const { getByTestId } = renderComponent({ categoryId: 1, product: undefined });

        expect(getByTestId('deletion-trigger-category')).toBeInTheDocument();
    });

    it('shows correct confirmation message for category with products', () => {
        (useAppSelector as jest.Mock).mockReturnValue(2);
        const { getByTestId, getByText } = renderComponent({ categoryId: 1, product: undefined });

        fireEvent.click(getByTestId('deletion-trigger-category'));

        expect(getByText(/all cards within it will be deleted as well/i)).toBeInTheDocument();
        expect(getByText(/about to delete a category/i)).toBeInTheDocument();
    });

    it('shows correct confirmation message for product', () => {
        (useAppSelector as jest.Mock).mockReturnValue(undefined);
        const { getByTestId } = render(<DeletionModal product={mockProduct} />);

        fireEvent.click(getByTestId('show-delete-button'));
        fireEvent.click(getByTestId('delete-product'));

        expect(screen.getByText(/about to delete a product/i)).toBeInTheDocument();
    });
});