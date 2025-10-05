'use client';

import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchData } from './lib/features/dataFetchSlice';
import { 
    selectCategory, 
    selectDataIsLoading, 
    selectDataIsFetchedWithoutErrors, 
    selectDataIsLoadedWithErrors } 
    from './lib/selectors/selectors';
import CategoryContainer from './containers/CategoryContainer';
import Header from './components/Header';
import ShowAddCategoryComponent from './components/ShowAddCategoryComponent';
import { useAppSelector, useAppDispatch } from './lib/hooks';
import Category from './components/Category';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            light: '#2c2c2c',
            dark: '#000000',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#1a1a1a',
            light: '#404040',
            dark: '#000000',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#ffffff',
            secondary: '#000000',
        },
    },
});

export default function Home() {
    const categories = useAppSelector(selectCategory);
    const isDataLoading = useAppSelector(selectDataIsLoading);
    const isDataLoadedWithoutError = useAppSelector(selectDataIsFetchedWithoutErrors);
    const isDataWithError = useAppSelector(selectDataIsLoadedWithErrors);
    
    const hasCategories = categories.length > 0;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <div className="flex flex-col items-center justify-center w-full h-full pb-4 gap-4">
                <Header />
                {isDataLoadedWithoutError && hasCategories && (
                    <CategoryContainer>
                        {categories.map((category) => (
                            <div key={category.id} className='w-full'>
                                <Category category={category} />
                            </div>
                        ))}
                        {!isDataLoading && (
                            <ShowAddCategoryComponent/>
                        )}
                    </CategoryContainer>
                )}
                {isDataLoading && (
                    <div className="flex items-center justify-center w-full h-full pt-40">
                        <CircularProgress />
                    </div>
                )}
                {isDataWithError && (
                    <div className="flex items-center justify-center w-full h-full pt-40">
                        <p className="text-red-500">Error loading data. Please try again later.</p>
                    </div>
                )}
                {!isDataLoading && !hasCategories && isDataLoadedWithoutError &&(
                    <div className="flex items-center justify-center w-full h-full pt-40">
                        <p className="text-gray-500">No categories available. Please add a category.</p>
                    </div>
                )}
            </div>
        </ThemeProvider>

    );
}
