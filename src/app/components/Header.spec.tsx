import { render } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    it('renders the header with Dashboard and Profile links', () => {
        const { getByText } = render(<Header />);
        
        expect(getByText('Dashboard')).toBeInTheDocument();
        expect(getByText('Profile')).toBeInTheDocument();
    });

    it('has correct link paths', () => {
        const { container } = render(<Header />);
        
        const dashboardLink = container.querySelector('a[href="/"]');
        const profileLink = container.querySelector('a[href="/profile"]');
        
        expect(dashboardLink).toBeInTheDocument();
        expect(profileLink).toBeInTheDocument();
    });
});