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

    const [whole, fraction] = num.toString().split('.').map(Number);

    let words = `${inWords(whole)} rupees`;
    
    if (fraction) {
        words += ` & ${inWords(fraction)} paise`;
    }
    
    return words.toUpperCase();
};

const PrintFormat = forwardRef(({ invoiceData, userRole }, ref) => {
    // console.log(invoiceData, "invoicedata")
    const { country } = invoiceData;
    const taxRate = countries[country]?.gst || 0;
    const isSameState = invoiceData.companyState === invoiceData.customerState;
    const cgstSgstRate = isSameState ? taxRate / 2 : 0;
    const igstRate = !isSameState ? taxRate : 0;

    const totalAmount = invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const taxAmount = (totalAmount * taxRate) / 100;
    const amountDue = totalAmount + taxAmount;

    const netReceived = amountDue;

    return (
        <div ref={ref} className="card p-4 border rounded position-relative">
            <div className="row mb-2 text-center ">
                <h2>Tax Invoice</h2>
            </div>

            <div className="row mt-2">
                <div className="col-md-6 text-left">
                    {invoiceData && (
                        <img 
                            src={invoiceData.companyLogo}  
                            alt="Company Logo" 
                            style={{ height: "100px", maxWidth: "200px" , marginBottom:"10px" , marginTop:"-50px" }} 
                        />
                    )}
                    <p className="my-1">{invoiceData?.officeAddress + ", " + invoiceData?.companyNearby + ", " + invoiceData?.companyDistrict}</p>
                    <p className="my-1">{invoiceData?.companyState + ", " + invoiceData?.companyCity + ", " + invoiceData?.companyCountry + ", " + invoiceData?.companyZip}</p>
                    <p className="my-1">{invoiceData?.companyPhone}</p>
                    <p className="my-1">{invoiceData?.companyEmail}</p>
                    <p className="my-1"><b>GSTIN:</b> {invoiceData?.gstin}</p>
                </div>
                <div className="col-md-3 offset-md-3  right-t-col3" >
                    <p><strong>Invoice Number:</strong> {Math.floor(Math.random() * 1000000)}</p>
                    <p><strong>Amount Due:</strong> ₹ {amountDue.toFixed(2)}</p>
                    <p><strong>Issue Date:</strong> {invoiceData.issueDate}</p>
                    <p><strong>Due Date:</strong> {invoiceData.dueDate}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 text-left">
                    <h4>Customer Details:</h4>
                    <p className="my-1">{invoiceData.customerName}</p>
                    <p className="my-1">{invoiceData?.customerHouse + ", " + invoiceData?.customerNearby+ ", " + invoiceData?.customerDistrict}</p>
                    <p className="my-1">{invoiceData?.customerState + ", " + invoiceData?.customerCity+ ", " + invoiceData?.customerCountry+ ", "+ invoiceData?.customerZip}</p>
                    <p className="my-1">{invoiceData.customerPhone}</p>
                    <p className="my-1">{country}</p>
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
                    {invoiceData.items.map((item, index) => {
                        const itemTotalValue = item.quantity * item.price;
                        const itemCgstAmount = (itemTotalValue * cgstSgstRate) / 100;
                        const itemSgstAmount = (itemTotalValue * cgstSgstRate) / 100;
                        const itemIgstAmount = (itemTotalValue * igstRate) / 100;
                        const itemTotalAmount = isSameState 
                            ? itemTotalValue + itemCgstAmount + itemSgstAmount
                            : itemTotalValue + itemIgstAmount;

                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.description}</td>
                                <td>{item.hsn}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.totalAmount}</td>
                                {isSameState ? (
                                    <>
                                        <td>{itemCgstAmount.toFixed(2)}</td>
                                        <td>{itemSgstAmount.toFixed(2)}</td>
                                    </>
                                ) : (
                                    <td>{itemIgstAmount.toFixed(2)}</td>
                                )}
                                <td>{itemTotalAmount.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="row">
                <div className="col-md-6 text-left">
                    <h5>Bank Details</h5>
                    <p className="my-1"><strong>Bank Name:</strong> {invoiceData?.bankName || 'Your Bank Name'}</p>
                    <p className="my-1"><strong>Account Number:</strong> {invoiceData?.accountNumber || 'XXXXXXXXXXXX'}</p>
                    <p className="my-1"><strong>IFSC Code:</strong> {invoiceData?.IFSCCode || ''}</p>
                    <p className="my-1"><strong>Branch:</strong> {invoiceData?.branchName || 'Your Branch'}</p>
                </div>
                <div className="col-md-6 .right-t-col3">
                    <p className="my-1"><strong>Subtotal:</strong> ₹ {totalAmount.toFixed(2)}</p>
                    {isSameState ? (
                        <>
                            <p><strong>CGST ({cgstSgstRate}%):</strong> ₹ {(totalAmount * cgstSgstRate / 100).toFixed(2)}</p>
                            <p><strong>SGST ({cgstSgstRate}%):</strong> ₹ {(totalAmount * cgstSgstRate / 100).toFixed(2)}</p>
                        </>
                    ) : (
                        <p><strong>IGST ({igstRate}%):</strong> ₹ {(totalAmount * igstRate / 100).toFixed(2)}</p>
                    )}
                    <p className="my-1"><strong>Total:</strong> ₹ {amountDue.toFixed(2)}</p>
                    <p className="my-1"><strong>Total Value in Words:</strong> ₹ {convertNumberToWords(amountDue.toFixed(2))} ONLY</p>
                    <p className="my-1"><strong>Net Received:</strong> ₹ {netReceived.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
});

export default PrintFormat;
