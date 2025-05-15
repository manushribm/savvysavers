'use client';  
import { useState, useEffect } from 'react';
import './info.css';

export default function Home() {
  const [financialData, setFinancialData] = useState({
    income: '',
    expenses: '',
    savings: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('financialData');
    if (savedData) {
      setFinancialData(JSON.parse(savedData));
    }
  }, []);  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancialData({
      ...financialData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!financialData.income || !financialData.expenses || !financialData.savings) {
      setError('All fields must be filled in.');
      return;
    }

    if (isNaN(financialData.income) || isNaN(financialData.expenses) || isNaN(financialData.savings)) {
      setError('Please enter valid numbers.');
      return;
    }

    setError(''); 

    localStorage.setItem('financialData', JSON.stringify(financialData));

    console.log('Financial data submitted:', financialData);
  };

  return (
    <main>
      <h1>Your Financial Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="income">Income: </label>
          <input
            type="number"
            id="income"
            name="income"
            value={financialData.income}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="expenses">Expenses: </label>
          <input
            type="number"
            id="expenses"
            name="expenses"
            value={financialData.expenses}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="savings">Savings: </label>
          <input
            type="number"
            id="savings"
            name="savings"
            value={financialData.savings}
            onChange={handleChange}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
