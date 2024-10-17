// src/components/BitcoinPriceTracker/BitcoinPriceTracker.js
import React from 'react';
import './BitcoinPriceTracker.css'; // Import the component-specific CSS

const BitcoinPriceTracker = ({ currency, onCurrencyChange, price }) => {
  const currencies = ['USD', 'CAD', 'JPY', 'PHP'];

  return (
    <div className="bitcoin-price-tracker">
      <img
        src={`${process.env.PUBLIC_URL}/logo512.png`}
        alt="BTC Logo"
        className="app-logo"
      />
      <h2>Bitcoin</h2>
      <p className="bitcoin-price">
        {price ? `${price.toLocaleString()} ${currency}` : 'Loading...'}
      </p>
      <select value={currency} onChange={onCurrencyChange}>
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BitcoinPriceTracker;