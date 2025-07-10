import React from 'react';
import { render } from '@testing-library/react';
import { categoriesInfo, CategoryState } from '../../lib/features/categoriesInfoSlice';
import XIconDeletionCategory from './XIconDeletionCategory';

jest.mock('../DeletionModal', () => (props: any) => (
    <div data-testid="deletion-modal-mock">{props.categoryId}</div>
));
jest.mock('@mui/icons-material', () => ({
    DragIndicator: (props: any) => <div data-testid="drag-indicator" {...props} />,
}));

const mockCategory: categoriesInfo = {
    id: 1,
    title: 'Test Category',
    state: CategoryState.LEFT,
    productsCount: 1,
};

describe('XIconDeletionCategory', () => {
    it('renders the component with correct test id', () => {
        const { getByTestId } = render(<XIconDeletionCategory category={mockCategory} />);
      
        expect(getByTestId('x-icon-deletion-category')).toBeInTheDocument();
    });

    it('renders the DragIndicator icon', () => {
        const { getByTestId } = render(<XIconDeletionCategory category={mockCategory} />);
       
        expect(getByTestId('drag-indicator')).toBeInTheDocument();
    });

    it('renders the DeletionModal with correct categoryId', () => {
        const { getByTestId } = render(<XIconDeletionCategory category={mockCategory} />);
     
        expect(getByTestId('deletion-modal-mock')).toHaveTextContent(/1/i);
    });

    it('applies correct classes to the container', () => {
        const { getByTestId } = render(<XIconDeletionCategory category={mockCategory} />);

        expect(getByTestId('x-icon-deletion-category')).toHaveClass('flex', 'flex-category', 'justify-between', 'items-center', 'gap-4');
    });
});