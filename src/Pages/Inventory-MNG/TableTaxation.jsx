import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Button, Table } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TaxationModal from '../../Modal/taxationModal';
import axios from 'axios';

function TaxationTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [taxes, setTaxes] = useState([]);
  const authuser = JSON.parse(localStorage.getItem('authUser'));
  const token = authuser.token;
  const userId = authuser.response._id;
  const firmId = authuser.response.adminId;

  const toggleModal = () => setModalOpen(!modalOpen);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchTaxes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7200/api/tax/get-taxes/${firmId}`,
      config
      );
      setTaxes(response.data);
    } catch (error) {
      console.error('Error fetching taxes:', error);
    }
  };

  const handleTaxCreated = (newTax) => {
    setTaxes([...taxes, newTax]);
  };

  useEffect(() => {
    fetchTaxes();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Taxation Management" breadcrumbItem="Taxation Table" />
        <Col lg="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <h4 className="card-title">Taxation Table</h4>
                <Button color="primary" onClick={toggleModal}>
                  Add New Tax
                </Button>
              </div>
              <Table className="mt-4" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tax Name</th>
                    <th>Tax Types</th>
                  </tr>
                </thead>
                <tbody>
                  {taxes.map((tax, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tax.taxName}</td>
                      <td>
                        {tax.taxRates.map((rate, idx) => (
                          <div key={idx}>
                            {rate.taxType}: {rate.rate}%
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <TaxationModal
          isOpen={modalOpen}
          toggle={toggleModal}
          token={token}
          config={config}
          userId={userId}
          onTaxCreated={handleTaxCreated}
        />
      </div>
    </React.Fragment>
  );
}

export default TaxationTable;
