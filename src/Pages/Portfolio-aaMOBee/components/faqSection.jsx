import React, { useEffect } from 'react';
import faqImage from '../assets/FAQ-image.png';
function FaqSection() {
  useEffect(() => {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
      faqItems[0].classList.add('open');
    }

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        faqItems.forEach((faq) => {
          if (faq !== item) {
            faq.classList.remove('open');
          }
        });

        item.classList.toggle('open');
      });
    });

    return () => {
      faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        question.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="faq-container">
      <div className="faq-content">
        <div className="faq-left">
          <h1>Find Answers to <br /> Frequently Asked Questions</h1>
          <p className="subheading">Common Questions Answered:</p>
          <p className="description">
            Whether you’re new to aaMOBee or an experienced user, find answers to your most common questions here. Let us simplify your experience.
          </p>
        </div>
        <div className="faq-center">
          <img
            src={faqImage}
            loading="lazy"
            alt="FAQ Illustration"
            className="faq-image"
          />
        </div>
        <div className="faq-right">
          <div className="faq-list">
            {[
              {
                question: 'How This Work?',
                answer:
                  'aaMOBee provides an all-in-one solution for managing invoices, inventory, and accounting with just a few clicks.',
              },
              {
                question: 'Payment Method Type?',
                answer:
                  'We accept credit/debit cards, UPI payments, and net banking to ensure flexibility and convenience.',
              },
              {
                question: 'How much aaMOBee accounting software cost?',
                answer:
                  'Our pricing starts at ₹500 per month, offering cost-effective plans for businesses of all sizes.',
              },
              {
                question: 'aaMOBee software offer mobile app?',
                answer:
                  'Currently aaMOBee is available as a Web-app, ensuring that you can manage your business on the go.',
              },
              {
                question: 'aaMOBee accounting software easy to use?',
                answer:
                  'aaMOBee is designed with a user-friendly interface, making it simple for anyone to use, even with minimal technical knowledge.',
              },
            ].map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question">
                  {faq.question}
                  <i className="fas fa-angle-down"></i>
                </div>
                <div className="faq-answer">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqSection;
