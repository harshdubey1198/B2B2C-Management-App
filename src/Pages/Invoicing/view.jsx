import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import PrintFormat from '../../components/InvoicingComponents/printFormat';
import axios from 'axios';
import { formatDate } from '../Utility/formatDate';

const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const printRef = useRef();
    const token = JSON.parse(localStorage.getItem("authUser")).token;
    const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/invoice/get-invoices/${firmId}`, config);
                setInvoices(response.data);
                console.log("Fetched invoices: ", response.data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
                setInvoices([]);
            }
        };

        fetchInvoices();
    }, []);

    const printInvoice = useReactToPrint({
        content: () => printRef.current
    });

    return (
        <React.Fragment>
            <div className='page-content'>
                <h1>View Invoices</h1>
                {invoices.length === 0 ? (
                    <Alert color="info">No invoices found.</Alert>
                ) : (
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td>{invoice.customerName}</td>
                                    <td>{formatDate(invoice.invoiceDate)}</td>
                                    <td>{invoice.customerAddress.country}</td>
                                    <td>
                                        <Button
                                            color="info"
                                            onClick={() => {
                                                setSelectedInvoice(invoice);
                                                console.log("Selected invoice: ", invoice);
                                                printInvoice();
                                            }}
                                        >
                                            Print
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                {selectedInvoice && (
                    <PrintFormat ref={printRef} invoiceData={selectedInvoice} selectedInvoice={selectedInvoice}/>
                )}
            </div>
        </React.Fragment>
    );
};

export default ViewInvoices;
