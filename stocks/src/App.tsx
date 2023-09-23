// src/App.tsx
import React, { useState } from 'react';

function App() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/stocks/${symbol}`);
      if (response.ok) {
        const data = await response.json();
        setStockData(data);
      } else {
        setStockData(null);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setStockData(null);
    }
  };

  return (
    <div className="App">
      <h1>Stock Market Website</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbol">Stock Symbol:</label>
        <input
          type="text"
          id="symbol"
          placeholder="Enter stock symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <button type="submit">Fetch Data</button>
      </form>
      <div id="stock-data">
        {stockData ? (
          <>
            <p>Stock Name: {stockData.name}</p>
            <p>Stock Price: ${stockData.price}</p>
          </>
        ) : (
          <p>Stock not found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
