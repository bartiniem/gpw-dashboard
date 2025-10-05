const API_URL = process.env.REACT_APP_API_URL;

export const fetchStocks = async (ticker) => {
    try {
        const response = await fetch(`${API_URL}/api/stocks`);
        const data = await response.json();
        console.log(`Stocks data:`, data);
        return data;
    }
    catch (error) {
        console.error('Error fetching stocks:', error);
        return [`Error fetching stocks`];
    }
};

export const fetchStockData = async (ticker) => {
    try {
        const response = await fetch(`${API_URL}/api/stocks/${ticker}`);
        const data = await response.json();
        console.log(`Fetched data for ${ticker}:`, data);
        return [ticker, data];
    }
    catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return [ticker, []];
    }
};

export const fetchMessage = async (ticker_name) => {
    try {
        const response = await fetch(`${API_URL}/api/message`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ticker: ticker_name})
        });
        const data = await response.json();
        return [data.message];
    }
    catch (error) {
        console.error(`Error fetching message for ${ticker_name}:`, error);
        return [`Error fetching message for ${ticker_name}`];
    }
};
