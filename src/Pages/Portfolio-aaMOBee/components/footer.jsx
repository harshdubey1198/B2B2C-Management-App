import React from 'react';
import playStore from "../assets/play-store.png";
import appleStore from "../assets/apple-store.png";
function Footer() {
  return (
    <div className="footer-section" id="footer">
      <div className="head-signup">
        <span className="footer-heading">Ready to do your best work?</span>
        <span className="footer-subheading">Let's get you started.</span>
        <a href="#register" className="footer-signup-btn">
          Sign Up Now <i className="fa fa-angle-right"></i>
        </a>
      </div>
      <div className="columner">
        <div className="column-footer col-xl-3 col-md-6 col-sm-12">
          <h4>About</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#smallbusiness">For Small Businesses</a></li>
            <li><a href="#accountants">For Accountants & Bookkeepers</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
          <div className="email-us-container">
            <a href="mailto:info@markaziasolutions.com" className="email-text">Email us</a>
            <div className="email-icon">
              <i className="fas fa-paper-plane"></i>
            </div>
          </div>
        </div>
        <div className="column-footer col-xl-3 col-md-6 col-sm-12">
          <h4>Apps and Extensions</h4>
          <ul>
            <li><a href="#mobile-apps">Mobile Apps</a></li>
            <li><a href="#desktop-apps">Desktop Apps</a></li>
            <li><a href="#developer-center">Developer Center</a></li>
            <li><a href="#google-workspace-integration">Google Workspace Integration</a></li>
            <li><a href="#browser-extensions">Browser Extensions</a></li>
          </ul>
        </div>
        <div className="column-footer col-xl-3 col-md-6 col-sm-12">
          <h4>By Industry</h4>
          <ul>
            <li><a href="#">Retail</a></li>
            <li><a href="#">Pharma</a></li>
            <li><a href="#">FMCG</a></li>
            <li><a href="#">Auto Parts</a></li>
            <li><a href="#">F & B</a></li>
            <li><a href="#">Computer Hardware</a></li>
            <li><a href="#">Furniture</a></li>
            <li><a href="#">Book Publishing</a></li>
            <li><a href="#">Electrical</a></li>
          </ul>
        </div>
        <div className="column-footer col-xl-3 col-md-6 col-sm-12">
          <h4>Guides</h4>
          <ul>
            <li><a href="#">GST Guide</a></li>
            <li><a href="#">Inventory Guide</a></li>
            <li><a href="#">Accounting Guide</a></li>
            <li><a href="#">aaMOBee Crack Version</a></li>
            <li><a href="#">aaMOBee Shortcut Keys</a></li>
            <li><a href="#">Computer Hardware</a></li>
            <li><a href="#">aaMOBee Software Products</a></li>
            <li><a href="#">aaMOBee Software</a></li>
          </ul>
        </div>
      </div>
      <hr className="hr" />
      <div className="footer-copyright">
        <div className="downloader-apps">
          <img src={playStore} alt="Play Store" loading="lazy" />
          <img src={appleStore} alt="Apple Store" loading="lazy" />
        </div>
        <span className="copyright-text"> 2024 aaMOBee: ALL RIGHTS RESERVED</span>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-linkedin-in"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer;
