//this is the page with tips about spending and saving money wisely 
//faqs page basically

'use client'

import {useState} from 'react';

const faqs = [
    {
        question: 'How do I create a budget?',
        answer: 'Track your income and expenses. A good rule of thumb is the 50/30/20 rule: 50% needs, 30% wants, and 20% savings or debt repayment.'
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