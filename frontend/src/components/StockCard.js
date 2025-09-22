import React from 'react';
import StockChart from './StockChart';

const StockCard = ({ data }) => (
  <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
    <h3>{data[0]}</h3>
    <ul>
      {data[1].map((entry, i) => (
        <li key={i}>
          {entry.Date}: {entry.Close} PLN
        </li>
      ))}
    </ul>
    <StockChart data={data[1]} />
  </div>
);

export default StockCard;
