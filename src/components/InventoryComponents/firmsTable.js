import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

function FirmsTable() {
  const [firms, setFirms] = useState([]);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const token = authuser?.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchFirms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/auth/getCompany/${authuser._id}`, config);
        setFirms(response.data);
      } catch (error) {
        console.error('Error fetching firms data:', error);
      }
    };

      fetchFirms();
  }, []);

  return (
    <div className="table-responsive">
      <Table bordered className="mb-0">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Company Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {firms.length > 0 ? (
            firms.map((firm, index) => (
              <tr key={index}>
                <td>{firm.companyTitle}</td>
                <td>{firm.email}</td>
                <td>
                  <Button color="primary">View Inventory</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No firms found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default FirmsTable;
