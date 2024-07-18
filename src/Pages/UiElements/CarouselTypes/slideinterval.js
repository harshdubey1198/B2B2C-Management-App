import React from "react";
import { UncontrolledCarousel } from "reactstrap";

// Carousel images
import img4 from "../../../assets/images/small/img-4.jpg";
import img5 from "../../../assets/images/small/img-5.jpg";
import img6 from "../../../assets/images/small/img-6.jpg";

const Slideinterval = () => {
  return (
    <React.Fragment>
      <UncontrolledCarousel
        items={[
          {
            altText: " ",
            caption: " ",
            key: 1,
            src: img4,
          },
          {
            altText: " ",
            caption: " ",
            key: 2,
            src: img5,
          },
          {
            altText: " ",
            caption: " ",
            key: 3,
            src: img6,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default Slideinterval;
