import React, {useState} from 'react';
import StockChart from './StockChart';

const StockCard = ({data, onReload}) => {
    const [message, setMessage] = useState('');

    const handleDelete = async (stock) => {
        try {
            const response = await fetch(`http://localhost:5000/api/stocks/${stock}/delete`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({stock}),
            });
            const result = await response.json();
            setMessage(result.message);
            if (onReload) onReload();
        } catch (error) {
            setMessage('Błąd połączenia z backendem');
        }
    };

    return (
        <div className="p-4 bg-white border-2 border-gray-300 dark:bg-white rounded shadow">
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold">{data[0]}</h2>
                <div>{message}</div>
                <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
                        onClick={() => handleDelete(data[0])}>
                    X
                </button>
            </div>
            <ul>
                {data[1].map((entry, i) => (
                    <li key={i}>
                        {entry.Date}: {entry.Close} PLN
                    </li>
                ))}
            </ul>
            <div className="container mx-auto px-4">
                <StockChart data={data[1]}/>
            </div>
        </div>
    );
};

export default StockCard;
