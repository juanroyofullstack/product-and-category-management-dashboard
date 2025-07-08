import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import RowContainer from './RowContainer';

const renderComponent = () => {
    return render(
        <Provider store={store}>
            <RowContainer>
                <div>Child Component</div>
            </RowContainer>
        </Provider>,
    );
};
describe('RowContainer', () => {    
    it('renders RowContainer with children', () => {
        const { getByText } = renderComponent();

        expect(getByText('Child Component')).toBeInTheDocument();
    });

    it('renders RowContainer with Zoom Controls', () => {
        const { getByTestId } = renderComponent();

        expect(getByTestId('zoom-controls')).toBeInTheDocument();
    });

    it('renders RowContainer with ShowAddRowComponent', () => {
        const { getByTestId } = renderComponent();

        expect(getByTestId('add-row-button')).toBeInTheDocument();
    });
});