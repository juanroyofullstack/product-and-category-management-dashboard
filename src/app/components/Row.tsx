import { rowsInfo} from '../lib/features/rowsInfoSlice';
import { selectProductsByRow } from '../lib/selectors/selectors';
import { useAppSelector } from '../lib/hooks';

const Row = ({ row }:{ row: rowsInfo }) => {
    const products = useAppSelector(state => selectProductsByRow(state, row.id));

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            {row ? (
                <div key={row.id} className={`flex juatify-${row.state} w-full p-4 border rounded-lg`}>
                    <h2 className="text-lg font-bold">{row.title}</h2>
                    <div className="flex flex-wrap items-center justify-center w-full h-full gap-4">
                        {products && products.map((product) => (
                            <div key={product.id} className="p-4 border rounded">
                                {product.title && <h3 className="text-md font-semibold">{product.title}</h3>}
                            </div>
                        ))}
                    </div>
                </div>
                
            ) : (
                <p>No rows available</p>
            )}
        </div>
    );
};

export default Row;