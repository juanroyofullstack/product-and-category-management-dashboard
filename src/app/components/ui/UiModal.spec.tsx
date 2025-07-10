import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UiModal, { DeletionModalProps } from './UiModal';

const defaultProps: DeletionModalProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item?',
};

describe('UiModal', () => {
    it('renders the modal with title and description', () => {
        const { getByText } = render(<UiModal {...defaultProps} />);

        expect(getByText(defaultProps.title)).toBeInTheDocument();
        expect(getByText(defaultProps.description)).toBeInTheDocument();
    });

    it('renders Delete and Cancel buttons', () => {
        const { getByText } = render(<UiModal {...defaultProps} />);

        expect(getByText('Delete')).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
    });

    it('calls onConfirm when Delete button is clicked', () => {
        const { getByText } = render(<UiModal {...defaultProps} />);
        fireEvent.click(getByText('Delete'));

        expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Cancel button is clicked', () => {
        const { getByText } = render(<UiModal {...defaultProps} />);

        fireEvent.click(getByText('Cancel'));

        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not render modal content when isOpen is false', () => {
        const { queryByText } = render(<UiModal {...defaultProps} isOpen={false} />);

        expect(queryByText(defaultProps.title)).not.toBeInTheDocument();
        expect(queryByText(defaultProps.description)).not.toBeInTheDocument();
    });
});