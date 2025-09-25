import React, { useState, useEffect } from 'react';
import StockCard from './components/StockCard';
import SimpleForm from './components/SimpleForm';
import { fetchStocks, fetchStockData, addStockTicker } from './services/api';

function App() {
  const [stocks, setStocks] = useState([]);
  const [newTicker, setNewTicker] = useState('');

  const loadStocks = () => {
    const tickers = ['cdr', 'pko', 'kgh'];
    const a = fetchStocks('1');
    console.log("a:" + a);
    Promise.all(tickers.map(fetchStockData)).then(setStocks);
  };

  useEffect(() => {
    loadStocks();
  }, []);

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (!newTicker) return;
    await addStockTicker(newTicker); // wywołanie backendu
    setNewTicker('');
    loadStocks(); // odświeżenie dashboardu
  };

  return (
    <div>
      <h1>📊 GPW Dashboard</h1>
      <SimpleForm />

      {stocks.map((data, i) => (
        <StockCard key={i} data={data} />
      ))}

    </div>
  );
}

export default App;