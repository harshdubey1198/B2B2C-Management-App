import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Alert} from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import PrintFormat from '../../components/InvoicingComponents/printFormat';
import axios from 'axios';
import { formatDate } from '../Utility/formatDate';
import FirmSwitcher from '../Firms/FirmSwitcher';
import ViewFormat from '../../components/InvoicingComponents/viewFormat';
import { toast } from 'react-toastify';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import axiosInstance from '../../utils/axiosInstance';

const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedFirmId, setSelectedFirmId] = useState(null);
    const [trigger, setTrigger] = useState(0);
    const printRef = useRef();
    const authuser = JSON.parse(localStorage.getItem("authUser")).response;
    const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;


    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const url = authuser.role === "client_admin" 
                    ? `${process.env.REACT_APP_URL}/invoice/get-invoices/${selectedFirmId}` 
                    : `${process.env.REACT_APP_URL}/invoice/get-invoices/${firmId}`;
                
                const response = await axiosInstance.get(url);
                setInvoices(response.data);
                console.log("tax rate" , response.data[0].items[0].itemId.tax.components[0].rate );
                console.log("tax name" , response.data[0].items[0].itemId.tax.components[0].taxType );
            } catch (error) {
                console.error("Error fetching invoices:", error);
                setInvoices([]);
            }
        };

        fetchInvoices();
    }, [trigger, selectedFirmId, authuser.role, firmId]);

    const fetchInvoice = async (invoiceId) => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_URL}/invoice/get-invoice/${invoiceId}`);
            setSelectedInvoice(response.data); 
        } catch (error) {
            console.error("Error fetching invoice for viewing:", error);
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
            const response = await axiosInstance.put(`${process.env.REACT_APP_URL}/invoice/reject-invoice/${invoiceId}`, {});
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
            await axiosInstance.put(`${process.env.REACT_APP_URL}/invoice/update-invoice-approval`, {
                id: invoice._id,
                userId: authuser._id,
                approvalStatus: status
            });
            setTrigger(prev => prev + 1); 
        } catch (error) {
            console.error("Error updating invoice status:", error);
        }
    };

    return (
        <React.Fragment>
            <div className='page-content'>
                <Breadcrumbs title="Invoicing" breadcrumbItem="View Invoices" />
                {/* <h1>View Invoices</h1> */}
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
                    <div className="table-responsive">
                    <Table bordered>
                        <thead className="table-light">
                            <tr>
                                <th>Inv ID</th>
                                <th>Client</th>
                                <th>Total</th>
                                <th>Due</th>
                                <th>Taxes</th>
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
                                    <td style={{color:"red"}}>{invoice.amountDue} ₹</td>
                                    <td style={{minWidth:"110px"}}>
                                        <ul style={{paddingLeft:"0.5rem", listStyle:"none"}}>
                                            {invoice.items.map((item, itemIndex) => (
                                                item.itemId.tax.components.map((tax, taxIndex) => (
                                                    <li key={`${itemIndex}-${taxIndex}`}>
                                                        {tax.taxType} - {tax.rate}%
                                                    </li>
                                                ))
                                            ))}
                                        </ul>
                                     </td>
                                    <td>{formatDate(invoice.invoiceDate)}</td>
                                    <td>{invoice.customerAddress.country}</td>
                                    <td>{invoice.approvalStatus}</td>
                                    <td>
                                        <i
                                            className="bx bx-show"
                                            style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }}
                                            onClick={() => fetchInvoice(invoice._id)} 
                                        ></i>
                                        <i
                                            className="bx bx-printer"
                                            style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer", marginLeft: "10px" }}
                                            onClick={() => handlePrint()} 
                                        ></i>
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
                                       <td><Button color="danger" size="sm" onClick={() => {
                                                console.log("Rejecting Proforma Invoice ID:", invoice._id);
                                                handleRejectProforma(invoice._id);
                                             }}>
                                        Reject Proforma
                                    </Button>
                                    </td>
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
