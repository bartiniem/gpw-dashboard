import React, {useState, useEffect} from 'react';
import './styles/index.css';
import StockCard from './components/StockCard';
import SimpleForm from './components/SimpleForm';
import Footer from './components/Footer';
import {fetchStocks, fetchStockData} from './services/api';

function App() {
    const [stocks, setStocks] = useState([]);

    async function loadStocks() {
        const tickers = await fetchStocks('1');
        Promise.all(tickers.map(fetchStockData)).then(setStocks);
    };

    useEffect(() => {
        loadStocks();
    }, []);

    return (
        <div className="w-full gap-6 p-4 bg-white dark:bg-gray-800">
            <h1 className="text-3xl text-center text-gray-800 dark:text-white font-semibold mb-4 border-b pb-2">
                📊 GPW Dashboard
            </h1>
            <div className="container mx-auto px-4">
                <div className="bg-indigo-500 text-white p-4 rounded">
                    Tailwind działa!
                </div>
                <SimpleForm onReload={loadStocks}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                    {stocks.map((data, i) => (
                        <div className="bg-white shadow rounded p-6">
                            <StockCard key={i} data={data} onReload={loadStocks}/>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;