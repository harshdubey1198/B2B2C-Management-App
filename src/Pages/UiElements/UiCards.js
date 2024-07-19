import React from 'react';
import { Link } from "react-router-dom";
import Masonry from 'react-masonry-css';
import "./masonry.css";

// import images
import img1 from "../../assets/images/small/img-1.jpg";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img4 from "../../assets/images/small/img-4.jpg";
import img5 from "../../assets/images/small/img-5.jpg";
import img6 from "../../assets/images/small/img-6.jpg";
import img7 from "../../assets/images/small/img-7.jpg";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  CardHeader,
  CardImgOverlay,
  CardFooter,
  CardDeck,
  Container,
} from "reactstrap";


const UiCards = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };
  document.title = "Cards | aaMOBee";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Cards" />

          <Row>
            <Col mg={6} xl={3}>
              <Card>
                <CardImg top className="img-fluid" src={img1} alt="aaMOBee" />
                <CardBody>
                  <CardTitle className="mt-0">Card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                  <Link
                    to="#"
                    className="btn btn-primary"
                  >
                    Button
                  </Link>
                </CardBody>
              </Card>
            </Col>
            <Col mg={6} xl={3}>
              <Card>
                <CardImg top className="img-fluid" src={img2} alt="aaMOBee" />
                <CardBody>
                  <CardTitle className="mt-0">Card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
                <CardBody>
                  <Link to="#" className="card-link">
                    Card link
                  </Link>
                  <Link to="#" className="card-link">
                    Another link
                  </Link>
                </CardBody>
              </Card>
            </Col>

            <Col mg={6} xl={3}>
              <Card>
                <CardImg top className="img-fluid" src={img3} alt="aaMOBee" />
                <CardBody>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} xl={3}>
              <Card>
                <CardBody>
                  <CardTitle className="mt-0">Card title</CardTitle>
                  <CardSubtitle className="font-14 text-muted">
                    Support card subtitle
                  </CardSubtitle>
                </CardBody>
                <CardImg className="img-fluid" src={img4} alt="aaMOBee" />
                <CardBody>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                  <Link to="#" className="card-link">
                    Card link
                  </Link>
                  <Link to="#" className="card-link">
                    Another link
                  </Link>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card body>
                <CardTitle className="mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>
            <Col md={6}>
              <Card body>
                <CardTitle className="mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card body>
                <CardTitle className="mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className="text-center">
                <CardTitle className="mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>

            <Col lg={4}>
              <Card body className="text-end">
                <CardTitle className="mt-0">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link
                  to="#"
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card>
                <CardHeader className="h4 bg-transparent border-bottom text-uppercase">Featured</CardHeader>
                <CardBody>
                  <CardTitle className="mt-0">
                    Special title treatment
                  </CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Link to="#" className="btn btn-primary">
                    Go somewhere
                  </Link>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardHeader className="bg-transparent border-bottom text-uppercase">Quote</CardHeader>
                <CardBody>
                  <blockquote className="card-blockquote mb-0">
                    <CardText>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer posuere erat a ante.
                    </CardText>
                    <footer className="blockquote-footer font-size-12">
                      Someone famous in
                      <cite title="Source Title">Source Title</cite>
                    </footer>
                  </blockquote>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardHeader className="bg-transparent border-bottom text-uppercase">Featured</CardHeader>
                <CardBody>
                  <CardTitle className="mt-0">
                    Special title treatment
                  </CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Link
                    to="#"
                    className="btn btn-primary"
                  >
                    Go somewhere
                  </Link>
                </CardBody>
                <CardFooter className="text-muted">2 days ago</CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card>
                <CardImg top className="img-fluid" src={img5} alt="aaMOBee" />
                <CardBody>
                  <CardTitle className="mt-0">Card title</CardTitle>
                  <CardText>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </CardText>
                  <CardText>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardBody>
                  <CardTitle className="mt-0">Card title</CardTitle>
                  <CardText>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </CardText>
                  <CardText>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardBody>
                <CardImg bottom className="img-fluid" src={img7} alt="aaMOBee" />
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardImg className="img-fluid" src={img6} alt="aaMOBee" />
                <CardImgOverlay>
                  <CardTitle className="text-white mt-0">Card title</CardTitle>
                  <CardText className="text-light">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </CardText>
                  <CardText>
                    <small className="text-white">
                      Last updated 3 mins ago
                    </small>
                  </CardText>
                </CardImgOverlay>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <Row className="no-gutters align-items-center">
                  <Col md={4}>
                    <CardImg className="img-fluid" src={img2} alt="aaMOBee" />
                  </Col>
                  <Col md={8}>
                    <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Row className="no-gutters align-items-center">
                  <Col md={8}>
                    <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Col>
                  <Col md={4}>
                    <CardImg className="img-fluid" src={img3} alt="aaMOBee" />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card color="primary" className="card-primary">
              <h6 className="card-header">Primary Card</h6>
                <CardBody>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card color="success" className="card-success">
              <h6 className="card-header">Success Card</h6>

                <CardBody>
                  
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card color="info" className="card-info">
              <h6 className="card-header">Info Card</h6>

                <CardBody>
                  
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card color="warning" className="card-warning">
              <h6 className="card-header">Warning Card</h6>

                <CardBody>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card color="danger" className="card-danger">
              <h6 className="card-header">Danger Card</h6>

                <CardBody>
                  
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card color="dark" className="card-dark">
              <h6 className="card-header"> Dark Card</h6>

                <CardBody>
                  
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Card outline color="primary" className="border card-border-primary">
                <CardHeader className="bg-transparent">
                  <h5 className="my-0 text-primary">
                  Header
                  </h5>
                </CardHeader>
                <CardBody>
                  <CardTitle className="mt-0">Primary card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
                <CardFooter>Footer</CardFooter>
              </Card>
            </Col>

            <Col lg={4}>
              <Card outline color="danger" className="border card-border-danger">
                <CardHeader className="bg-transparent">
                  <h5 className="my-0 text-danger">
                  Header
                  </h5>
                </CardHeader>
                <CardBody>
                  <CardTitle className="mt-0">Primary card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
                <CardFooter>Footer</CardFooter>
              </Card>
            </Col>

            <Col lg={4}>
              <Card outline color="success" className="border card-border-success">
                <CardHeader className="bg-transparent">
                  <h5 className="my-0 text-success">
                  Header
                  </h5>
                </CardHeader>
                <CardBody>
                  <CardTitle className="mt-0">Primary card title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                </CardBody>
                <CardFooter >Footer</CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="col-12 mb-4">
              <h4 className="my-3">Card groups</h4>
              <CardDeck className="card-deck-wrapper">
                <div className="card-group">
                  <Card className="mb-4">
                    <CardImg top className="img-fluid" src={img4} alt="aaMOBee" />
                    <CardBody>
                      <CardTitle className="mt-0">Card title</CardTitle>
                      <CardText>
                        This is a longer card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                  <Card className="mb-4">
                    <CardImg top className="img-fluid" src={img5} alt="aaMOBee" />
                    <CardBody>
                      <CardTitle className="mt-0">Card title</CardTitle>
                      <CardText>
                        This card has supporting text below as a natural lead-in
                        to additional content.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                  <Card className="mb-4">
                    <CardImg top className="img-fluid" src={img6} alt="aaMOBee" />
                    <CardBody>
                      <CardTitle className="mt-0">Card title</CardTitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This card has even
                        longer content than the first to show that equal height
                        action.
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              </CardDeck>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <h4 className="my-3">Cards Masonry</h4>
              <Row>


                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  <Col>
                    <Card>
                      <img src={img3} className="card-img-top" alt="..." />
                      <CardBody>
                        <CardTitle>Card title that wraps to a new line</CardTitle>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                          content. This content is a little bit longer.</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <img src={img5} className="card-img-top" alt="..." />
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <img src={img7} className="card-img-top" alt="..." />
                    </Card>
                  </Col>
                  <Col >
                    <Card>
                      <CardBody>
                        <blockquote className="blockquote font-size-14 mb-0">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                          <footer className="blockquote-footer font-size-12 mt-0">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                          </footer>
                        </blockquote>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <div className="card bg-primary text-white text-center p-3">
                      <blockquote className="card-blockquote font-size-14 mb-0">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
                        <footer className="blockquote-footer text-white font-size-12 mt-0 mb-0">
                          Someone famous in <cite title="Source Title">Source Title</cite>
                        </footer>
                      </blockquote>
                    </div>
                  </Col>
                  <Col>
                    <div className="card p-3 text-end">
                      <blockquote className="blockquote blockquote-reverse  mb-0">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                        <footer className="blockquote-footer mt-0">
                          <small className="text-muted">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                          </small>
                        </footer>
                      </blockquote>
                    </div>
                  </Col>
                  <div></div>
                  <Col>
                    <div className="card text-center">
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <p className="card-text">This card has a regular title and short paragraphy of text below it.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                      </CardBody>
                    </div>
                  </Col>

                  <Col>
                    <Card>
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <p className="card-text">This is another card with title and supporting text below. This card has some additional
                          content to make it slightly taller overall.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                      </CardBody>
                    </Card>
                  </Col>
                </Masonry>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default UiCards;
