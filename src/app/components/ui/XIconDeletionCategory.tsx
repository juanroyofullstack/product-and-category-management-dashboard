import { DragIndicator } from '@mui/icons-material';
import { categoriesInfo } from '../../lib/features/categoriesInfoSlice';
import DeletionModal from '../DeletionModal';

interface XIconDeletionCategoryProps {
    category: categoriesInfo;
}

const XIconDeletionCategory = ({
    category,
}: XIconDeletionCategoryProps) => { 
    return (
        <div className="flex flex-category justify-between items-center gap-4" data-testid="x-icon-deletion-category">
            <div className="w-min">
                <DragIndicator className="cursor-move text-gray-500 hover:text-gray-700" />
            </div>
            <DeletionModal categoryId={category.id} />
        </div>
    );
};

export default XIconDeletionCategory;