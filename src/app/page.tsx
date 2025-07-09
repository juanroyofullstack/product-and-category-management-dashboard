'use client';

import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import RowContainer from './containers/RowContainer';
import { selectRows, selectDataIsLoading, selectDataIsFetchedWithoutErrors, selectDataIsLoadedWithErrors } from './lib/selectors/selectors';
import { useAppSelector, useAppDispatch } from './lib/hooks';
import { fetchData } from './lib/features/dataFetchSlice';
import Row from './components/Row';

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
    const rows = useAppSelector(selectRows);
    const isDataLoading = useAppSelector(selectDataIsLoading);
    const isDataLoadedWithoutError = useAppSelector(selectDataIsFetchedWithoutErrors);
    const isDataWithError = useAppSelector(selectDataIsLoadedWithErrors);
    
    const hasRows = rows.length > 0;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                <Header />
                {isDataLoading && (
                    <div className="flex items-center justify-center w-full h-full pt-40">
                        <CircularProgress />
                    </div>
                )}
                {isDataLoadedWithoutError && hasRows && (
                    <RowContainer>
                        {rows.map((row) => (
                            <div key={row.id} className='w-full'>
                                <Row row={row} />
                            </div>
                        ))}
                    </RowContainer>
                )}
                {isDataWithError && (
                    <div className="flex items-center justify-center w-full h-full pt-40">
                        <p className="text-red-500">Error loading data. Please try again later.</p>
                    </div>
                )}
                {!isDataLoading && !hasRows && (
                    <div className="flex items-center justify-center w-full h-full pt-40">
                        <p className="text-gray-500">No rows available. Please add a row.</p>
                    </div>
                )}
            </div>
        </ThemeProvider>

    );
}
