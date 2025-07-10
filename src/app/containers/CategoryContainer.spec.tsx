import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import CategoryContainer from './CategoryContainer';

const renderComponent = () => {
    return render(
        <Provider store={store}>
            <CategoryContainer>
                <div>Child Component</div>
            </CategoryContainer>
        </Provider>,
    );
};
describe('CategoryContainer', () => {    
    it('renders CategoryContainer with children', () => {
        const { getByText } = renderComponent();

        expect(getByText('Child Component')).toBeInTheDocument();
    });

    it('renders CategoryContainer with Zoom Controls', () => {
        const { getByTestId } = renderComponent();

        expect(getByTestId('zoom-controls')).toBeInTheDocument();
    });

    it('renders CategoryContainer with ShowAddCategoryComponent', () => {
        const { getByTestId } = renderComponent();

        expect(getByTestId('add-category-button')).toBeInTheDocument();
    });
});