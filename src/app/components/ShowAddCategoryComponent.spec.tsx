import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAppDispatch } from '../lib/hooks';
import { store } from '../lib/store';
import ShowAddCategoryComponent from './ShowAddCategoryComponent';

jest.mock('../lib/hooks', () => ({
    ...jest.requireActual('../lib/hooks'),
    useAppDispatch: jest.fn(),
}));

describe('ShowAddCategoryComponent', () => {
    const mockDispatch = jest.fn();
    const useAppDispatchMock = useAppDispatch as jest.Mock;
    
    beforeEach(() => {
        jest.clearAllMocks();
        useAppDispatchMock.mockReturnValue(mockDispatch);
    });

    const renderComponent = () => {
        return render(
            <Provider store={store}>
                <ShowAddCategoryComponent />
            </Provider>,
        );
    };

    it('renders Add Category button when showAddCategory is false', () => {
        const { getByText } = renderComponent();
        expect(getByText('Add Category')).toBeInTheDocument();
    });

    it('shows input and Save Category button when Add Category button is clicked', async () => {
        const { getByText, getByTestId, getByPlaceholderText } = renderComponent();
        const addButton = getByTestId('add-category-button');
        
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(getByPlaceholderText('Enter category title')).toBeInTheDocument();
            expect(getByText('Save Category')).toBeInTheDocument();
        });
    });

    it('allows typing in the input field', async () => {
        const { getByTestId, getByPlaceholderText } = renderComponent();
        const addButton = getByTestId('add-category-button');
        
        fireEvent.click(addButton);

        await waitFor(() => {
            const input = getByPlaceholderText('Enter category title');
            fireEvent.change(input, { target: { value: 'Test Category Title' } });
            expect(input).toHaveValue('Test Category Title');
        });
    });

    it('Save Category button is disabled when input is empty', async () => {
        const { getByTestId, getByText } = renderComponent();
        const addButton = getByTestId('add-category-button');
        
        fireEvent.click(addButton);

        await waitFor(() => {
            const saveButton = getByText('Save Category');
            expect(saveButton).toBeDisabled();
        });
    });

    it('Save Category button is enabled when input has value', async () => {
        const { getByTestId, getByText, getByPlaceholderText } = renderComponent();
        const addButton = getByTestId('add-category-button');
        
        fireEvent.click(addButton);

        await waitFor(async () => {
            const input = getByTestId('category-name-input');
            expect(input).toBeInTheDocument();
            fireEvent.change(input, { target: { value: 'Test Category Title' } });
            
            const saveButton = getByText('Save Category');
            expect(saveButton).not.toBeDisabled();
        });
    });

    it('dispatches addCategory action and resets form when Save Category is clicked', async () => {
        const { getByTestId, getByText } = renderComponent();
        const addButton = getByTestId('add-category-button');
        
        fireEvent.click(addButton);

        await waitFor(async () => {
            const input = getByTestId('category-name-input');
            fireEvent.change(input, { target: { value: 'Test Category Title' } });
            expect(input).toHaveValue('Test Category Title');
            const saveButton = getByTestId('save-category-button');
            expect(saveButton).toBeInTheDocument();

            fireEvent.click(saveButton);

            expect(mockDispatch).toHaveBeenCalledWith(
                {
                    type: 'categories/addCategory',
                    payload: {
                        title: 'Test Category Title',
                        state: 'start',
                        productsCount: 0,
                    },
                },
            );
        });
    });
});