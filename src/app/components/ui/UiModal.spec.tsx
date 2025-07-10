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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the modal with title and description', () => {
        render(<UiModal {...defaultProps} />);
        expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    });

    it('renders Delete and Cancel buttons', () => {
        render(<UiModal {...defaultProps} />);
        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('calls onConfirm when Delete button is clicked', () => {
        render(<UiModal {...defaultProps} />);
        fireEvent.click(screen.getByText('Delete'));
        expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Cancel button is clicked', () => {
        render(<UiModal {...defaultProps} />);
        fireEvent.click(screen.getByText('Cancel'));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not render modal content when isOpen is false', () => {
        render(<UiModal {...defaultProps} isOpen={false} />);
        expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
        expect(screen.queryByText(defaultProps.description)).not.toBeInTheDocument();

    });
});