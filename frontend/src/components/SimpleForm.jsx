import React, {useState} from 'react';
import {fetchMessage} from '../services/api';
import {FaSpinner} from 'react-icons/fa';

const SimpleForm = ({onReload}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleClick = async () => {
        setLoading(true);
        const msg = await fetchMessage(inputValue);
        setMessage(msg);
        setLoading(false);
        if (onReload) onReload();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="p-4">
            <span className="p-4 text-black dark:text-white">Instrument:</span>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            />
            <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    disabled={loading}>
                {loading ? (
                    <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin"/>
              Ładowanie...
            </span>
                ) : (
                    'Pobierz wiadomość'
                )}
            </button>
            <p className="text-black dark:text-white">{message}</p>
        </div>
    );
}

export default SimpleForm;
