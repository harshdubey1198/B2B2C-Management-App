import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

import logolight from '../../assets/images/logo-light.png';
import logodark from '../../assets/images/logo-dark.png';

const ResetPassword = () => {
    const { token } = useParams(); 
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Simulate success or error response
        setTimeout(() => {
            setSuccess('Password has been reset successfully');
            setLoading(false);
        }, 1000);
    };

    return (
        <React.Fragment>
            <div className="bg-pattern" style={{ height: "100vh" }}>
                <div className="bg-overlay"></div>
                <div className="account-pages pt-1">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6} md={8} xl={4}>
                                <Card className='mt-5'>
                                    <CardBody className="p-4">
                                        <div className="">
                                            <div className="text-center">
                                                <Link to="/" className="">
                                                    <img src={logodark} alt="" height="24" className="auth-logo logo-dark mx-auto" />
                                                    <img src={logolight} alt="" height="24" className="auth-logo logo-light mx-auto" />
                                                </Link>
                                            </div>
                                            <h4 className="font-size-18 text-muted mt-2 text-center">Reset Password</h4>
                                            <p className="mb-5 text-center">Reset your Password with aaMOBee.</p>

                                            {error && <Alert color="danger">{error}</Alert>}
                                            {success && <Alert color="success">{success}</Alert>}

                                            <form className="form-horizontal" onSubmit={handleSubmit}>
                                                <FormGroup>
                                                    <Label className="form-label" htmlFor="email">Email</Label>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        placeholder="Enter email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label className="form-label" htmlFor="role">Role</Label>
                                                    <Input
                                                        type="select"
                                                        id="role"
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select User Role</option>
                                                        <option value="super_admin">Super Admin</option>
                                                        <option value="client_admin">Client Admin</option>
                                                        <option value="firm_admin">Firm Manager</option>
                                                        <option value="accountant">Accountant</option>
                                                        <option value="g_emp">Employee</option>
                                                        <option value="customer_sp">Support Executive</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label className="form-label" htmlFor="newPassword">New Password</Label>
                                                    <Input
                                                        type="password"
                                                        id="newPassword"
                                                        placeholder="Enter new password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label className="form-label" htmlFor="confirmPassword">Confirm Password</Label>
                                                    <Input
                                                        type="password"
                                                        id="confirmPassword"
                                                        placeholder="Confirm new password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                                <div className="d-grid mt-4">
                                                    <Button color="primary" type="submit" disabled={loading}>
                                                        {loading ? 'Resetting...' : 'Reset Password'}
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p className="text-white-50">
                                        Remembered your password? <Link to="/login" className="fw-medium text-primary">Login</Link>
                                    </p>
                                    <p className="text-white-50">© {new Date().getFullYear()} aaMOBee.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ResetPassword;
