import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Table } from 'reactstrap';

const ViewCustomer = () => {
    const [customersData, setCustomersData] = useState([])
    const token = JSON.parse(localStorage.getItem("authUser")).token;
    const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
    const [trigger, setTrigger] = useState(0)

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/customer/get-customers/${firmId}`, config).then((response) => {
            setCustomersData(response.data)
        }).catch((error) => {
            console.error(error)
        })
    },[trigger])

    const handleCustomerDelete = (customer) => {
        axios.delete(`${process.env.REACT_APP_URL}/customer/delete-customer/${customer._id}`, config).then((response) => {
            setTrigger(prev => prev + 1)
        }).catch((error) => {
            console.error(error)
        })
    }

  return (
    <React.Fragment>
            <div className='page-content'>
                <h1>View Customers</h1>
                {customersData.length === 0 ? (
                    <Alert color="info">No Customers found for Your Firm.</Alert>
                ) : (
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Sr no</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Firm Name</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customersData.map((customer, i) => (
                                <tr key={customer.id}>
                                    <td>{i + 1}</td>
                                    <td>{customer.firstName + " " + customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.firmId.companyTitle}</td>
                                    <td>{customer.address.country}</td>
                                    <td>
                                        <Button
                                            color="info"
                                            onClick={() => {
                                                handleCustomerDelete(customer)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </React.Fragment>
  )
}

export default ViewCustomer