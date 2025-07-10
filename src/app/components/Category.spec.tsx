import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { categoriesInfo, CategoryState } from '../lib/features/categoriesInfoSlice';
import { store } from '../lib/store';
import Category from './Category';

jest.mock('../lib/hooks/useDragAndDrop', () => ({
    useDragAndDrop: () => ({
        handleDragging: jest.fn(),
        handleDragEnd: jest.fn(),
    }),
}));

const mockCategory: categoriesInfo = {
    id: 1,
    title: 'Test Category',
    state: CategoryState.LEFT,
    productsCount: 2,
};


const renderComponent = (props: categoriesInfo) => {
    return render(
        <Provider store={store}>
            <Category category={props}/>
        </Provider>);
};

describe('Category', () => {   
    it('renders CategoryHeader and XIconDeletionCategory', () => {
        const { getByText, getByTestId } = renderComponent(mockCategory);

        expect(getByText(mockCategory.title)).toBeInTheDocument();
        expect(getByTestId('category-header')).toBeInTheDocument();
        expect(getByTestId('x-icon-deletion-category')).toBeInTheDocument();
    });

    it('renders Products component with correct props', () => {
        const { getByTestId } = renderComponent(mockCategory);

        expect(getByTestId('products')).toBeInTheDocument();
    });
});