import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import PrintFormat from '../../components/InvoicingComponents/printFormat';
import axios from 'axios';
import { formatDate } from '../Utility/formatDate';
import FirmSwitcher from '../Firms/FirmSwitcher';
import ViewFormat from '../../components/InvoicingComponents/viewFormat';
import { toast } from 'react-toastify';

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
            handlePrint(); 
        } catch (error) {
            console.error("Error fetching invoice for printing:", error);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        onAfterPrint: () => setSelectedInvoice(null), 
    });

    const handleRejectProforma = async (invoiceId) => {
        if (!invoiceId) {
            console.error("Invoice ID is not provided");
            return;
        }
    
        try {
            const response = await axios.put(`${process.env.REACT_APP_URL}/invoice/reject-invoice/${invoiceId}`, {}, config);
            console.log("Proforma invoice rejected successfully:", response.message);
            toast.success(response.message);
            setTrigger(prev => prev + 1);
        } catch (error) {
            // console.error("Error rejecting proforma invoice:", error);
            const errorMessage = error ;
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    };
    

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
                    <div class="table-responsive">
                    <Table bordered>
                        <thead class="table-light text-center">
                            <tr>
                                <th>Invoice ID</th>
                                <th>Customer Name</th>
                                <th>Amount Total</th>
                                <th>Amount Due</th>
                                <th>Date</th>
                                <th>Country</th>
                                <th>Status</th>
                                <th>Actions</th>
                                {authuser.role === "firm_admin" && <th className='d-flex justify-content-center'>Approvals</th>}
                                {authuser.role === "firm_admin" && <th>Proforma Actions</th>}
                                {authuser.role === "firm_admin" && <th>Proforma Status</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice._id}>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td>{invoice.customerName}</td>
                                    <td>{invoice.totalAmount} ₹</td>
                                    <td>{invoice.amountDue} ₹</td>
                                    <td>{formatDate(invoice.invoiceDate)}</td>
                                    <td>{invoice.customerAddress.country}</td>
                                    <td>{invoice.approvalStatus}</td>
                                    <td>
                                        <i className="bx bx-printer" style={{ fontSize: "22px", fontWeight:"bold", cursor: "pointer" }} onClick={() => fetchAndPrintInvoice(invoice._id)}></i>
                                    </td>
                                    {authuser.role === "firm_admin" && (
                                        <td>
                                            <>
                                                {invoice.approvalStatus === "pending" ? (
                                                    <>
                                                        <i className="bx bx-x" style={{ fontSize: "22px", fontWeight:"bold", cursor: "pointer" }} onClick={() => handleApproveStatus(invoice, "rejected")}></i>
                                                        <i className="bx bx-check" style={{ fontSize: "22px", fontWeight:"bold", cursor: "pointer" }} onClick={() => handleApproveStatus(invoice, "approved")}></i>
                                                    </>
                                                ) : invoice.approvalStatus === "approved" ? (
                                                    <i className="bx bx-x" style={{ fontSize: "22px", fontWeight:"bold", cursor: "pointer" }} onClick={() => handleApproveStatus(invoice, "rejected")}></i>
                                                ) : (
                                                    <i className="bx bx-check" style={{ fontSize: "22px", fontWeight:"bold", cursor: "pointer" }} onClick={() => handleApproveStatus(invoice, "approved")}></i>
                                                )}
                                            </>
                                        </td>
                                    )}
                                    {authuser.role === "firm_admin" && invoice.invoiceType === "Proforma" && (
                                       <Button color="danger" size="sm" onClick={() => {
                                                console.log("Rejecting Proforma Invoice ID:", invoice._id);
                                                handleRejectProforma(invoice._id);
                                             }}>
                                        Reject Proforma
                                    </Button>
                                    
                                    )}
                                    {authuser.role === "firm_admin" && (
                                        <td>{invoice.status}</td>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                )}
                {selectedInvoice && (
                    <ViewFormat ref={printRef} invoiceData={selectedInvoice} />
                )}
            </div>
        </React.Fragment>
    );
};

export default ViewInvoices;
