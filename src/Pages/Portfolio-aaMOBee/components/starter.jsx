import React from 'react';
import heartImage from '../assets/heart image.png';
import friendsImage from '../assets/friends.png';
import documentTabletImage from '../assets/document-tablet.png';
import ladyImage from '../assets/lady.png';

function Starter() {
  return (
    <div id="starter" className="starter">
      {/* Four boxes, two in each row with alternating border-radius */}
      <div className="ut-box">
        {/* Responsive row with columns for different screen sizes */}
        <div className="row">
          <div className="col-md-6">
            <div className="box1">
              <h4>Get set up faster</h4>
              <p>
                Get the most out of aaMOBee with access to our team of onboarding specialists during your first 90 days
              </p>
              <a href="#features" className="href-starter">
                Learn about getting started with aaMOBee
              </a>
              <img
                className="boxify-img1"
                loading="lazy"
                src={heartImage}
                alt="Heart icon"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="box2">
              <h4>Get set up faster</h4>
              <p>
                Get the most out of aaMOBee with access to our team of onboarding specialists during your first 90 days
              </p>
              <a href="#features" className="href-starter">
                Learn about getting started with aaMOBee
              </a>
              <img
                className="boxify-img2"
                loading="lazy"
                src={friendsImage}
                alt="Friends illustration"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="box3">
              <h4>Get set up faster</h4>
              <p>
                Get the most out of aaMOBee with access to our team of onboarding specialists during your first 90 days
              </p>
              <a href="#features" className="href-starter">
                Learn about getting started with aaMOBee
              </a>
              <img
                className="boxify-img3"
                loading="lazy"
                src={documentTabletImage}
                alt="Document and tablet icon"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="box4">
              <h4>Get set up faster</h4>
              <p>
                Get the most out of aaMOBee with access to our team of onboarding specialists during your first 90 days
              </p>
              <a href="#features" className="href-starter">
                Learn about getting started with aaMOBee
              </a>
              <img
                className="boxify-img4"
                loading="lazy"
                src={ladyImage}
                alt="Lady illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Starter;
