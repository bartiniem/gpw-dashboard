import React, {useEffect, useState} from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function Protected() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(`${API_URL}/api/protected`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setMessage(res.data.message))
            .catch(err => setMessage('Brak dostępu'));
    }, []);

    return <h3>{message}</h3>;
}

export default Protected;