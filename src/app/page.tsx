'use client';

import Header from './components/Header';
import RowContainer from './containers/RowContainer';
import { AppCreatedProvider } from './lib/context/getModifyProductContext';
import { selectRows } from './lib/selectors/selectors';
import { useAppSelector } from './lib/hooks';
import Row from './components/Row';

export default function Home() {
    const rows = useAppSelector(selectRows);
    const hasRows = rows.length > 0;
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <AppCreatedProvider>
                <Header />
                <RowContainer>
                    {hasRows ? (
                        rows.map((row) => (
                            <div key={row.id} className='w-full'>
                                <Row row={row} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No rows available</div>
                    )}
                </RowContainer>
            </AppCreatedProvider>
        </div>
    );
}
