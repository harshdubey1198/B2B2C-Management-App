import React from 'react';
import sirEnhanced from '../assets/sir_enhanced.png';
import aamobeeLogo from '../assets/aamobeee1121 1 (1).png';
function RiseaaMOBee() {
  return (
    <div className="rise-aamobee">
      <div className="rise-div1">
        {/* <div className="rise-aamobee-content"> */}
          <h1>Preparing aaMOBee for the rise of India</h1>
          <p className="subheading">CEO , Magnifying India Pvt Ltd</p>
          <p>
            "aaMOBee CEO believes it is inevitable that the country will become
            the biggest market for the company. aaMOBee is working on software
            that can help developers generate correct code 'by design'. At some
            point, aaMOBee will begin to apply this technology to building its
            future products."
          </p>
          <a href="#" className="ra-btn">
            More on Forbes
          </a>
        {/* </div> */}
      </div>

      <img
        src={sirEnhanced}
        alt="India Map"
        className="ceo rise-div2"
      />
      <div className="rise-logo">
        <img
          src={aamobeeLogo}
          alt="aaMOBee Logo"
          className="rise-img"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default RiseaaMOBee;
