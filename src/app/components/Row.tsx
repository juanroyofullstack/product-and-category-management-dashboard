import CloseIcon from '@mui/icons-material/Close';
import { rowsInfo} from '../lib/features/rowsInfoSlice';
import Products from '../components/Products';

const Row = ({ row }:{ row: rowsInfo }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {row ? (
                <div key={row.id} className={`flex justify-${row.state} w-full p-4 border rounded-lg`}>
                    <h2 className="text-lg font-bold">{row.title}</h2>
                    <div className="flex flex-wrap items-center justify-center w-full h-full gap-4">
                        <Products rowId={row.id}/>
                        <CloseIcon 
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => {
                                // Dispatch action to remove product from row
                            }}
                        />
                    </div>   
                </div>
            ) : (
                <p>No rows available</p>
            )}
        </div>
    );
};

export default Row;