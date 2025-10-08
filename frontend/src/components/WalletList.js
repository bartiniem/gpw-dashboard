import React, {useEffect, useState} from 'react';
import {fetchWallets} from '../services/api_utils';

const WalletList = ({ onSelect }) => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    const load = async () => {
        try {
            setLoading(true);
            setErr('');
            const data = await fetchWallets();
            setWallets(data);
        } catch (e) {
            console.error('Wallets fetch error:', e);
            setErr('Nie udało się pobrać portfeli');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    if (loading) return <div className="p-4">Ładowanie portfeli...</div>;
    if (err) return (
        <div className="p-4 text-red-600 flex items-center gap-2">
            {err}
            <button onClick={load} className="ml-2 px-3 py-1 bg-gray-200 rounded">Spróbuj ponownie</button>
        </div>
    );

    if (!wallets.length) return (
        <div className="p-4">
            Brak portfeli. Dodaj pierwszy w aplikacji.
            <button onClick={load} className="ml-2 px-3 py-1 bg-gray-200 rounded">Odśwież</button>
        </div>
    );

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold dark:text-white">Twoje portfele</h2>
                <button onClick={load} className="px-3 py-1 bg-gray-200 rounded">Odśwież</button>
            </div>
            <ul className="space-y-2">
                {wallets.map(w => (
                    <li key={w.id}
                        className="p-3 bg-white dark:bg-gray-700 rounded shadow flex items-center justify-between">
                        <div>
                            <div className="font-medium text-gray-800 dark:text-white">{w.code}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-300">
                                Utworzono: {new Date(w.created_at).toLocaleString()}
                            </div>
                        </div>
                        {/* Miejsce na akcje, np. ustaw jako aktywny, usuń */}
                        <button
                            onClick={() => onSelect && onSelect(w.code)}
                            className="ml-4 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                            title="Załaduj ten portfel"
                        >
                            Wybierz
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WalletList;
