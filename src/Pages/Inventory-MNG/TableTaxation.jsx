import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Button, Table } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TaxationModal from '../../Modal/taxationModal';
import axios from 'axios';
import { toast } from 'react-toastify';

function TaxationTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [taxes, setTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const authuser = JSON.parse(localStorage.getItem('authUser'));
  const token = authuser.token;
  const userId = authuser.response._id;
  const firmId = authuser.response.adminId;
  const [trigger, setTrigger] = useState(0);
  const toggleModal = () => setModalOpen(!modalOpen);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const fetchTaxes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/tax/get-taxes/${firmId}`,
        config
      );
      setTaxes(response.data);
    } catch (error) {
      console.error('Error fetching taxes:', error);
    }
  };

  const handleTaxCreatedOrUpdated = (tax) => {
    if (selectedTax) {
      setTaxes(taxes.map(t => t._id === tax._id ? tax : t));
    } else {
      setTaxes([...taxes, tax]);
    }
    setSelectedTax(null);
  };

  const handleEditClick = (tax) => {
    setSelectedTax(tax);
    toggleModal();
  };

  const handleDeleteClick = async (taxId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tax?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/tax/delete-tax/${taxId}`,
        config
      );
      setTaxes(taxes.filter(t => t._id !== taxId));
      toast.success(response.data.message || "Tax deleted successfully");
    } catch (error) {
      console.error('Error deleting tax:', error);
      toast.error('Failed to delete tax');
    }
  };

  useEffect(() => {
    fetchTaxes();
  }, [trigger]);

  const refetchTaxes = () => {
    setTrigger(trigger + 1);
  };  

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Taxation Management" breadcrumbItem="Taxation Table" />
        <Col lg="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-start gap-2">
              <i className='bx bx-refresh cursor-pointer'  style={{fontSize: "24.5px",fontWeight: "bold",color: "black",transition: "color 0.3s ease"}} onClick={refetchTaxes} onMouseEnter={(e) => e.target.style.color = "green"}  onMouseLeave={(e) => e.target.style.color = "black"}></i>
              <Button color="primary" className="p-2" style={{maxHeight:"27.13px",fontSize:"10.5px" , lineHeight:"1"}} onClick={() => { setSelectedTax(null); toggleModal(); }}>
                  Add New Tax
                </Button>
              </div>
              <Table className="mt-4" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tax Name</th>
                    <th>Tax Types</th>
                    <th>Actions</th>
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
                      <td>
                        <i
                          className="bx bx-edit mx-1"
                          onClick={() => handleEditClick(tax)}
                          style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }}
                        ></i>
                        <i
                          className="bx bx-trash mx-1"
                          onClick={() => handleDeleteClick(tax._id)}
                          style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }}
                        ></i>
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
          config={config}
          userId={userId}
          tax={selectedTax}
          onTaxCreatedOrUpdated={handleTaxCreatedOrUpdated}
        />
      </div>
    </React.Fragment>
  );
}

export default TaxationTable;
