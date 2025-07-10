import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeletionTrigger from './DeletionTrigger';

const renderComponent = (props: any) => {
    return render(<DeletionTrigger {...props} />);
};

describe('DeletionTrigger', () => {
    const onDelete = jest.fn();
    const onToggleDeleteButton = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders CloseIcon and calls onDelete when clicked and then clicks delete product on isProductTrigger', async () => {
        const { getByTestId } = renderComponent({ isProductTrigger: true, onToggleDeleteButton, onDelete, showDeleteButton: true });
        
        expect(getByTestId('deletion-trigger-product')).toBeInTheDocument();

        fireEvent.click(getByTestId('show-delete-button'));

        expect(onToggleDeleteButton).toHaveBeenCalledTimes(1);
        expect(getByTestId('delete-product')).toBeInTheDocument();

        fireEvent.click(getByTestId('delete-product'));

        expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('renders CloseIcon and calls onDelete when clicked on isProductTrigger false', () => {
        const { getByTestId } = renderComponent({ isProductTrigger: false, onDelete });

        expect(getByTestId('deletion-trigger-category')).toBeInTheDocument();

        fireEvent.click(getByTestId('deletion-trigger-category'));

        expect(onDelete).toHaveBeenCalledTimes(1);
    });
});
