export const mockData = {
    data: {
        products: [
            {
                id: 1,
                title: 'Mock Product 1',
                description: 'This is a mock product description.',
                image: 'https://via.placeholder.com/150',
                price: 29.99,
                row: 1,
            },
            {
                id: 2,
                title: 'Mock Product 2',
                description: 'This is another mock product description.',
                image: 'https://via.placeholder.com/150',
                price: 39.99,
                row: 2,
            },
        ],
        rows: [
            {
                id: 1,
                title: 'Row 1',         
                state: 'start',
                productsCount: 1,
            },
            {
                id: 2,  
                title: 'Row 2',
                state: 'center',
                productsCount: 1,
            },
            {
                id: 3,
                title: 'Row 3',
                state: 'end',
                productsCount: 0,
            },
        ],
    },
    status: 'success',
    message: 'Mock data fetched successfully',
    error: null,
    loading: false,
    timestamp: new Date().toISOString(),
    totalProducts: 2,
    totalRows: 3,
    version: '1.0.0',
    apiVersion: 'v1',
};

