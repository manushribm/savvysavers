'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import './globals.css';

export default function Home() {
  const [dailyLimit, setDailyLimit] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('financialData');
    if (savedData) {
      const { income, expenses, savings } = JSON.parse(savedData);

      const incomeNum = parseFloat(income);
      const expensesNum = parseFloat(expenses);
      const savingsNum = parseFloat(savings);

      if (
        !isNaN(incomeNum) &&
        !isNaN(expensesNum) &&
        !isNaN(savingsNum)
      ) {
        const remaining = incomeNum - expensesNum - savingsNum;
        const calculatedLimit = (remaining / 30).toFixed(2);
        setDailyLimit(calculatedLimit);
      }
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Image
          src="/piggy.png"
          alt="Piggy Bank"
          width={300}
          height={300}
          className={styles.pig}
        />

        <div className={styles.ctas}>
          <a href="/fininfo" className={styles.secondary}>
            EDIT<br />FINANCIAL<br />INFORMATION
          </a>
          <a href="#" className={styles.secondary}>
            DAILY<br />SPENDING<br />LIMIT: ${dailyLimit ?? '--'}
          </a>
          <a href="#" className={styles.secondary}>
            REMAINING<br />AMOUNT: $
          </a>
          <a href="#" className={styles.secondary}>
            PERCENTAGE<br />SPENT: %
          </a>
        </div>
      </div>

      <footer className={styles.footer} />
    </div>
  );
}
