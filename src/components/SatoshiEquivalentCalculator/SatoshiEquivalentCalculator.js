// src/components/SatoshiEquivalentCalculator.js
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import './SatoshiEquivalentCalculator.css';

const SatoshiEquivalentCalculator = ({ currency, price }) => {
  // Use the custom hook for Local Storage
  const LOCAL_STORAGE_KEY = `satoshiAmount_${currency}`;
  const [amount, setAmount] = useLocalStorage(LOCAL_STORAGE_KEY, 10000);

  const [showInput, setShowInput] = useState(false); // State to toggle input visibility

  // Effect to update 'amount' when 'currency' changes
  useEffect(() => {
    // The custom hook already handles updating from Local Storage
    // No additional logic needed here
  }, [currency]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setAmount('');
    } else if (!isNaN(value) && parseFloat(value) >= 0) {
      setAmount(parseFloat(value));
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleSetAmount = () => {
    // Optional: Add validation or constraints here
    if (amount === '' || isNaN(amount) || parseFloat(amount) < 0) {
      alert('Please enter a valid non-negative number.');
      return;
    }
    setShowInput(false);
  };

  const satsPerBitcoin = 100000000;

  const calculateSatoshis = () => {
    if (!price || isNaN(amount)) return 'Calculating...';
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
            min="0"
            placeholder="Enter amount"
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
