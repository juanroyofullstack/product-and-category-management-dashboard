import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { rowsInfo, RowStateSelectText } from '../../lib/features/rowsInfoSlice';

interface RowHeaderProps {
    row: rowsInfo;
    handleChange: (e: SelectChangeEvent) => void;
}

const RowHeader = ({
    row,
    handleChange,
}: RowHeaderProps) => {
    return (
        <div className="flex justify-between w-full p-4" data-testid="row-header">
            <div className="flex flex-row justify-between items-center w-full gap-4">
                <h2 className="text-lg font-bold text-black">{row.title}</h2>
                <Select
                    className="justify-self-start text-black"
                    value={RowStateSelectText[row.state]}
                    onChange={handleChange}
                    sx={{ color: 'black' }}

                >
                    <MenuItem
                        value={RowStateSelectText.start}
                        sx={{ color: 'black' }}
                    >
                        Left
                    </MenuItem>
                    <MenuItem value={RowStateSelectText.center} 
                        sx={{ color: 'black' }}
                    >
                        Center
                    </MenuItem>
                    <MenuItem value={RowStateSelectText.end}
                        sx={{ color: 'black' }}
                    >
                        Right
                    </MenuItem>
                </Select>
            </div>
        </div>
    );
};

export default RowHeader;