// src/components/SatoshiEquivalentCalculator/SatoshiEquivalentCalculator.js
import React, { useState } from 'react';
import './SatoshiEquivalentCalculator.css'; // Import the component-specific CSS

const SatoshiEquivalentCalculator = ({ currency, price }) => {
  const [amount, setAmount] = useState(10000);
  const [showInput, setShowInput] = useState(false); // New state variable

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleSetAmount = () => {
    // You can add validation here if needed
    setShowInput(false);
  };

  const satsPerBitcoin = 100000000;

  const calculateSatoshis = () => {
    if (!price) return 'Calculating...';
    const bitcoins = amount / price;
    const satoshis = bitcoins * satsPerBitcoin;
    return Math.round(satoshis).toLocaleString();
  };

  return (
    <div className="satoshi-equivalent-calculator">
      <h2>Satoshi Tracker</h2>
      {!showInput ? (
        <button className="change-amount-button" onClick={handleShowInput}>
          Change Amount
        </button>
      ) : (
        <div className="input-container">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
          <span>{currency}</span>
          <button className="set-amount-button" onClick={handleSetAmount}>
            Set
          </button>
        </div>
      )}
      <p className="satoshi-text">
        {parseFloat(amount).toLocaleString()} {currency} is currently
      </p>
      <p className="satoshi-amount">{calculateSatoshis()} SATS</p>
    </div>
  );
};

export default SatoshiEquivalentCalculator;