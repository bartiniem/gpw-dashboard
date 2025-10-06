import api from './api';

export const fetchStocks = async () => {
    try {
        const response2 = await api.get(`/api/stocks`);
        const data = await response2.data;
        console.log(`Stocks data:`, data);
        return data;
    } catch (error) {
        console.error('Error fetching stocks:', error);
        return [`Error fetching stocks`];
    }
};

export const fetchStockData = async (ticker) => {
    try {
        const response2 = await api.get(`/api/stocks/${ticker}`);
        const data = await response2.data;
        console.log(`Fetched data for ${ticker}:`, data);
        return [ticker, data];
    } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return [ticker, []];
    }
};

export const fetchMessage = async (ticker_name) => {
    try {
        const {data} = await api.post('/api/message', {ticker: ticker_name});
        return [data.message];
    } catch (error) {
        console.error(`Error fetching message for ${ticker_name}:`, error);
        return [`Error fetching message for ${ticker_name}`];
    }
};
