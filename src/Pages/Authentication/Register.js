import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

// redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { createSelector } from 'reselect';

// import images
import logolight from '../../assets/images/logo-light.png';
import logodark from '../../assets/images/logo-dark.png';

const Register = props => {
    document.title = "Register | aaMOBee";

    const dispatch = useDispatch();

    // Default values for role and status
    const defaultRole = 'client-admin';
    const defaultStatus = 'requested';

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            companyMobile: '',
            mobile: '',
            dob: '',
            address: '',
            role: defaultRole,     // Default role value
            status: defaultStatus, // Default status value
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Please Enter Your First Name"),
            lastName: Yup.string().required("Please Enter Your Last Name"),
            email: Yup.string().email("Invalid email address").required("Please Enter Your Email"),
            username: Yup.string().required("Please Enter Your Username"),
            password: Yup.string().required("Please Enter Your Password"),
            companyMobile: Yup.string().required("Please Enter Your Company Mobile"),
            mobile: Yup.string().required("Please Enter Your Mobile"),
            dob: Yup.date().required("Please Enter Your Date of Birth"),
            address: Yup.string().required("Please Enter Your Address"),
            // No validation needed for role and status as they're hidden
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
        }
    });

    const registerpage = createSelector(
        (state) => state.account,
        (state) => ({
            user: state.user,
            registrationError: state.registrationError,
        })
    );

    const { user, registrationError } = useSelector(registerpage);

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    return (
        <div className="bg-pattern" style={{height:"100%"}}>
            <div className="bg-overlay"></div>
            <div className="account-pages pt-0">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} md={10} xl={8}>
                            <Card className='mt-3'>
                                <CardBody className="p-4">
                                    <div className="text-center">
                                        <Link to="/" className="">
                                            <img src={logodark} alt="" height="24" className="auth-logo logo-dark mx-auto" />
                                            <img src={logolight} alt="" height="24" className="auth-logo logo-light mx-auto" />
                                        </Link>
                                    </div>

                                    <h4 className="font-size-18 text-muted text-center mt-2">Free Register</h4>
                                    <p className="text-muted text-center mb-4">Get your free aaMOBee account now.</p>
                                    <Form
                                        className="form-horizontal"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                    >
                                        {user && user ? (
                                            <Alert color="success">
                                                Register User Successfully
                                            </Alert>
                                        ) : null}

                                        {registrationError && registrationError ? (
                                            <Alert color="danger"><div>{registrationError}</div></Alert>
                                        ) : null}

                                        <Row>
                                            <Col md={6}>
                                                <div className="mb-4">
                                                    <Label className="form-label">First Name</Label>
                                                    <Input
                                                        name="firstName"
                                                        type="text"
                                                        placeholder="Enter First Name"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.firstName || ""}
                                                        invalid={
                                                            validation.touched.firstName && validation.errors.firstName ? true : false
                                                        }
                                                    />
                                                    {validation.touched.firstName && validation.errors.firstName ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.firstName}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-4">
                                                    <Label className="form-label">Email</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            validation.touched.email && validation.errors.email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-4">
                                                    <Label className="form-label">Company Mobile</Label>
                                                    <Input
                                                        name="companyMobile"
                                                        type="text"
                                                        placeholder="Enter Company Mobile"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.companyMobile || ""}
                                                        invalid={
                                                            validation.touched.companyMobile && validation.errors.companyMobile ? true : false
                                                        }
                                                    />
                                                    {validation.touched.companyMobile && validation.errors.companyMobile ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.companyMobile}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-4">
                                                    <Label className="form-label">Date of Birth</Label>
                                                    <Input
                                                        name="dob"
                                                        type="date"
                                                        placeholder="Enter Date of Birth"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.dob || ""}
                                                        invalid={
                                                            validation.touched.dob && validation.errors.dob ? true : false
                                                        }
                                                    />
                                                    {validation.touched.dob && validation.errors.dob ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.dob}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                {/* Hidden Role Field */}
                                                <Input
                                                    name="role"
                                                    type="hidden"
                                                    value={validation.values.role || defaultRole}
                                                />
                                                {/* Hidden Status Field */}
                                                <Input
                                                    name="status"
                                                    type="hidden"
                                                    value={validation.values.status || defaultStatus}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-4">
                                                    <Label className="form-label">Last Name</Label>
                                                    <Input
                                                        name="lastName"
                                                        type="text"
                                                        placeholder="Enter Last Name"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.lastName || ""}
                                                        invalid={
                                                            validation.touched.lastName && validation.errors.lastName ? true : false
                                                        }
                                                    />
                                                    {validation.touched.lastName && validation.errors.lastName ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.lastName}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-4">
                                                    <Label className="form-label">Username</Label>
                                                    <Input
                                                        name="username"
                                                        type="text"
                                                        placeholder="Enter username"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.username || ""}
                                                        invalid={
                                                            validation.touched.username && validation.errors.username ? true : false
                                                        }
                                                    />
                                                    {validation.touched.username && validation.errors.username ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.username}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-4">
                                                    <Label className="form-label">Mobile</Label>
                                                    <Input
                                                        name="mobile"
                                                        type="text"
                                                        placeholder="Enter Mobile"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.mobile || ""}
                                                        invalid={
                                                            validation.touched.mobile && validation.errors.mobile ? true : false
                                                        }
                                                    />
                                                    {validation.touched.mobile && validation.errors.mobile ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.mobile}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-4">
                                                    <Label className="form-label">Address</Label>
                                                    <Input
                                                        name="address"
                                                        type="text"
                                                        placeholder="Enter Address"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.address || ""}
                                                        invalid={
                                                            validation.touched.address && validation.errors.address ? true : false
                                                        }
                                                    />
                                                    {validation.touched.address && validation.errors.address ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.address}</div></FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="form-check">
                                            <Input type="checkbox" className="form-check-input" id="term-conditionCheck" />
                                            <Label className="form-check-label fw-normal" htmlFor="term-conditionCheck">I accept <Link to="#" className="text-primary">Terms and Conditions</Link></Label>
                                        </div>
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary waves-effect waves-light" type="submit">Register</button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p className="text-white-50">Already have an account ?<Link to="/login" className="fw-medium text-primary"> Login </Link> </p>
                                <p className="text-white-50">© {new Date().getFullYear()} aaMOBee.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Register;
