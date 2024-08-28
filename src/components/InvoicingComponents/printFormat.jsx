import React from 'react';

const countries = {
    India: { currency: 'INR', gst: 18 },
    Malaysia: { currency: 'MYR', gst: 6 },
    Dubai: { currency: 'AED', gst: 5 },
    Indonesia: { currency: 'IDR', gst: 10 }
};

const PrintFormat = React.forwardRef(({ invoiceData, userRole }, ref) => {
    const { country } = invoiceData;
    const taxRate = countries[country]?.gst || 0;
    const totalAmount = invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const taxAmount = (totalAmount * taxRate) / 100;

    return (
        <div ref={ref} className="card p-4 border rounded">
            <div className="text-center mb-4">
                {invoiceData && <img src={invoiceData.companyLogo} alt="Company Logo" style={{ maxWidth: '150px' }} />}
                <h3>{invoiceData?.companyName}</h3>
                <p>{invoiceData?.companyAddress}</p>
                <p>{invoiceData?.companyPhone}</p>
                <p>{invoiceData?.companyEmail}</p>
                <p><b>GSTIN:</b> {invoiceData?.gstin}</p>
            </div>
            <h2>Invoice</h2>
            <p><strong>Invoice Number:</strong> {Math.floor(Math.random() * 1000000)}</p>
            <p><strong>Customer Name:</strong> {invoiceData.customerName}</p>
            <p><strong>Customer Address:</strong> {invoiceData.customerAddress}</p>
            <p><strong>Customer Phone:</strong> {invoiceData.customerPhone}</p>
            <p><strong>Date:</strong> {invoiceData.date}</p>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>Currency:</strong> {countries[country]?.currency || 'Unknown'}</p>
            <p><strong>Prepared by:</strong> {userRole}</p>
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
                    {invoiceData.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p><strong>Subtotal:</strong> {totalAmount.toFixed(2)}</p>
            <p><strong>Tax ({taxRate}%):</strong> {taxAmount.toFixed(2)}</p>
            <p><strong>Total:</strong> {(totalAmount + taxAmount).toFixed(2)}</p>
            {/* <p><strong>Payment Link:</strong> <a href={paymentLink} target="_blank" rel="noopener noreferrer">Pay Now</a></p> */}
        </div>
    );
});

export default PrintFormat;