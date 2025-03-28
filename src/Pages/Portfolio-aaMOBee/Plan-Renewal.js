import React, { useEffect, useState } from 'react';
import indianFlag from './assets/Country-Flags/in.png';
import ukFlag from './assets/Country-Flags/gb-eng.png';
import usaFlag from './assets/Country-Flags/us.png';
import { useNavigate } from 'react-router-dom';
import { getAllPlans } from '../../apiServices/service';
import axios from 'axios';

const PlanRenewal = () => {
    const [selectedFlag, setSelectedFlag] = useState(indianFlag);
    const [plans, setPlans] = useState([]);
    const [modal, setModal] = useState(false); const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹' });
    const navigate = useNavigate();
    const API_KEY = '2af10e3d2f3b47adbb7c510b25b20b12';
    const updateFlag = (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const flagSrc = selectedOption.getAttribute('data-flag');
      setSelectedFlag(flagSrc);
    };

    const fetchPlans = async () => {
      try {
        const response = await getAllPlans();
        console.log(response || []);
        if (response) {
          setPlans(response);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    const fetchUserCurrency = async () => {
      try {
          const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`);
          // console.log(response);
          const userCurrency = response.currency.code || { code: 'INR', symbol: '₹' };
          setCurrency(userCurrency);
          localStorage.setItem('planCurrency', JSON.stringify(userCurrency));
          console.log(userCurrency);
      } catch (error) {
          console.error('Error fetching user location:', error);
      }
  };
    useEffect(() => {
      fetchPlans();
      fetchUserCurrency();
    }, []);
    
    const handlePlanSelection = async (planId) => {
      try {
        const storedEmail = localStorage.getItem('planemail');
        const response = await axios.post(`${process.env.REACT_APP_URL}/payment/create-checkout-session`, {
          email: storedEmail,
          planId: planId, 
          currency: currency, 
        });

        if (response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
        } else {
          console.error('Failed to retrieve checkout URL.');
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
      }
    };

    return (
      <div className="pricing-div">
        <h2>The Perfect Balance of Features and Affordability</h2>
        <span className="subheading">Pricing</span>
        <span className="toggler-plan">
          Monthly
          <label className="switch mb-0">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <span className="save-upto">(Save up to 30%)</span>
          <span className="country-selector">
            <select
              name="country"
              id="country"
              className="p-2 rounded bg-none"
              onChange={updateFlag}
              style={{
                minWidth: '100px',
              }}
            >
              <option value="india" data-flag={indianFlag}>India</option>
              <option value="usa" data-flag={usaFlag}>USA</option>
              <option value="uk" data-flag={ukFlag}>UK</option>
            </select>
            <div id="flag-container" style={{ position: 'absolute', left: '-35px' }}>
              <img id="flag" src={selectedFlag} alt="Flag" style={{ width: '30px', height: '20px' }} />
            </div>
          </span>
        </span>

        <div className="pricing-container">
          {Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan) => (
              <div key={plan._id} className={`pricing-card ${plan.title === 'Gold' ? 'most-popular new-launch' : ''}`}>
                <div className="card-title">{plan.title.toUpperCase()}</div>
                <div className="card-subtitle">{plan.caption}</div>
                <ul className="features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="price">
                  <del>₹{plan.price + 200}</del> ₹{plan.price}
                </div>
                <button onClick={() => handlePlanSelection(plan._id)} className="cta">
                  Start my Free Trial
                </button>
              </div>
            ))
          ) : (
            <div>No plans available</div>
          )}
        </div>
      </div>
    );
};

export default PlanRenewal;
