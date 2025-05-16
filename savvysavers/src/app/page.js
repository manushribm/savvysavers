'use client'; // Important for Web Serial API usage

import { useState, useEffect } from 'react';
import styles from './BudgetTracker/budgettrack.module.css';

export default function BudgetTracker() {
  const [dailyBudget, setDailyBudget] = useState(100);  // Default value for daily budget
  const [totalSpent, setTotalSpent] = useState(0);
  const [weeklyBudget, setWeeklyBudget] = useState(700);
  const [isConnected, setIsConnected] = useState(false);
  const [port, setPort] = useState(null);
  const [ledStates, setLedStates] = useState(Array(10).fill('off'));

  // Load financial data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('financialData');
    if (savedData) {
      const { income, expenses, savings } = JSON.parse(savedData);

      const incomeNum = parseFloat(income);
      const expensesNum = parseFloat(expenses);
      const savingsNum = parseFloat(savings);

      // Check if values are valid
      if (!isNaN(incomeNum) && !isNaN(expensesNum) && !isNaN(savingsNum)) {
        const remaining = incomeNum - expensesNum - savingsNum;
        const calculatedDaily = remaining / 30;  // Assuming 30 days in a month
        const calculatedWeekly = calculatedDaily * 7;

        setDailyBudget(calculatedDaily);
        setWeeklyBudget(calculatedWeekly);
      } else {
        console.error('Invalid financial data in localStorage.');
      }
    }
  }, []);

  // Update LED states based on total spent and daily budget
  useEffect(() => {
    updateLEDStates();
  }, [totalSpent, dailyBudget]);

  const updateLEDStates = () => {
    const percentage = (totalSpent / dailyBudget) * 100;
    const ledsToLight = Math.min(Math.floor((percentage / 100) * 10), 10);

    const newLedStates = Array(10).fill('off').map((_, i) => {
      if (i < ledsToLight) {
        if (i < 4) return 'green';
        if (i < 8) return 'yellow';
        return 'red';
      }
      return 'off';
    });

    setLedStates(newLedStates);
  };

  const connectToArduino = async () => {
    try {
      if ('serial' in navigator) {
        const newPort = await navigator.serial.requestPort();
        await newPort.open({ baudRate: 9600 });
        setPort(newPort);
        setIsConnected(true);

        const reader = newPort.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          console.log(new TextDecoder().decode(value));
        }
      } else {
        alert('Web Serial API not supported in this browser. Try Chrome or Edge.');
      }
    } catch (err) {
      console.error('Error connecting to Arduino:', err);
      alert('Failed to connect to Arduino');
    }
  };

  const disconnectFromArduino = async () => {
    if (port) {
      await port.close();
      setPort(null);
      setIsConnected(false);
    }
  };

  const sendCommandToArduino = async (command) => {
    if (port && port.writable) {
      const writer = port.writable.getWriter();
      await writer.write(new TextEncoder().encode(command + '\n'));
      writer.releaseLock();
    } else {
      console.log('Command (simulated):', command);
      if (command.startsWith('SPEND:')) {
        const amount = parseFloat(command.substring(6));
        if (amount > 0) {
          setTotalSpent(prev => prev + amount);
        }
      } else if (command === 'RESET') {
        setTotalSpent(0);
      }
    }
  };

  const handleSpend = (amount) => {
    if (amount > 0) {
      sendCommandToArduino(`SPEND:${amount}`);
    }
  };

  const handleReset = () => {
    sendCommandToArduino('RESET');
  };

  // Update totalSpent in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('totalSpent', totalSpent);
  }, [totalSpent]);

  return (
    <div className={styles.container}>
      <h1>Budget Tracker</h1>
      
      <div className={styles.connectionStatus}>
        {isConnected ? (
          <>
            <span className={styles.connected}>Connected to Arduino</span>
            <button onClick={disconnectFromArduino}>Disconnect</button>
          </>
        ) : (
          <button onClick={connectToArduino}>Connect to Arduino</button>
        )}
      </div>

      <div className={styles.display}>
        <div className={styles.ledStrip}>
          {ledStates.map((state, index) => (
            <div 
              key={index} 
              className={`${styles.led} ${styles[state]}`}
            />
          ))}
        </div>

        <div className={styles.oledDisplay}>
          <div className={styles.oledText}>You have spent:</div>
          <div className={styles.oledAmount}>${totalSpent.toFixed(2)}</div>
          <div className={styles.oledText}>today.</div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.budgetControl}>
          <label>Daily Budget: $</label>
          {/* Display the daily budget as a text element */}
          <div className={styles.dailyBudgetDisplay}>
            ${dailyBudget.toFixed(2)}
          </div>
        </div>

        <div className={styles.spendControl}>
          <label>Add Expense: $</label>
          <input 
            type="number" 
            id="expenseAmount" 
            min="0.01" 
            step="0.01"
            defaultValue="0.00"
          />
          <button onClick={() => {
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            handleSpend(amount);
          }}>
            Add
          </button>
        </div>

        <button onClick={handleReset} className={styles.resetButton}>
          Reset Spending
        </button>
      </div>

      <div className={styles.stats}>
        <div>Weekly Budget: ${weeklyBudget.toFixed(2)}</div>
        <div>Remaining Today: ${(dailyBudget - totalSpent).toFixed(2)}</div>
      </div>
    </div>
  );
}
