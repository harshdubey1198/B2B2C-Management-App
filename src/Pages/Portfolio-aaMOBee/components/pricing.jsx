import React, { useState } from 'react'
import indianFlag from '../assets/Country-Flags/in.png';
import ukFlag from '../assets/Country-Flags/gb-eng.png';
import usaFlag from '../assets/Country-Flags/us.png';
function Pricing() {
  const [selectedFlag, setSelectedFlag] = useState(indianFlag);

  const updateFlag = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const flagSrc = selectedOption.getAttribute('data-flag');
    setSelectedFlag(flagSrc);
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
          <select name="country" id="country" className="p-2 rounded bg-none" onChange={updateFlag}>
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
        {/* PREMIUM */}
        <div className="pricing-card">
          <div className="card-title">PREMIUM</div>
          <div className="card-subtitle">Confidently take on Projects, track inventory, and handle purchases</div>
          <ul className="features">
            <li>Dashboard</li>
            <li>Profile</li>
            <li>User Management</li>
            <li>Item Configuration</li>
            <li>Inventory</li>
          </ul>
          <div className="price">
            <del>₹1,099</del> ₹799
          </div>
          <a href="#" className="cta">Start my Free Trial</a>
        </div>

        {/* STANDARD */}
        <div className="pricing-card">
          <div className="card-title">STANDARD</div>
          <div className="card-subtitle">Confidently take on Projects, track inventory, and handle purchases</div>
          <ul className="features">
            <li>Dashboard</li>
            <li>Profile</li>
            <li>User Management</li>
            <li>Item Configuration</li>
            <li>Inventory</li>
          </ul>
          <div className="price">
            <del>₹1,299</del> ₹1,099
          </div>
          <a href="#" className="cta">Start my Free Trial</a>
        </div>

        {/* PROFESSIONAL */}
        <div className="pricing-card most-popular new-launch">
          <div className="card-title">PROFESSIONAL</div>
          <div className="card-subtitle">Confidently take on Projects, track inventory, and handle purchases</div>
          <ul className="features">
            <li>Dashboard</li>
            <li>Profile</li>
            <li>User Management</li>
            <li>Item Configuration</li>
            <li>Inventory</li>
          </ul>
          <div className="price">
            <del>₹1,899</del> ₹1,499
          </div>
          <a href="#" className="cta">Start my Free Trial</a>
        </div>

        {/* ELITE */}
        <div className="pricing-card">
          <div className="card-title">ELITE</div>
          <div className="card-subtitle">Confidently take on Projects, track inventory, and handle purchases</div>
          <ul className="features">
            <li>Dashboard</li>
            <li>Profile</li>
            <li>User Management</li>
            <li>Item Configuration</li>
            <li>Inventory</li>
          </ul>
          <div className="price">
            <del>₹1,099</del> ₹999
          </div>
          <a href="#" className="cta">Start my Free Trial</a>
        </div>
      </div>
    </div>
  )
}

export default Pricing
