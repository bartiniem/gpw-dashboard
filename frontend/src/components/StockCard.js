import React from 'react';

const StockCard = ({ data }) => (
  <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
    <h3>{data[0].Date}</h3>
    <ul>
      {data.map((entry, i) => (
        <li key={i}>
          {entry.Date}: {entry.Close} PLN
        </li>
      ))}
    </ul>
  </div>
);

export default StockCard;
