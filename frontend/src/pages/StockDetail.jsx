import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchStockData} from '../services/api';
import StockChart from '../components/StockChart';
import Header from "../components/Header";
import {useAuth} from "../hooks/useAuthRedirect";

const StockDetail = () => {
    useAuth();
    const {ticker} = useParams();
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchStockData(ticker);
            setStockData(data);
            setLoading(false);
        };
        loadData();
    }, [ticker]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-800 p-8">
                <Header/>
                <div className="container mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!stockData) {
        return <div className="text-center p-8">Brak danych</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-800 p-8">
            <Header/>
            <div className="container mx-auto">

                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                    {stockData[0].toUpperCase()}
                </h1>

                <div className="bg-white dark:bg-gray-300 rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-800">
                        Historia cen
                    </h2>
                    <div className="container mx-auto px-4">
                        <StockChart data={stockData[1]}/>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                        Szczegółowe dane
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                            <tr className="border-b">
                                <th className="text-left p-2 text-gray-800 dark:text-white">Data</th>
                                <th className="text-right p-2 text-gray-800 dark:text-white">Cena zamknięcia</th>
                            </tr>
                            </thead>
                            <tbody>
                            {stockData[1].map((entry, i) => (
                                <tr key={i} className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className="p-2 text-gray-800 dark:text-white">{entry.Date}</td>
                                    <td className="text-right p-2 text-gray-800 dark:text-white">
                                        {entry.Close} PLN
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetail;