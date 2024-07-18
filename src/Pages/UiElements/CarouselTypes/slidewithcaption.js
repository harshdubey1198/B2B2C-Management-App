import React from "react";
import { UncontrolledCarousel } from "reactstrap";

// Carousel images
import img3 from "../../../assets/images/small/img-3.jpg";
import img4 from "../../../assets/images/small/img-4.jpg";
import img5 from "../../../assets/images/small/img-5.jpg";

const Slidewithcaption = () => {
  return (
    <React.Fragment>
      <UncontrolledCarousel
        interval={false}
        items={[
          {
            altText: "First slide label ",
            caption: "First slide label",
            key: 1,
            src: img3,
          },
          {
            altText: "Second slide label",
            caption: "Second slide label",
            key: 2,
            src: img4,
          },
          {
            altText: "Third slide label",
            caption: "Third slide label",
            key: 3,
            src: img5,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default Slidewithcaption;
