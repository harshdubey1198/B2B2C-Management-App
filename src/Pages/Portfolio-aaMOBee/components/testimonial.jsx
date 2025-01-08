import React, { useEffect, useState } from 'react';
import invertedNoBgLines from '../assets/three-lines-inverted-nobg.png';
import starIcon from '../assets/stars-icon.png';
import clientOne from '../assets/Jasjit Chopra.jpeg';
import clientTwo from '../assets/Rishabh Jain.jpeg';

const testimonials = [
  {
    id: 1,
    name: 'Jagjit Chopra',
    position: 'CEO, Penthara Technologies',
    review: '‟aaMOBee has been a game-changer for my business. The multi-firm utilities and innovative features have helped me streamline operations and achieve unprecedented growth. From seamless invoicing to efficient inventory management, the platform has provided everything I needed and more to take my business to the next level.”',
    stars: 5,
    image: clientOne,
  },
  {
    id: 2,
    name: 'Dr. Rishabh Jain',
    position: 'CEO & Co-Founder, Fermàt',
    review: '‟aaMOBee has revolutionized the way I manage my businesses. It’s an excellent platform that allows me to handle multiple firms effortlessly, from invoicing to inventory tracking. The user-friendly interface and robust features have made operations smooth and highly efficient, saving both time and resources.”',
    stars: 4,
    image: clientTwo,
  },
];

function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonial-div" id="testimonials">
      <div className="col-md-6 col-sm-12 testimonial-idiv">
        <div className="section-heading">
          Testimonials <img src={invertedNoBgLines} alt="" className="headingimg1" loading="lazy" />
        </div>
        <span className="big-heading">Here’s what our customers have said.</span>
        <span className="col-1-description">
          Simplified IT is designed to help make sure you and your<br /> data is protected and your computer runs its best. The <br />network Access provides is valuable.
        </span>
        <a href="view-more" className="vm-btn">View More <i className="fa fa-angle-right"></i></a>
      </div>

      <div className="col-md-6 testimonial-idiv">
        <div className="carousel-testimonials" id="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-slide ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="review-stars-div">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <img key={i} src={starIcon} loading="lazy" alt="star" className="star-reviews" />
                ))}
              </div>
              <p className="review-text">{testimonial.review}</p>
              <div className="reviewer-div">
                <div className="reviewer-img-container">
                  <img src={testimonial.image} loading="lazy" alt="reviewer" className="reviewer" />
                </div>
                <span>
                  <span className="reviewer-name">{testimonial.name}</span><br />
                  <span className="reviewer-position">{testimonial.position}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          <i
            className="fa-solid fa-angle-left"
            onClick={() =>
              setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
            }
          ></i>
          <i
            className="fa-solid fa-angle-right"
            onClick={() =>
              setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
            }
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
