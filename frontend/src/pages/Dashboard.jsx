import React, {useState, useEffect} from 'react';
import StockCard from '../components/StockCard';
import SimpleForm from '../components/SimpleForm';
import Footer from '../components/Footer';
import {fetchStocks, fetchStockData} from '../services/api';
import Header from "../components/Header";
import {useAuth} from "../hooks/useAuthRedirect";

const Dashboard = () => {
    useAuth();
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadStocks() {
        setLoading(true);
        const tickers = await fetchStocks('1');
        Promise.all(tickers.map(fetchStockData)).then((data) => {
            setStocks(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        loadStocks();
    }, []);

    useEffect(() => {
        document.title = `📊 GPW Dashboard ${stocks.length > 0 ? `(${stocks.length})` : ''}`;
    }, [stocks]);

    return (
        <div className="w-full gap-6 p-4 bg-white dark:bg-gray-800">
            <Header/>
            <h1 className="text-3xl text-center text-gray-800 dark:text-white font-semibold mb-4 border-b pb-2">
                📊 GPW Dashboard
            </h1>
            <div className="container mx-auto px-4">
                <div className="bg-indigo-500 text-white p-4 rounded">
                    <p className="text-center">
                        Dodaj spółki giełdowe notowane na GPW, aby śledzić ich ceny w czasie rzeczywistym!
                    </p>
                </div>
                <SimpleForm onReload={loadStocks}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 items-center justify-center">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-white shadow rounded p-6 border-2 border-gray-300 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-32 bg-gray-200 rounded mt-4"></div>
                            </div>
                        ))
                    ) : (
                        stocks.map((data, i) => (
                            <div key={i} className="bg-white shadow rounded p-2">
                                <StockCard data={data} onReload={loadStocks}/>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;