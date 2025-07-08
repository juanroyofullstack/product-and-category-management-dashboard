'use client';

import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import Header from './components/Header';
import RowContainer from './containers/RowContainer';
import { selectRows, selectDataIsLoading, selectDataIsFetchedWithoutErrors, selectDataIsLoadedWithErrors } from './lib/selectors/selectors';
import { useAppSelector, useAppDispatch } from './lib/hooks';
import { fetchData } from './lib/features/dataFetchSlice';
import Row from './components/Row';

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
    );
}
