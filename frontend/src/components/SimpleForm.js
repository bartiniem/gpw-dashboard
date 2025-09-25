import React, { useState } from 'react';
import { fetchMessage } from '../services/api';

const SimpleForm = () => {
    const [message, setMessage] = useState('');

    const handleClick = async () => {
        const msg = await fetchMessage();
        setMessage(msg);
    };

    return (
    <div>
        <button onClick={handleClick}>Pobierz wiadomość</button>
        <p>{message}</p>
    </div>
    );
}

export default SimpleForm;
