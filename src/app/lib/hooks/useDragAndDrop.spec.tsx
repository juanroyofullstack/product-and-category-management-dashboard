import { act } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../lib/store';

import { useDragAndDrop } from './useDragAndDrop';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
}));

function HookTestComponent({ callback }: { callback: (hook: ReturnType<typeof useDragAndDrop>) => void }) {
    const hook = useDragAndDrop();
    callback(hook);
    return null;
}

describe('useDragAndDrop', () => {
    let hookResult: any;

    afterEach(() => {
        jest.clearAllMocks();
        hookResult = undefined;
    });

    function renderHookWithProvider(callback: (hook: any) => void) {
        render(
            <Provider store={store}>
                <HookTestComponent callback={callback} />
            </Provider>,
        );
    }

    it('should return isDragging as false when first called', () => {
        renderHookWithProvider((hook) => {
            hookResult = hook;
        });
        expect(hookResult.isDragging).toBe(false);
    });

    it('should return isDragging as true when handleDragging is called with true as props', () => {
        renderHookWithProvider((hook) => {
            hookResult = hook;
        });

        act(() => {
            hookResult.handleDragging(true);
        });

        expect(hookResult.isDragging).toBe(true);
    });

    it('should call dispatch when handleUpdateList is called', () => {
        renderHookWithProvider((hook) => {
            hookResult = hook;
        });
        const mockProduct = {
            id: 1,
            title: 'Test Product',
            description: 'Test Description',
            image: 'https://via.placeholder.com/150',
            price: 100,
            category: 1,
        };

        act(() => {
            hookResult.handleUpdateList(mockProduct, 2);
        });

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'productsInfo/updateProduct',
            payload: { productId: 1, categoryId: 2 },
        });
    });

    it('should call dispatch when handleReorderCategories is called', () => {
        renderHookWithProvider((hook) => {
            hookResult = hook;
        });

        act(() => {
            hookResult.handleReordercategorys(1, 2);
        });

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'categorysInfo/reorderCategories',
            payload: { fromcategoryId: 1, tocategoryId: 2 },
        });
    });

    it('should call dispatch twice when handleUpdateCategories is called', () => {
        renderHookWithProvider((hook) => {
            hookResult = hook;
        });

        act(() => {
            hookResult.handleUpdateCategories(1, 2);
        });

        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch).toHaveBeenNthCalledWith(1, {
            type: 'categorysInfo/increaseCategoryProductCount',
            payload: 2,
        });
        expect(mockDispatch).toHaveBeenNthCalledWith(2, {
            type: 'categorysInfo/decreaseCategoryProductCount',
            payload: 1,
        });
    });

    it('should set isDragging to false when handleDragEnd is called', () => {
        renderHookWithProvider((hook) => {
            hookResult = hook;
        });

        act(() => {
            hookResult.handleDragging(true);
        });
        expect(hookResult.isDragging).toBe(true);

        act(() => {
            hookResult.handleDragEnd();
        });
        expect(hookResult.isDragging).toBe(false);
    });

    it('should toggle isDragging state correctly', () => {
        renderHookWithProvider((hook) => {
            hookResult = hook;
        });

        expect(hookResult.isDragging).toBe(false);

        act(() => {
            hookResult.handleDragging(true);
        });
        expect(hookResult.isDragging).toBe(true);

        act(() => {
            hookResult.handleDragging(false);
        });
        expect(hookResult.isDragging).toBe(false);
    });
});