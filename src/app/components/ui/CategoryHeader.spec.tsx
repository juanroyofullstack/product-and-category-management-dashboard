import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { categoriesInfo, CategoryState } from '../../lib/features/categoriesInfoSlice';
import { store } from '../../lib/store';
import CategoryHeader from './CategoryHeader'; 

const renderComponent = (props: categoriesInfo) => {
    return render(
        <Provider store={store}>
            <CategoryHeader category={props} handleChange={() => {}}/>
        </Provider>);
};

const mockCategory: categoriesInfo = {
    id: 1,
    title: 'Test Category',
    state: CategoryState.LEFT,
    productsCount: 1,
};

describe('CategoryHeader Component', () => {   
    it('renders CategoryHeader with correct props', () => {

        const { getByText, getByTestId } = renderComponent(mockCategory);

        expect(getByText(mockCategory.title)).toBeInTheDocument();
        expect(getByTestId('category-header')).toBeInTheDocument();
    });
});