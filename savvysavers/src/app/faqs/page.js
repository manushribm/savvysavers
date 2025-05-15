//this is the page with tips about spending and saving money wisely 
//faqs page basically

'use client'

import {useState} from 'react';
import './faqs.css';

const faqs = [
    {
        question: '1. Create a Budget',
        answer: 'Track your income and expenses. A good rule of thumb is the 50/30/20 rule: 50% needs, 30% wants, and 20% savings or debt repayment.'
    }
    ,
    {
        question: '2. Set Savings Goals',
        answer: 'Set specific, measurable, achievable, relevant, and time-bound (SMART) goals. For example, save $5,000 for a vacation in 2 years.'
    }
    ,
    {
        question: '3. Use the 24-Hour Rule',
        answer: 'Before making a big purchase, give yourself at least 24 hours to think about it. This helps avoid impulse buys and allows you to evaluate whether you truly need the item.'
    }
    ,
    {
        question: '4. Automate Savings',
        answer: 'Set up automatic transfers to your savings account. Treat savings like a bill that must be paid each month.'
    }
    ,
    {
        question: '5. Prioritize Needs Over Wants',
        answer: 'Focus on essentials like housing, transportation, food, and health before splurging on non-essentials. It’s okay to treat yourself occasionally, but make sure your basics are covered first.'
    }
];

const FAQS = () => {
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setOpenIndex(index === openIndex ? null : index);
    };

return (
    <div className="faq-container">
      <h1 className="title">Tips for Spending + Saving Money Wisely</h1>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <button onClick={() => toggleFAQ(index)} className="faq-question">
              {faq.question}
            </button>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQS;