import React, { useState } from 'react';
import { fetchMessage } from '../services/api';
import { FaSpinner } from 'react-icons/fa';

const SimpleForm = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const msg = await fetchMessage();
        setMessage(msg);
        setLoading(false);
    };

    return (
    <div>
        <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin" />
              Ładowanie...
            </span>
          ) : (
            'Pobierz wiadomość'
          )}
        </button>
        <p class="text-black dark:text-white">{message}</p>
    </div>
    );
}

export default SimpleForm;
