import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Alert } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';

const mockInvoices = [
    {
        id: 1,
        customerName: 'John Doe',
        date: '2024-07-30',
        country: 'India',
        items: [
            { description: 'Item A', quantity: 2, price: 10.00 },
            { description: 'Item B', quantity: 1, price: 20.00 }
        ],
        subtotal: 40.00,
        tax: 7.20,
        total: 47.20
    },
    {
        id: 2,
        customerName: 'Jane Smith',
        date: '2024-07-29',
        country: 'Malaysia',
        items: [
            { description: 'Item C', quantity: 3, price: 30.00 }
        ],
        subtotal: 90.00,
        tax: 5.40,
        total: 95.40
    }
];

const ViewInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const printRef = useRef();

    useEffect(() => {
        // Fetch invoices data from an API or use mock data
        setInvoices(mockInvoices);
    }, []);

    const PrintInvoice = React.forwardRef(({ invoice }, ref) => {
        if (!invoice) return null; // Handle case when invoice is undefined

        return (
            <div ref={ref} className="invoice p-4  border rounded mb-4">
                <h2>Invoice</h2>
                <p><strong>Customer Name:</strong> {invoice.customerName}</p>
                <p><strong>Date:</strong> {invoice.date}</p>
                <p><strong>Country:</strong> {invoice.country}</p>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toFixed(2)}</td>
                                <td>{(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p><strong>Subtotal:</strong> {invoice.subtotal.toFixed(2)}</p>
                <p><strong>Tax:</strong> {invoice.tax.toFixed(2)}</p>
                <p><strong>Total:</strong> {invoice.total.toFixed(2)}</p>
            </div>
        );
    });

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
                            {invoices.map(invoice => (
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
                <PrintInvoice ref={printRef} invoice={selectedInvoice} />
            </div>
        </React.Fragment>
    );
};

export default ViewInvoices;
