'use client';

import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { addRow, RowState } from '../lib/features/rowsInfoSlice';

import { updateProduct } from '../lib/features/productsInfoSlice';
import Row from '../components/Row';
import { selectRows } from '../lib/selectors/selectors';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { rowsInfo, reorderRows } from '../lib/features/rowsInfoSlice';


const SortableRow = ({ row, ...props }: { row: rowsInfo }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: row.id,  data: { type: 'row' } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: '100%',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Row row={row} {...props} />
        </div>
    );
};


const RowContainer = () => { 
    const [showAddRow, setShowAddRow] = useState(false);
    const [rowName, setRowName] = useState('');

    const rows = useAppSelector(selectRows);

    const dispatch = useAppDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = rows.findIndex(row => row.id === active.id);
            const newIndex = rows.findIndex(row => row.id === over?.id);
            dispatch(reorderRows(arrayMove(rows, oldIndex, newIndex)));
        }
    };
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={rows.map(row => row.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="RowContainer flex flex-col items-center justify-center w-full h-full pt-20 px-6 gap-4" >
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <SortableRow key={row.id} row={row} />
                        ))) : null}

                    {!showAddRow && <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowAddRow(!showAddRow)}
                    >
                Add Row
                    </Button>}

                    {showAddRow && (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                            <Box
                                component="form"
                                onSubmit={e => {
                                    e.preventDefault();
                                    setShowAddRow(false);
                                    dispatch(addRow({ id: Date.now(), title: rowName, state: RowState.LEFT, productsCount: 0 }));
                                    setRowName('');
                                }
                                }>
                                <input
                                    type="text"
                                    placeholder="Enter row title"
                                    className="p-2 border rounded"
                                    onChange={(e) => setRowName(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    type='submit'
                                    disabled={!rowName}
                                >
                        Save Row
                                </Button>
                            </Box>
                        </div>
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default RowContainer;