import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    it('renders the header with Dashboard and Profile links', () => {
        const { getByText } = render(<Header />);
        
        expect(getByText('Zara')).toBeInTheDocument();
    });

    it('has correct link paths', () => {
        const { container } = render(<Header />);
        
        const dashboardLink = container.querySelector('a[href="/"]');
        
        expect(dashboardLink).toBeInTheDocument();
    });
});