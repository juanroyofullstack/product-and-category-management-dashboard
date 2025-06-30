'use client';
import { Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../lib/hooks';

const RowContainer = () => { 
    const rows = useAppSelector((state) => state.rows);
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {rows.length > 0 ? (
                rows.map((row) => (
                    <div key={row.id} className={`flex ${row.state} w-full p-4 border rounded-lg`}>
                        <h2 className="text-xl font-bold">{row.title}</h2>
                    </div>
                ))) : null}
            <Button variant="contained" color="primary" onClick={() => useAppDispatch()}>
                Add Row
            </Button>
        </div>
    );
};

export default RowContainer;