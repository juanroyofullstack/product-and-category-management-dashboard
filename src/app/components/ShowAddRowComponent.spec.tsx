import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAppDispatch } from '../lib/hooks';
import { store } from '../lib/store';
import ShowAddRowComponent from './ShowAddRowComponent';

jest.mock('../lib/hooks', () => ({
    ...jest.requireActual('../lib/hooks'),
    useAppDispatch: jest.fn(),
}));

describe('ShowAddRowComponent', () => {
    const mockDispatch = jest.fn();
    const useAppDispatchMock = useAppDispatch as jest.Mock;
    
    beforeEach(() => {
        jest.clearAllMocks();
        useAppDispatchMock.mockReturnValue(mockDispatch);
    });

    const renderComponent = () => {
        return render(
            <Provider store={store}>
                <ShowAddRowComponent />
            </Provider>,
        );
    };

    it('renders Add Row button when showAddRow is false', () => {
        const { getByText } = renderComponent();
        expect(getByText('Add Row')).toBeInTheDocument();
    });

    it('shows input and Save Row button when Add Row button is clicked', async () => {
        const { getByText, getByTestId, getByPlaceholderText } = renderComponent();
        const addButton = getByTestId('add-row-button');
        
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(getByPlaceholderText('Enter row title')).toBeInTheDocument();
            expect(getByText('Save Row')).toBeInTheDocument();
        });
    });

    it('allows typing in the input field', async () => {
        const { getByTestId, getByPlaceholderText } = renderComponent();
        const addButton = getByTestId('add-row-button');
        
        fireEvent.click(addButton);

        await waitFor(() => {
            const input = getByPlaceholderText('Enter row title');
            fireEvent.change(input, { target: { value: 'Test Row Title' } });
            expect(input).toHaveValue('Test Row Title');
        });
    });

    it('Save Row button is disabled when input is empty', async () => {
        const { getByTestId, getByText } = renderComponent();
        const addButton = getByTestId('add-row-button');
        
        fireEvent.click(addButton);

        await waitFor(() => {
            const saveButton = getByText('Save Row');
            expect(saveButton).toBeDisabled();
        });
    });

    it('Save Row button is enabled when input has value', async () => {
        const { getByTestId, getByText, getByPlaceholderText } = renderComponent();
        const addButton = getByTestId('add-row-button');
        
        fireEvent.click(addButton);

        await waitFor(async () => {
            const input = getByTestId('row-name-input');
            expect(input).toBeInTheDocument();
            fireEvent.change(input, { target: { value: 'Test Row Title' } });
            
            const saveButton = getByText('Save Row');
            expect(saveButton).not.toBeDisabled();
        });
    });

    it('dispatches addRow action and resets form when Save Row is clicked', async () => {
        const { getByTestId, getByText } = renderComponent();
        const addButton = getByTestId('add-row-button');
        
        fireEvent.click(addButton);

        await waitFor(async () => {
            const input = getByTestId('row-name-input');
            fireEvent.change(input, { target: { value: 'Test Row Title' } });
            expect(input).toHaveValue('Test Row Title');
            const saveButton = getByTestId('save-row-button');
            expect(saveButton).toBeInTheDocument();

            fireEvent.click(saveButton);

            expect(mockDispatch).toHaveBeenCalledWith(
                {
                    type: 'rows/addRow',
                    payload: {
                        title: 'Test Row Title',
                        state: 'start',
                        productsCount: 0,
                    },
                },
            );
        });
    });
});