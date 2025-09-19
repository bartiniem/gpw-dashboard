import React, { useState, useEffect } from 'react';
import StockCard from './components/StockCard';
import { fetchStockData } from './services/api';

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const tickers = ['cdr', 'pko', 'kgh']; // przykładowe tickery GPW
    Promise.all(tickers.map(fetchStockData)).then(setStocks);
  }, []);

  return (
    <div>
      <h1>📊 GPW Dashboard</h1>
      {stocks.map((data, i) => (
        <StockCard key={i} data={data} />
      ))}
    </div>
  );
}

export default App;
