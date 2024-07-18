import React from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Card,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

// Form Mask
import InputMask from "react-input-mask";

const FormMask = () => {
  document.title = "Form Mask | aaMOBee - React Admin & Dashboard Template";


  const DateStyle1 = (props) => (
    <InputMask
      mask="99/99/9999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
    </InputMask>
  );

  const DateStyle2 = (props) => (
    <InputMask
      mask="99/99/9999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
    </InputMask>
  );


  const Datetime = (props) => (
    <InputMask
      mask="yyyy-mm-dd'T'HH:MM:ss"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
    </InputMask>
  );


  const Email = (props) => (
    <InputMask
      mask="_@_._"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
    </InputMask>
  );

  const IPV4 = props => (
    <InputMask
      mask="999.999.999.999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
    </InputMask>
  );


  const TAX = props => (
    <InputMask
      mask="99-9999999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
    </InputMask>
  );

  const Phone = props => (
    <InputMask
      mask="999-999-9999"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
    </InputMask>
  );

  const Currency = props => (
    <InputMask
      mask="$ 999,999,999.99"
      value={props.value}
      className="form-control input-color"
      onChange={props.onChange}
    >
    </InputMask>
  );


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Mask" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Example</CardTitle>
                  <Row>
                    <Col md="6">
                      <div className="p-20">
                        <Form action="#">
                          <div className="mb-4">
                            <Label>Date Style 1</Label>
                            <DateStyle1 />
                            <span className="font-13 text-muted">
                              e.g "dd/mm/yyyy"
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>Date Style 2</Label>
                            <DateStyle2 />
                            <span className="font-13 text-muted">
                              e.g "dd/mm/yyyy"
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>Date Time</Label>
                            <Datetime />
                            <span className="font-13 text-muted">
                              e.g "yyyy-mm-dd'T'HH:MM:ss"
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>Currency:</Label>
                            <Currency />
                            <span className="font-13 text-muted">
                              e.g "$ 0.00"
                            </span>
                          </div>
                        </Form>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="p-20">
                        <Form action="#">
                          <div className="mb-4">
                            <Label>repeat:</Label>
                            <TAX />
                            <span className="font-13 text-muted">
                              e.g. "9999999999"
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>Mask</Label>
                            <Phone />
                            <span className="font-13 text-muted">
                              e.g "99-9999999"
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>IP address</Label>
                            <IPV4 />
                            <span className="font-13 text-muted">
                              e.g "99.99.99.99"
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>Email address::</Label>
                            <Email />
                            <span className="font-13 text-muted">
                              _@_._
                            </span>
                          </div>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};


export default FormMask;
