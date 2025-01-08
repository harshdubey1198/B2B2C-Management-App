import React from 'react';
import threeDImage from "../assets/3d-image.png"  
import establishedIcon from "../assets/established-icon.png"        
import growingIcon from "../assets/growing-icon.png"
import startUpRocket from "../assets/startup-rocket.png"
import threeLines from "../assets/three-lines.png"
import invertedThreeLines from "../assets/three-lines-inverted.png"
function Bookkeeping() {
  return (
    <div className="services-container" id="bookkeeping">
      <span className="service-heading">
        <img className="headingimg" loading="lazy" src={threeLines} alt="Three lines" />
        List of Bookkeeping Services We’re Offer 
        <img src={invertedThreeLines} loading="lazy" alt="Inverted three lines" className="headingimg" />
      </span>
      
      <div className="service-outbox">
        <div className="service-box">
          <div className="sb-h1">
            <img src={startUpRocket} loading="lazy" alt="Startup rocket" className="sb-img" />
            <span className="sb-heading">Start-Up</span>
          </div>
          <ul className="sb-ul">
            <li>Dedicated Bookkeeper</li>
            <li>Highly Experienced Accountant</li>
            <li>Bank & CC Reconciliation</li>
            <li>Accounts Payable & Receivable Function</li>
            <li>Payroll Calculation & TDS/PF/ESI Payments</li>
            <li>Filing Of TDS Return</li>
            <li>Filing of GST Return</li>
            <li>Filing Yearly Tax Return</li>
            <li>Monthly Balance Sheet, Profit & Loss Report</li>
          </ul>
          <a href="#quote" className="sb-quote">Get a Quote</a>
        </div>

        <div className="service-box">
          <div className="sb-h2">
            <span className="sb-heading">Growing</span>
            <img src={growingIcon} loading="lazy" alt="Growing icon" className="sb-img" />
          </div>
          <ul className="sb-ul">
            <li>Dedicated Bookkeeper</li>
            <li>Highly Experienced Accountant</li>
            <li>Bank & CC Reconciliation</li>
            <li>Accounts Payable & Receivable Function</li>
            <li>Payroll Calculation & TDS/PF/ESI Payments</li>
            <li>Filing Of TDS Return</li>
            <li>Filing of GST Return</li>
            <li>Filing Yearly Tax Return</li>
            <li>Monthly Balance Sheet, Profit & Loss Report</li>
          </ul>
          <a href="#quote" className="sb-quote">Get a Quote</a>
        </div>

        <div className="service-box">
          <div className="sb-h3">
            <span className="sb-heading">Established</span>
            <img src={establishedIcon} loading="lazy" alt="Established icon" className="sb-img" />
          </div>
          <ul className="sb-ul">
            <li>Dedicated Bookkeeper</li>
            <li>Highly Experienced Accountant</li>
            <li>Bank & CC Reconciliation</li>
            <li>Accounts Payable & Receivable Function</li>
            <li>Payroll Calculation & TDS/PF/ESI Payments</li>
            <li>Filing Of TDS Return</li>
            <li>Filing of GST Return</li>
            <li>Filing Yearly Tax Return</li>
            <li>Monthly Balance Sheet, Profit & Loss Report</li>
          </ul>
          <a href="#quote" className="sb-quote">Get a Quote</a>
        </div>
      </div>

      <div className="cloud-solution">
        <div className="cld-heading">
          The company that leaders trust to help them grow and thrive.
        </div>
        <div className="subheading">Who we are</div>
        <div className="cld-p1">Cloud solutions for every business</div>
        <div className="cld-p2">
          As the market leader in enterprise application software, we’re helping companies of all sizes and in all industries run better by redefining ERP.
        </div>
        <a className="cld-btn" href="#">
          Get Started with Cloud <i className="fa fa-angle-right"></i>
        </a>
        <img src={threeDImage} alt="3D illustration" loading="lazy" className="cloud-img" />
      </div>
    </div>
  );
}

export default Bookkeeping;
