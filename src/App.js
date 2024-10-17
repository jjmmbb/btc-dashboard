// src/App.js
import React, { useState, useEffect } from 'react';
import BitcoinPriceTracker from './components/BitcoinPriceTracker/BitcoinPriceTracker';
import SatoshiEquivalentCalculator from './components/SatoshiEquivalentCalculator/SatoshiEquivalentCalculator';
import './App.css';

function App() {
  const [currency, setCurrency] = useState('USD');
  const [price, setPrice] = useState(null);

  const fetchPrice = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`
      );
      const data = await response.json();
      setPrice(data.bitcoin[currency.toLowerCase()]);
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };

  useEffect(() => {
    fetchPrice();

    const interval = setInterval(() => {
      fetchPrice();
    }, 20000); // Refresh every 20 seconds

    return () => clearInterval(interval);
  }, [currency]);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="App">
      <div className="dashboard">
        <div className="left">
          <BitcoinPriceTracker
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
            price={price}
          />
        </div>
        <div className="right">
          <SatoshiEquivalentCalculator currency={currency} price={price} />
        </div>
      </div>
    </div>
  );
}

export default App;