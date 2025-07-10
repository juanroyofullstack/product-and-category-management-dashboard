import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import AddProductModal from './AddProductModal';

jest.mock('../lib/hooks', () => ({
    useAppDispatch: () => jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

jest.mock('../lib/features/productsInfoSlice', () => ({
    addProduct: jest.fn((payload) => ({ type: 'addProduct', payload })),
}));

jest.mock('../lib/features/categoriesInfoSlice', () => ({
    increaseCategoryProductCount: jest.fn((payload) => ({ type: 'increaseCategoryProductCount', payload })),
}));

function renderComponent(props = { categoryId: 1 }) {
    return render(
        <Provider store={store}>
            <AddProductModal {...props} />
        </Provider>,
    );
}

describe('AddProductModal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders add product modal', () => {
        const { getByTestId } = renderComponent();

        expect(getByTestId('add-product-modal')).toBeInTheDocument();
    });

    it('opens modal when Add product button is clicked', () => {
        const { getByText, getByPlaceholderText } =renderComponent();

        expect(getByText(/Add Product/i)).toBeInTheDocument();
        fireEvent.click(getByText(/Add product/i));

        expect(getByPlaceholderText(/Title/i)).toBeInTheDocument();
    });

    it('closes modal when Cancel is clicked', () => {
        const { getByText, queryByText } = renderComponent();

        fireEvent.click(getByText(/Add product/i));
        fireEvent.click(getByText(/Cancel/i));

        expect(queryByText(/Title/i)).not.toBeInTheDocument();
    });

});