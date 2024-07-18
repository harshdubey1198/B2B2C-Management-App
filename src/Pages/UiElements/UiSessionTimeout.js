import React, { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiSessionTimeout = () => {

useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      window.location.href = '/auth-lock-screen';
    }, 30000);

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(redirectTimeout);
  }, []);

  document.title = "Session Timeout | aaMOBee - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* {timerAlert} */}

          <Breadcrumbs title="UI Elements" breadcrumbItem="Session Timeout" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>Bootstrap-session-timeout</CardTitle>
                  <p className="sub-header">
                    Session timeout and keep-alive control with a nice Bootstrap
                    warning dialog.
                  </p>

                  <div>
                    <p>
                      After a set amount of idle time, a Bootstrap warning
                      dialog is shown to the user with the option to either log
                      out or stay connected. If "Logout" button is selected, the
                      page is redirected to a logout URL. If "Stay Connected" is
                      selected the dialog closes and the session is kept alive.
                      If no option is selected after another set amount of idle
                      time, the page is automatically redirected to a set
                      timeout URL.
                    </p>
                    <p>
                      Idle time is defined as no mouse, keyboard, or touch event
                      activity registered by the browser.
                    </p>

                    <p className="mb-0">
                      As long as the user is active, the (optional) keep-alive
                      URL keeps getting pinged and the session stays alive. If
                      you have no need to keep the server-side session alive via
                      the keep-alive URL, you can also use this plugin as a
                      simple lock mechanism that redirects to your lock-session
                      or log-out URL after a set amount of idle time.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiSessionTimeout;

