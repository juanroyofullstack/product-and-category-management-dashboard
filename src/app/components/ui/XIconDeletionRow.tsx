import { DragIndicator } from '@mui/icons-material';
import { rowsInfo } from '../../lib/features/rowsInfoSlice';
import RefactoredDeletionModal from '../DeletionModal';

interface XIconDeletionRowProps {
    category: rowsInfo;
}

const XIconDeletionRow = ({
    category,
}: XIconDeletionRowProps) => { 
    return (
        <div className="flex flex-category justify-between items-center gap-4" data-testid="x-icon-deletion-category">
            <div className="w-min">
                <DragIndicator className="cursor-move text-gray-500 hover:text-gray-700" />
            </div>
            <RefactoredDeletionModal rowId={category.id} />
        </div>
    );
};

export default XIconDeletionRow;