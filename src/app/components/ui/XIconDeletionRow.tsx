import { DragIndicator } from '@mui/icons-material';
import { rowsInfo } from '../../lib/features/rowsInfoSlice';
import RefactoredDeletionModal from '../DeletionModal';

interface XIconDeletionRowProps {
    row: rowsInfo;
    handleDragStartRow: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragEnd: () => void;
}

const XIconDeletionRow = ({
    row,
    handleDragStartRow,
    handleDragEnd,
}: XIconDeletionRowProps) => { 
    return (
        <div className="flex flex-row justify-between items-center gap-4" data-testid="x-icon-deletion-row">
            <div className="w-min"
                onDragStart={handleDragStartRow}
                onDragEnd={handleDragEnd}
                draggable>
                <DragIndicator className="cursor-move text-gray-500 hover:text-gray-700" />
            </div>
            <RefactoredDeletionModal rowId={row.id} />
        </div>
    );
};

export default XIconDeletionRow;