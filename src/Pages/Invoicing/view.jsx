import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import PrintFormat from '../../components/InvoicingComponents/printFormat';
import axios from 'axios';
import { formatDate } from '../Utility/formatDate';
import FirmSwitcher from '../Firms/FirmSwitcher';
import ViewFormat from '../../components/InvoicingComponents/viewFormat';

const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedFirmId, setSelectedFirmId] = useState(null);
    const [trigger, setTrigger] = useState(0);
    const printRef = useRef();
    const authuser = JSON.parse(localStorage.getItem("authUser")).response;
    const token = JSON.parse(localStorage.getItem("authUser")).token;
    const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    // Fetch invoices for firm_admin or accountant role
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const url = authuser.role === "client_admin" 
                    ? `${process.env.REACT_APP_URL}/invoice/get-invoices/${selectedFirmId}` 
                    : `${process.env.REACT_APP_URL}/invoice/get-invoices/${firmId}`;
                
                const response = await axios.get(url, config);
                setInvoices(response.data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
                setInvoices([]);
            }
        };

        fetchInvoices();
    }, [trigger, selectedFirmId, authuser.role, firmId]);


    const fetchAndPrintInvoice = async (invoiceId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/invoice/get-invoice/${invoiceId}`, config);
            setSelectedInvoice(response.data);
            console.log(response.data);
            console.log(response.data.totalAmount);
            handlePrint(); 
        } catch (error) {
            console.error("Error fetching invoice for printing:", error);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        onAfterPrint: () => setSelectedInvoice(null), 
    });
    const handleApproveStatus = async (invoice, status) => {
        try {
            await axios.put(`${process.env.REACT_APP_URL}/invoice/update-invoice-approval`, {
                id: invoice._id,
                userId: authuser._id,
                approvalStatus: status
            }, config);
            setTrigger(prev => prev + 1); 
        } catch (error) {
            console.error("Error updating invoice status:", error);
        }
    };

    return (
        <React.Fragment>
            <div className='page-content'>
                <h1>View Invoices</h1>
                <div className="d-flex justify-content-between mb-4">
                    {authuser.role === "client_admin" && (
                        <FirmSwitcher
                            selectedFirmId={selectedFirmId}
                            onSelectFirm={setSelectedFirmId}
                        />
                    )}
                </div>
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
                                <th>Status</th>
                                <th>Actions</th>
                                {authuser.role === "firm_admin" && <th>Approvals</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice._id}>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td>{invoice.customerName}</td>
                                    <td>{formatDate(invoice.invoiceDate)}</td>
                                    <td>{invoice.customerAddress.country}</td>
                                    <td>{invoice.approvalStatus}</td>
                                    <td>
                                        <Button color="info" onClick={() => fetchAndPrintInvoice(invoice._id)}>Print</Button>
                                        {authuser.role === "firm_admin" && (
                                            <>
                                                {invoice.approvalStatus === "pending" ? (
                                                    <>
                                                        <Button color="success" onClick={() => handleApproveStatus(invoice, "approved")}>Approve</Button>{' '}
                                                        <Button color="danger" onClick={() => handleApproveStatus(invoice, "rejected")}>Reject</Button>
                                                    </>
                                                ) : invoice.approvalStatus === "approved" ? (
                                                    <Button color="danger" onClick={() => handleApproveStatus(invoice, "rejected")}>Reject</Button>
                                                ) : (
                                                    <Button color="success" onClick={() => handleApproveStatus(invoice, "approved")}>Approve</Button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                {selectedInvoice && (
                    <ViewFormat ref={printRef} invoiceData={selectedInvoice} />
                )}
            </div>
        </React.Fragment>
    );
};

export default ViewInvoices;
