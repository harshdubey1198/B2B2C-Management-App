import React from "react";
import {UncontrolledCarousel } from "reactstrap";

// Carousel images
import img1 from "../../../assets/images/small/img-1.jpg";

const Slide = () => {
  return (
    <React.Fragment>
      <UncontrolledCarousel
        indicators={false}
        items={[{ altText: " ", caption: " ", src: img1 }]}
      />
    </React.Fragment>
  );
};

export default Slide;
