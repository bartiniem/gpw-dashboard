import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const StockChart = ({data}) => {
    const chartData = {
        labels: data.map(d => d.Date),
        datasets: [
            {
                label: 'Cena zamknięcia (PLN)',
                data: data.map(d => d.Close),
                borderColor: 'blue',
                fill: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true, // 🔴 turn off responsiveness
        maintainAspectRatio: false,
    };

    return <Line data={chartData} options={chartOptions} width={300} height={200}/>;
};

export default StockChart;
