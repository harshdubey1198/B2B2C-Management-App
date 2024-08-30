import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import PrintFormat from '../../components/InvoicingComponents/printFormat';

const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const printRef = useRef();

    useEffect(() => {
        try {
            // Fetch invoices data from local storage
            const storedData = localStorage.getItem("Invoice Form");
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                console.log("Fetched invoices data from localStorage:", parsedData); // Debugging line
                setInvoices(parsedData);
            } else {
                console.log("No data found in localStorage for 'Invoice Form'"); // Debugging line
                setInvoices([]);
            }
        } catch (error) {
            console.error("Error parsing local storage data:", error);
            setInvoices([]);
        }
    }, []);

    const printInvoice = useReactToPrint({
        content: () => printRef.current
    });

    // const handlePrint = (invoice) => {
    //     setSelectedInvoice(invoice);
    //     printInvoice();
    // };

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
                                    <td>{invoice.id}</td>
                                    <td>{invoice.customerName}</td>
                                    <td>{invoice.date}</td>
                                    <td>{invoice.country}</td>
                                    <td>
                                        <Button
                                            color="info"
                                            onClick={() => {
                                                setSelectedInvoice(invoice);
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
                    <PrintFormat ref={printRef} invoiceData={selectedInvoice} />
                )}
            </div>
        </React.Fragment>
    );
};

export default ViewInvoices;
