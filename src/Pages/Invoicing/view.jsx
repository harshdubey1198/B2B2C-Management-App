import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Alert, Pagination, PaginationItem, PaginationLink, Card,Row,Col, CardBody, Input } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
// import PrintFormat from '../../components/InvoicingComponents/printFormat';
import axios from 'axios';
import { formatDate } from '../Utility/formatDate'; 
import FirmSwitcher from '../Firms/FirmSwitcher';
import { toast } from 'react-toastify';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import axiosInstance from '../../utils/axiosInstance';
import ViewFormat from '../../components/InvoicingComponents/viewFormat';
import { ScaleLoader } from "react-spinners";


const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [viewInvoice, setViewInvoice] = useState(false);
    const [selectedFirmId, setSelectedFirmId] = useState(null);
    const [trigger, setTrigger] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading , setLoading] = useState(false);
    const [invoicesPerPage] = useState(10);
    const [filter, setFilter] = useState({
        clientName: '',
        invoiceId: '',
        date: '',
        status: '',
    });
    
    const printRef = useRef();
    const authuser = JSON.parse(localStorage.getItem("authUser")).response;
    const firmId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
    const statusOptions = ["Pending", "Approved", "Rejected"]; 
    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                const url = authuser.role === "client_admin"
                    ? `${process.env.REACT_APP_URL}/invoice/get-invoices/${selectedFirmId}`
                    : `${process.env.REACT_APP_URL}/invoice/get-invoices/${firmId}`;

                const response = await axiosInstance.get(url);
                setInvoices(response.data || []);
                setFilteredInvoices(response.data); 
            } catch (error) {
                console.error("Error fetching invoices:", error);
                setInvoices([]);
                setFilteredInvoices([]);
            }
            setLoading(false);
        };

        fetchInvoices();
    }, [trigger, selectedFirmId, authuser.role, firmId]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = invoices;

            if (filter.clientName) {
                filtered = filtered.filter(invoice =>
                    invoice.customerName.toLowerCase().includes(filter.clientName.toLowerCase())
                );
            } else if (filter.invoiceId) {
                filtered = filtered.filter(invoice =>
                    invoice.invoiceNumber.toString().includes(filter.invoiceId)
                );
            }
            if (filter.date) {
                const formattedDate = formatDate(filter.date, 'yyyy-mm-dd');
                filtered = filtered.filter(invoice =>
                    formatDate(invoice.invoiceDate, 'yyyy-mm-dd') === formattedDate
                );
            }

            if (filter.status) {
                filtered = filtered.filter(invoice =>
                    invoice.approvalStatus.toLowerCase().includes(filter.status.toLowerCase())
                );
            }

            setFilteredInvoices(filtered);
            setCurrentPage(1); // Reset to the first page on filter change
        };

        applyFilters();
    }, [filter, invoices]);

    const fetchInvoice = async (invoiceId) => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_URL}/invoice/get-invoice/${invoiceId}`);
            setViewInvoice(response.data); 
        } catch (error) {
            console.error("Error fetching invoice for viewing:", error);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        onAfterPrint: () => setViewInvoice(null),
    });

    const handleFetchAndPrint = async (invoiceId) => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_URL}/invoice/get-invoice/${invoiceId}`);
            setSelectedInvoice(response.data);  
            setTimeout(() => {
                handlePrint();
            }, 300);
        } catch (error) {
            console.error("Error fetching invoice for printing:", error);
        }
    };
    const handleRejectProforma = async (invoiceId) => {
        if (!invoiceId) return;

        try {
            const response = await axiosInstance.put(`${process.env.REACT_APP_URL}/invoice/reject-invoice/${invoiceId}`, {});
            toast.success(response.message);
            setTrigger(prev => prev + 1);
        } catch (error) {
            const errorMessage = error.message || "Error rejecting invoice";
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

    const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
    const currentInvoices = filteredInvoices.slice((currentPage - 1) * invoicesPerPage, currentPage * invoicesPerPage);

    return (
        <React.Fragment>
            <div className='page-content'>
                <Breadcrumbs title="Invoicing" breadcrumbItem="View Invoices" />
                <div className="d-flex justify-content-between mb-4">
                    {authuser.role === "client_admin" && (
                        <FirmSwitcher
                            selectedFirmId={selectedFirmId}
                            onSelectFirm={setSelectedFirmId}
                        />
                    )}
                </div>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                        <ScaleLoader color="#0d4251" />
                    </div>
                ) : (
                    <>
                        <div className="mb-3">
                            <Row form>
                                <Col md={4}>
                                    <Input
                                        type="text"
                                        placeholder="Client Name / Invoice ID"
                                        value={filter.clientName || filter.invoiceId}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d+$/.test(value)) {
                                                setFilter({ ...filter, invoiceId: value, clientName: '' });
                                            } else {
                                                setFilter({ ...filter, clientName: value, invoiceId: '' });
                                            }
                                        }}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Input
                                        type="date"
                                        placeholder="Date of Invoice"
                                        value={filter.date}
                                        onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Input
                                        type="select"
                                        value={filter.status}
                                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                    >
                                        <option value="">Select Status</option>
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </Input>
                                </Col>
                            </Row>
                        </div>
                        {filteredInvoices.length === 0 ? (
                            <Alert color="info">No invoices found.</Alert>
                        ) : (
                            <Card>
                                <CardBody>
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
                                                    {authuser.role === "firm_admin" && <th>Proforma Status</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentInvoices.map((invoice) => (
                                                    <tr key={invoice._id} onClick={() => fetchInvoice(invoice._id)} style={{ cursor: "pointer" }}>
                                                        <td>{invoice.invoiceNumber}</td>
                                                        <td>{invoice.customerName}</td>
                                                        <td>{invoice.totalAmount} ₹</td>
                                                        <td style={{ color: invoice.amountDue > 0 ? "red" : "green" }}>
                                                            {invoice.amountDue > 0 ? `${invoice.amountDue} ₹` : "Paid"}
                                                        </td>
                                                        <td style={{ minWidth: "110px" }}>
                                                            <ul style={{ paddingLeft: "0.5rem", listStyle: "none" }}>
                                                                {invoice.items.map((item, itemIndex) =>
                                                                    item.itemId.tax.components.map((tax, taxIndex) => (
                                                                        <li key={`${itemIndex}-${taxIndex}`}>
                                                                            {tax.taxType} - {tax.rate}%
                                                                        </li>
                                                                    ))
                                                                )}
                                                            </ul>
                                                        </td>
                                                        <td>{`${new Date(invoice.invoiceDate).getDate().toString().padStart(2, '0')}-${(new Date(invoice.invoiceDate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(invoice.invoiceDate).getFullYear()}`}</td>
                                                        <td>{invoice.customerAddress.country}</td>
                                                        <td>{invoice.approvalStatus?.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</td>
                                                        <td>
                                                            <i
                                                                className="bx bx-printer"
                                                                style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer", marginLeft: "10px" }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleFetchAndPrint(invoice._id);
                                                                }}
                                                            ></i>
                                                        </td>
                                                        {authuser.role === "firm_admin" && (
                                                            <td>
                                                                {invoice.approvalStatus === "approved" ? (
                                                                    <i className="bx bx-x" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleApproveStatus(invoice, "rejected")}></i>
                                                                ) : (
                                                                    <i className="bx bx-check" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleApproveStatus(invoice, "approved")}></i>
                                                                )}
                                                            </td>
                                                        )}
                                                        {authuser.role === "firm_admin" && (
                                                            <td>
                                                                {invoice.approvalStatus === "pending" ? (
                                                                    <Button style={{ width: "91px" }} onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRejectProforma(invoice._id);
                                                                    }} color="danger">Reject</Button>
                                                                ) : (
                                                                    <Button style={{ width: "91px", cursor: "no-drop", pointerEvents: "auto" }} color="success" disabled>Approved</Button>
                                                                )}
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Pagination aria-label="Page navigation example" style={{ width: "max-content" }}>
                                        <PaginationItem disabled={currentPage === 1}>
                                            <PaginationLink onClick={() => setCurrentPage(currentPage - 1)} style={{ cursor: "pointer" }}>Previous</PaginationLink>
                                        </PaginationItem>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <PaginationItem key={index} active={currentPage === index + 1}>
                                                <PaginationLink onClick={() => setCurrentPage(index + 1)} className='text-white bg-theme'>{index + 1}</PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem disabled={currentPage === totalPages}>
                                            <PaginationLink onClick={() => setCurrentPage(currentPage + 1)} style={{ cursor: "pointer" }}>Next</PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </CardBody>
                            </Card>
                        )}
                    </>
                )}
            </div>
            {selectedInvoice && (
                <div style={{ display: 'none' }}>
                    <div ref={printRef}>
                        <ViewFormat invoiceData={selectedInvoice} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
    
};

export default ViewInvoices;
