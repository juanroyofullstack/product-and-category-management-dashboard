'use client';

import Header from './components/Header';
import RowContainer from './containers/RowContainer';
import { AppCreatedProvider } from './lib/context/getModifyProductContext';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <AppCreatedProvider>
                <Header />
                <RowContainer />
            </AppCreatedProvider>
        </div>
    );
}
