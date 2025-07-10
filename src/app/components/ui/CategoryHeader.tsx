import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { categoriesInfo, CategoryStateSelectText } from '../../lib/features/categoriesInfoSlice';

interface CategoryHeaderProps {
    category: categoriesInfo;
    handleChange: (e: SelectChangeEvent) => void;
}

const CategoryHeader = ({
    category,
    handleChange,
}: CategoryHeaderProps) => {
    return (
        <div className="flex justify-between w-full p-4" data-testid="category-header">
            <div className="flex flex-category justify-between items-center w-full gap-4">
                <h2 className="text-lg font-bold text-black">{category.title}</h2>
                <Select
                    className="justify-self-start text-black"
                    value={CategoryStateSelectText[category.state]}
                    onChange={handleChange}
                    sx={{ color: 'black' }}

                >
                    <MenuItem
                        value={CategoryStateSelectText.start}
                        sx={{ color: 'black' }}
                    >
                        Left
                    </MenuItem>
                    <MenuItem value={CategoryStateSelectText.center} 
                        sx={{ color: 'black' }}
                    >
                        Center
                    </MenuItem>
                    <MenuItem value={CategoryStateSelectText.end}
                        sx={{ color: 'black' }}
                    >
                        Right
                    </MenuItem>
                </Select>
            </div>
        </div>
    );
};

export default CategoryHeader;