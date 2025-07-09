import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rowsInfo, RowState } from '../lib/features/rowsInfoSlice';
import { store } from '../lib/store';
import Category from './Category';

jest.mock('../lib/hooks/useDragAndDrop', () => ({
    useDragAndDrop: () => ({
        handleDragging: jest.fn(),
        handleDragEnd: jest.fn(),
    }),
}));

const mockRow: rowsInfo = {
    id: 1,
    title: 'Test Category',
    state: RowState.LEFT,
    productsCount: 2,
};


const renderComponent = (props: rowsInfo) => {
    return render(
        <Provider store={store}>
            <Category category={props}/>
        </Provider>);
};

describe('Category Component', () => {   
    it('renders RowHeader and XIconDeletionRow', () => {

        const { getByText, getByTestId } = renderComponent(mockRow);

        expect(getByText(mockRow.title)).toBeInTheDocument();
        expect(getByTestId('category-header')).toBeInTheDocument();
        expect(getByTestId('x-icon-deletion-category')).toBeInTheDocument();
    });

    it('renders Products component with correct props', () => {
        const mockRow: rowsInfo = {
            id: 1,
            title: 'Test Category',
            state: RowState.LEFT,
            productsCount: 2,
        };

        const { getByTestId } = renderComponent(mockRow);

        expect(getByTestId('products')).toBeInTheDocument();
    });
});