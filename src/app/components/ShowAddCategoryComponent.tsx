import React, { useState, FormEvent } from 'react';
import { Button, Box } from '@mui/material';
import { useAppDispatch } from '../lib/hooks';
import useClickOutside from '../lib/hooks/useClickOutside';
import { addCategory, CategoryState } from '../lib/features/categoriesInfoSlice';

const ShowAddCategoryComponent = () => {
    const [categoryName, setCategoryName] = useState('');
    const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(false);
    const dispatch = useAppDispatch();
    
    const handleAddCategoryClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsComponentVisible(false);
        dispatch(addCategory({ id: Date.now(), title: categoryName, state: CategoryState.LEFT, productsCount: 0 }));
        setCategoryName('');
    };

    if (!isComponentVisible) {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsComponentVisible(true)}
                data-testid="add-category-button"
            >
                Add Category
            </Button>
        );
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4" ref={ref}>
            <Box
                component="form"
                onSubmit={e => handleAddCategoryClick(e)}
            >
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Enter category title"
                        className="p-2 border rounded"
                        onChange={(e) => setCategoryName(e.target.value)}
                        data-testid="category-name-input"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type='submit'
                        disabled={!categoryName}
                        data-testid="save-category-button"
                    >
                        Save Category
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default ShowAddCategoryComponent;