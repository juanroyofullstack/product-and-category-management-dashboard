import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { rowsInfo, RowStateSelectText } from '../../lib/features/rowsInfoSlice';

const RowHeader = ({
    row,
    handleChange,
}: {
    row: rowsInfo;
    handleChange: (e: SelectChangeEvent) => void;
}) => {
    return (
        <div className="flex justify-between w-full p-4" data-testid="row-header">
            <div className="flex flex-row justify-between items-center w-full gap-4">
                <h2 className="text-lg font-bold text-black">{row.title}</h2>
                <Select
                    labelId="demo-simple-select-label"
                    className="justify-self-start"
                    id="demo-simple-select"
                    value={RowStateSelectText[row.state]}
                    label="Position"
                    onChange={handleChange}
                >
                    <MenuItem value={RowStateSelectText.start}>Left</MenuItem>
                    <MenuItem value={RowStateSelectText.center}>Center</MenuItem>
                    <MenuItem value={RowStateSelectText.end}>Right</MenuItem>
                </Select>
            </div>
        </div>
    );
};

export default RowHeader;