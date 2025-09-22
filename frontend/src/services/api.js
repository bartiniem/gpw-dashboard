export const fetchStockData = async (ticker) => {
  const response = await fetch(`http://localhost:5000/api/stocks/${ticker}`);
  const data = await response.json();
  console.log(`Fetched data for ${ticker}:`, data);
  return [ticker, data];
};
