import { DragIndicator } from '@mui/icons-material';
import RefactoredDeletionModal from '../DeletionModal';
import { rowsInfo } from '../../lib/features/rowsInfoSlice';

const XIconDeletionRow = ({
    row,
    handleDragStartRow,
    handleDragEnd,
}: {
    row: rowsInfo;
    handleDragStartRow: () => void;
    handleDragEnd: () => void;
}) => { 
    return <div className="flex flex-row justify-between items-center gap-4">
        <div className="w-min"
            onDragStart={handleDragStartRow}
            onDragEnd={handleDragEnd}
            draggable>
            <DragIndicator className="cursor-move text-gray-500 hover:text-gray-700" />
        </div>
        <RefactoredDeletionModal rowId={row.id} />
    </div>;
};

export default XIconDeletionRow;