import React, { useEffect, useState } from 'react';
import indianFlag from '../assets/Country-Flags/in.png';
import ukFlag from '../assets/Country-Flags/gb-eng.png';
import usaFlag from '../assets/Country-Flags/us.png';
import { getAllPlans } from '../../../apiServices/service';

function Pricing() {
  const [selectedFlag, setSelectedFlag] = useState(indianFlag);
  const [plans, setPlans] = useState([]);

  const updateFlag = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const flagSrc = selectedOption.getAttribute('data-flag');
    setSelectedFlag(flagSrc);
  };

  const fetchPlans = async () => {
    try {
      const response = await getAllPlans();
      console.log(response);
      if (response) {
        setPlans(response);
      }

    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  console.log(plans);
  useEffect(() => {
    fetchPlans();
  }, []);

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
              minWidth:"100px"
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
        {plans.map((plan) => (
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
            <a href="#" className="cta">Start my Free Trial</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
