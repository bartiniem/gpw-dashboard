export const fetchStocks = async (ticker) => {
  const response = await fetch(`http://localhost:5000/api/stocks`);
  const data = await response.json();
  console.log(`Stocks data:`, data);
  return data;
};

export const fetchStockData = async (ticker) => {
  const response = await fetch(`http://localhost:5000/api/stocks/${ticker}`);
  const data = await response.json();
  console.log(`Fetched data for ${ticker}:`, data);
  return [ticker, data];
};

export const addStockTicker = async (ticker) => {
  const response = await fetch(`http://localhost:5000/api/stocks/${ticker}/add`);
  const data = await response.json();
  console.log(`Fetched data for ${ticker}:`, data);
  return [ticker, data];
};

export const fetchMessage = async () => {
  const response = await fetch('http://localhost:5000/api/message');
  const data = await response.json();
  return [data.message];
};
