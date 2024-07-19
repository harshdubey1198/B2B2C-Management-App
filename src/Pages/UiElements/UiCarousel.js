import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap";

// Carousel
import Slide from "./CarouselTypes/slide";
import Slidewithcontrol from "./CarouselTypes/slidewithcontrol";
import Slidewithindicator from "./CarouselTypes/slidewithindicator";
import Slidewithcaption from "./CarouselTypes/slidewithcaption";
import Slidewithfade from "./CarouselTypes/slidewithfade";
import SlidewithcaptionDark from "./CarouselTypes/slidewithcaptionDark";
import Slideinterval from "./CarouselTypes/slideinterval";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiCarousel = () => {
  document.title = "Carousel | aaMOBee";

  return (
    <React.Fragment>

      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Carousel" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle> Slides Only</CardTitle>
                  <CardSubtitle className="mb-3">
                    Here's a carousel with slides only.
                  </CardSubtitle>
                  <Slide />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>With controls</CardTitle>
                  <CardSubtitle className="mb-3">
                    Adding in the previous and next controls:
                  </CardSubtitle>
                  <Slidewithcontrol />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
          <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>With captions</CardTitle>
                  <CardSubtitle className="mb-3">
                    Add captions to your slides easily with the{" "}
                    <code>.carousel-caption</code> element within any{" "}
                    <code>.carousel-item</code>.
                  </CardSubtitle>
                  <Slidewithcaption />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>With indicators</CardTitle>
                  <CardSubtitle className="mb-3">
                    You can also add the indicators to the carousel, alongside
                    the controls, too.
                  </CardSubtitle>
                  <Slidewithindicator />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Card>
                <CardBody>
                  <CardTitle>Crossfade</CardTitle>
                  <CardSubtitle className="mb-3">
                    Add <code>.carousel-fade</code> to your carousel to animate
                    slides with a fade transition instead of a slide.
                  </CardSubtitle>
                  <Slidewithfade />
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <CardBody>
                  <CardTitle>Carousel Slide Interval</CardTitle>
                  <CardSubtitle className="mb-3">
                    Add interval="" to a <code> .Carousel</code> to automatically cycling to the next item.
                  </CardSubtitle>
                  <Slideinterval />
                </CardBody>
              </Card>
            </Col>


          </Row>
          <Row>
            <Col lg="6">
              <Card>
                <CardBody>
                  <CardTitle>Dark Variant</CardTitle>
                  <CardSubtitle className="mb-3">
                    Add <code>Carousel-dark</code> to your carousel to Dark Variant.
                  </CardSubtitle>
                  <SlidewithcaptionDark />
                </CardBody>
              </Card>
            </Col>


          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiCarousel;
