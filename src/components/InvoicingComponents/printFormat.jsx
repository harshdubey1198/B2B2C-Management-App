import React, {forwardRef} from 'react';

const countries = {
    India: { currency: 'INR', gst: 18 },
    Malaysia: { currency: 'MYR', gst: 6 },
    Dubai: { currency: 'AED', gst: 5 },
    Indonesia: { currency: 'IDR', gst: 10 }
};

const convertNumberToWords = (num) => {
    const a = ['','one','two','three','four','five','six','seven','eight','nine','ten',
        'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    const b = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

    const inWords = (n) => {
        if (n === 0) return 'zero';
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? '-' + a[n % 10] : '');
        if (n < 1000) return a[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + inWords(n % 100) : '');
        return 'Number too large';
    };

    return inWords(num);
};

const PrintFormat = forwardRef(({ invoiceData, userRole }, ref) => {
    const { country } = invoiceData;
    const taxRate = countries[country]?.gst || 0;
    const totalAmount = invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const taxAmount = (totalAmount * taxRate) / 100;
    const amountDue = totalAmount + taxAmount;

    const netReceived = amountDue;
    const isSameState = invoiceData?.companyState?.toLowerCase() === invoiceData?.customerState?.toLowerCase();
    const cgstSgstRate = isSameState ? taxRate / 2 : 0;
    const igstRate = !isSameState ? taxRate : 0;
    const cgstAmount = (totalAmount * cgstSgstRate) / 100;
    const sgstAmount = (totalAmount * cgstSgstRate) / 100;
    const igstAmount = (totalAmount * igstRate) / 100;

    return (
        <div ref={ref} className="card p-4 border rounded">
            <div className="row mb-4">
                <div className="col-md-6">
                    <h2>Tax Invoice</h2>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 text-right">
                    {invoiceData && <img src={invoiceData.companyLogo} alt="Company Logo" style={{ maxWidth: '100px' }} />}
                    <p>{invoiceData?.officeAddress + " "  +invoiceData?.companyNearby + " " + invoiceData?.companyDistrict}</p>
                    <p>{invoiceData?.companyState + " "  +invoiceData?.companyCity + " " + invoiceData?.companyCountry + " " + invoiceData?.companyZip}</p>
                    <p>{invoiceData?.companyPhone}</p>
                    <p>{invoiceData?.companyEmail}</p>
                    <p><b>GSTIN:</b> {invoiceData?.gstin}</p>
                </div>
                <div className="col-md-6">
                    <p><strong>Invoice Number:</strong> {Math.floor(Math.random() * 1000000)}</p>
                    <p><strong>Amount Due:</strong> ₹{amountDue.toFixed(2)}</p>
                    <p><strong>Issue Date:</strong> </p>
                    <p><strong>Due Date:</strong> </p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 text-right">
                    <h4>Customer Details:</h4>
                    <p> {invoiceData.customerName}</p>
                    <p>{invoiceData?.customerHouse + " " + invoiceData?.customerNearby+ " " + invoiceData?.customerDistrict}</p>
                    <p>{invoiceData?.customerState + " " + invoiceData?.customerCity+ " " + invoiceData?.customerCountry+ " "+ invoiceData?.customerZip}</p>
                    <p>{invoiceData.customerPhone}</p>
                    <p>{country}</p>
                    {/* <p><strong>Prepared by:</strong> {userRole}</p> */}
                </div>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sr. no</th>
                        <th>Description</th>
                        <th>HSN/SAC</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Value</th>
                        {isSameState ? (
                            <>
                                <th>CGST ({cgstSgstRate}%)</th>
                                <th>SGST ({cgstSgstRate}%)</th>
                            </>
                        ) : (
                            <th>IGST ({igstRate}%)</th>
                        )}
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceData.items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.description}</td>
                            <td>{item.Hsn}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{(item.quantity * item.price).toFixed(2)}</td>
                            {isSameState ? (
                                <>
                                    <td>{cgstAmount.toFixed(2)}</td>
                                    <td>{sgstAmount.toFixed(2)}</td>
                                </>
                            ) : (
                                <td>{igstAmount.toFixed(2)}</td>
                            )}
                            <td>{(item.quantity * item.price + (isSameState ? cgstAmount + sgstAmount : igstAmount)).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="row">
                <div className="col-md-6 text-left">
                    <h5>Bank Details</h5>
                    <p><strong>Bank Name:</strong> {invoiceData?.bankName || 'Your Bank Name'}</p>
                    <p><strong>Account Number:</strong> {invoiceData?.accountNumber || 'XXXXXXXXXXXX'}</p>
                    <p><strong>IFSC Code:</strong> {invoiceData?.IFSCCode || ''}</p>
                    <p><strong>Branch:</strong> {invoiceData?.branchName || 'Your Branch'}</p>
                </div>
                <div className="col-md-6 text-right">
                    <p><strong>Subtotal:</strong> {totalAmount.toFixed(2)}</p>
                    {isSameState ? (
                        <>
                            <p><strong>CGST ({cgstSgstRate}%):</strong> {cgstAmount.toFixed(2)}</p>
                            <p><strong>SGST ({cgstSgstRate}%):</strong> {sgstAmount.toFixed(2)}</p>
                        </>
                    ) : (
                        <p><strong>IGST ({igstRate}%):</strong> {igstAmount.toFixed(2)}</p>
                    )}
                    <p><strong>Total:</strong> ₹{amountDue.toFixed(2)}</p>
                    <p><strong>Total Value in Words:</strong> ₹{convertNumberToWords(amountDue.toFixed(2))} only</p>
                    <p><strong>Net Received:</strong> ₹{netReceived.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
});

export default PrintFormat;
