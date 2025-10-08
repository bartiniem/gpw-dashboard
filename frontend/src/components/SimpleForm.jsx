import React, {useState} from 'react';
import {fetchMessage} from '../services/api_utils';
import {FaSpinner} from 'react-icons/fa';
import {usePersistedWalletCode} from "../hooks/usePersistedWalledCode";

const SimpleForm = ({onReload}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleClick = async () => {

        const confirmed = window.confirm(`Czy na pewno chcesz dodać spółkę ${inputValue}?`);

        if (!confirmed) {
            return;
        }

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
            <div className="flex items-center justify-center gap-2">
                <span className="text-black dark:text-white">Spółka:</span>
                <input
                    id="ticker_input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                />
                <button onClick={handleClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                        disabled={loading}>
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <FaSpinner className="animate-spin"/>
                            Ładowanie...
                        </span>
                    ) : ('Dodaj spółkę')}
                </button>
            </div>
            <p className="text-black dark:text-white mt-2">{message}</p>
        </div>
    );
}

export default SimpleForm;
