import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import StockChart from './StockChart';
import {BsFillTrash3Fill} from 'react-icons/bs';

const API_URL = process.env.REACT_APP_API_URL;

const StockCard = ({data, onReload}) => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    let sublist = data[1].slice(-3);
    sublist.reverse();

    const handleDelete = async (stock) => {
        const confirmed = window.confirm(`Czy na pewno chcesz usunąć spółkę ${stock}?`);

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/stocks/${stock}/delete`, {
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

    const handleHeaderClick = () => {
        navigate(`/stock/${data[0]}`);
    };

    return (
        <div className="p-2 bg-white border-2 border-gray-300 dark:bg-white rounded shadow">
            <div className="flex items-center justify-between mb-2">
                <h2
                    className="font-bold cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={handleHeaderClick}
                    title="Kliknij aby zobaczyć szczegóły"
                >
                    {data[0].toUpperCase()}
                </h2>
                <div>{message}</div>
                <button className="bg-red-500 dark:bg-dark-red text-white px-3 py-2 rounded flex items-center gap-2"
                        onClick={() => handleDelete(data[0])}>
                    <BsFillTrash3Fill/>
                </button>
            </div>
            <div className="container mx-auto px-4">
                <StockChart data={data[1]}/>
            </div>
            <ul>
                {sublist.map((entry, i) => (
                    <li key={i}>
                        {entry.Date}: {entry.Close} PLN
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockCard;
