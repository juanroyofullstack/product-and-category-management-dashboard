import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { categoriesInfo, CategoryState } from '../lib/features/categoriesInfoSlice';
import { store } from '../lib/store';
import Products from './Products';

jest.mock('../lib/hooks', () => ({
    useAppDispatch: jest.fn(),
}));

const mockCategory: categoriesInfo = {
    id: 1,
    title: 'Test Category',
    state: CategoryState.LEFT,
    productsCount: 1,
};

const renderComponent = (props: categoriesInfo) => {
    return render(
        <Provider store={store}>
            <Products category={props}>
                <div>Child Component</div>
            </Products>
        </Provider>);
};

describe('Products', () => {
    it('renders children', () => {
        const { getByText } = renderComponent(mockCategory);

        expect(getByText('Child Component')).toBeInTheDocument();       
    });

    it('renders AddProductModal when category productsCount is less than 3', () => {
        const { getByTestId } = renderComponent(mockCategory);

        expect(getByTestId('add-product-modal')).toBeInTheDocument();       
    });

    it('does not render AddProductModal when category productsCount is than 3', () => {
        const { queryByTestId } = renderComponent({...mockCategory, productsCount: 3});

        expect(queryByTestId('add-product-modal')).not.toBeInTheDocument();       
    });
});