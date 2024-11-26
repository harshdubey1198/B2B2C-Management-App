import axios from 'axios';
import React, { useEffect } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap';

function SelfProfiling() {
    const authuser = JSON.parse(localStorage.getItem('authUser'))?.response
    // const userId = authuser?._id

    // useEffect(() => {
    //     const selfProfiling = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_URL}/auth/getaccount/${userId}`);
    //             // console.log(response)
    //         } catch (error) {
    //             console.error("Error fetching user count:", error);
    //         }
    //     };
    //     selfProfiling()
    // }
    // ,[])


  return (
    <React.Fragment>
        <Card >
            <CardBody>
                    <div className="d-flex text-muted">
                        <div className="me-auto">
                            <h3 className="mb-0">Profile</h3>
                        </div>
                    </div>
                    
                <Row>
                    <Col lg={6} sm={12} className="mb-3 d-flex justify-content-center align-items-center">
                    <img src={authuser?.avatar} alt="profile" className="avatar-xl" />
                    </Col>
                    <Col lg={6} sm={12} className="mb-3">
                    <div>
                        <p className="my-1">Name: {authuser?.firstName + " " + authuser?.lastName}</p>
                        <p className="mb-1">Email: {authuser?.email}</p>
                        <p className="mb-1">
                            Role:{" "}
                            {authuser?.role
                                ?.replace(/[_-]/g, " ") 
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                            </p>

                        <p className="mb-1">Phone: {authuser?.mobile}</p>
                    </div>
                    </Col>
                </Row>    
            </CardBody>
        </Card>
    </React.Fragment>

  )
}

export default SelfProfiling