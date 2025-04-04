import React from 'react';


function Lander() {
  return (
    <div id="Home" className="lander">
      <div className="lander-content">
        <img
          src="https://res.cloudinary.com/harshdubey1198/image/upload/v1738647390/website_adv_banner_1_xlzomb.png"
          loading="lazy"
          alt="aaMOBee Logo"
          className="adv-banner"
        />
        <div className="info-1">
          <span className="banner-txt">
            Accounting Software that makes the hard part easy
          </span>
          <br />
          <br />
          <a href="#features" className="bns">
            Buy Now & Save
          </a>
          <div className="bfs">
            Black Friday sale 🎁 <br />
            80% off for 4 months
          </div>
        </div>

        <div className="review-div">
          <h4>Customers and experts recommend aaMOBee</h4>
          <br />

          <div className="row1">
            <div className="review-class">
              4.5 Excellent ⭐⭐⭐⭐
              <br />
              TakeApp.com
            </div>
            <div className="review-class">
              5 Excellent ⭐⭐⭐⭐⭐
              <br />
              SoftwareID.com
            </div>
            <div className="review-class">
              4.5 Excellent ⭐⭐⭐⭐
              <br />
              PCMag.com
            </div>
            <div className="review-class">
              4.5 Excellent ⭐⭐⭐⭐
              <br />
              Goto.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lander;
