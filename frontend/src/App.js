import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/stock/:ticker" element={<StockDetail />} />
            </Routes>
        </Router>
    );
}

export default App;