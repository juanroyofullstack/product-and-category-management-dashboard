import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rowsInfo, RowState } from '../lib/features/rowsInfoSlice';
import { store } from '../lib/store';
import Products from './Products';

jest.mock('../lib/hooks', () => ({
    useAppDispatch: jest.fn(),
}));

const mockRow: rowsInfo = {
    id: 1,
    title: 'Test Row',
    state: RowState.LEFT,
    productsCount: 1,
};

const renderComponent = (props: rowsInfo) => {
    return render(
        <Provider store={store}>
            <Products row={props}>
                <div>Child Component</div>
            </Products>
        </Provider>);
};

describe('Products', () => {
    it('renders children', () => {
        const { getByText } = renderComponent(mockRow);

        expect(getByText('Child Component')).toBeInTheDocument();       
    });

    it('renders AddProductModal when row productsCount is less than 3', () => {
        const { getByTestId } = renderComponent(mockRow);

        expect(getByTestId('add-product-modal')).toBeInTheDocument();       
    });

    it('does not render AddProductModal when row productsCount is than 3', () => {
        const { queryByTestId } = renderComponent({...mockRow, productsCount: 3});

        expect(queryByTestId('add-product-modal')).not.toBeInTheDocument();       
    });
});