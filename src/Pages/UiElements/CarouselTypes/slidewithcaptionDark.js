import React from "react";
import { UncontrolledCarousel } from "reactstrap";

// Carousel images
import img4 from "../../../assets/images/small/img-3.jpg";
import img5 from "../../../assets/images/small/img-4.jpg";
import img6 from "../../../assets/images/small/img-5.jpg";

const SlidewithcaptionDark = () => {
  return (
    <React.Fragment>
      <UncontrolledCarousel
        interval={false}
        dark={true}
        items={[
          {
            altText: "First slide label",
            caption: "First slide label",
            key: 1,
            src: img4,
          },
          {
            altText: "Second slide label",
            caption: "Second slide label",
            key: 2,
            src: img5,
          },
          {
            altText: "Third slide label",
            caption: "Third slide label",
            key: 3,
            src: img6,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default SlidewithcaptionDark;
