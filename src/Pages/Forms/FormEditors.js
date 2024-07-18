import React from "react";

import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
} from "reactstrap";

// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormEditors = () => {
  document.title = "Form Editors | aaMOBee - React Admin & Dashboard Template";
  return (
    <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Form Editors" />

            <Row>
              <Col>
                <Card>
                  <CardBody  style={{height:"500px"}}>
                    <CardTitle className="h4">Forms Editors</CardTitle>
                    <p className="card-title-desc">
                      Your powerful rich text editor
                    </p>

                    <Form method="post">
                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        placeholder="Start From Here..."
                      />
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
    </React.Fragment>
  );
};

export default FormEditors;
