import React, { forwardRef } from 'react';
import '../../assets/scss/bootstrap.scss';
const countries = {
    India: { currency: 'INR', gst: 0 },
    Malaysia: { currency: 'MYR', gst: 6 },
    Dubai: { currency: 'AED', gst: 5 },
    Indonesia: { currency: 'IDR', gst: 10 }
};

const convertNumberToWords = (num) => {
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const g = ['Hundred', 'Thousand', 'Million', 'Billion', 'Trillion'];

    const convert = (n) => {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
        if (n < 1000) return a[Math.floor(n / 100)] + ' ' + g[0] + (n % 100 !== 0 ? ' and ' + convert(n % 100) : '');
        
        for (let i = 0; i < g.length; i++) {
            const divisor = Math.pow(1000, i + 1);
            if (n < divisor) {
                return convert(Math.floor(n / Math.pow(1000, i))) + ' ' + g[i] + (n % Math.pow(1000, i) !== 0 ? ' ' + convert(n % Math.pow(1000, i)) : '');
            }
        }
    };

    const [whole, decimal] = num.toString().split('.').map(Number);
    let words = convert(whole);
    
    if (decimal) {
        words += ` Rupees and ${convert(decimal)} Paise`;
    }

    return words.trim();
};

const sliceDescription = (description) => {
    if (description && description.length > 50) {
        return description.slice(0, 50) + '...';
    }
    return description || ''; 
};

const PrintFormat = forwardRef(({ invoiceData, companyData }, ref) => {
    const selectInvoice = invoiceData?.firmId || {};  
    const items = invoiceData?.items || []; 
    const companyAddress = companyData.address || [];
    const country = companyAddress.length ? companyAddress[0].country : 'India'; 
    const customerState = invoiceData?.customerState || '';
    
    const taxRate = countries[country]?.gst || 0;
    const companyState = companyAddress.length ? companyAddress[0]?.state?.toLowerCase() : '';
    const isSameState = companyState === customerState?.toLowerCase();
    
    const totalAmount = invoiceData?.items?.reduce((acc, item) => acc + (item.quantity * item.price), 0) || 0;
    const taxAmount = (totalAmount * taxRate) / 100;
    const amountDue = totalAmount + taxAmount;
    const netReceived = amountDue;
    const customerName = invoiceData?.firstName && invoiceData?.lastName
        ? `${invoiceData.firstName} ${invoiceData.lastName}`
        : invoiceData?.customerName || 'Please select a customer';

    return (
        <div ref={ref} className="card p-0 border rounded position-relative">
            <div className="row text-center card-title-heading m-0 mb-4">
                <h2 className="text-white">{invoiceData?.invoiceType}</h2>
            </div>

            <div className="row m-text-center p-4 m-0">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    {(invoiceData?.companyLogo || selectInvoice.avatar) && (
                        <img 
                            src={selectInvoice.avatar || invoiceData?.companyLogo}  
                            alt="Company Logo" 
                            style={{ height: "100px", maxWidth: "200px", marginBottom: "10px", marginTop: "-36px" }} 
                        />
                    )}
                    {companyAddress.map((address, index) => (
                        <div key={index}>
                            <p className="my-1">{address.h_no}, {address.nearby}, {address.district}</p>
                            <p className="my-1">{address.city}, {address.state}, {address.country}, {address.zip_code}</p>
                        </div>
                    ))}
                    <p className="my-1">{invoiceData?.companyEmail}</p>
                    <p className="my-1"><b>GSTIN:</b> {invoiceData?.gstin || selectInvoice.gstin}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center text-end">
                    <p><strong>Invoice Number:</strong> INV-24-MAG</p>
                    <p><strong>Amount Due:</strong> ₹ {amountDue.toFixed(2)}</p>
                    <p><strong>Issue Date:</strong> {invoiceData?.issueDate || selectInvoice.issueDate}</p>
                    <p><strong>Due Date:</strong> {invoiceData?.dueDate || selectInvoice.dueDate}</p>
                </div>
            </div>

            <div className="row p-4 m-0 border-bottom">
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center">
                    <h4>Customer Details:</h4>
                    <p className="my-1">{customerName}</p>
                    <p className="my-1">{invoiceData?.customerAddress.h_no}, {invoiceData?.customerAddress.nearby}, {invoiceData?.customerAddress.district}</p>
                    <p className="my-1">{invoiceData?.customerAddress.city}, {invoiceData?.customerAddress.state}, {invoiceData?.customerAddress.country}, {invoiceData?.customerAddress.zip_code}</p>
                    <p className="my-1">Phone : {invoiceData?.customerPhone} | Email : {invoiceData?.customerEmail}</p>
                </div>
            </div>
            <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className='table-light text-center'>
                            <tr>
                            <th>Sr. no</th>
                            <th>Item Name</th>
                            <th>Variant</th>
                            <th>Description</th>
                            <th>HSN/SAC</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Value</th>
                            {isSameState ? (
                                <>
                                <th>CGST ({taxRate / 2}%)</th>
                                <th>SGST ({taxRate / 2}%)</th>
                                </>
                            ) : (
                                <th>IGST ({taxRate}%)</th>
                            )}
                            <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData?.items?.map((item, index) => {
                            const itemTotalValue = item.quantity * item.price;
                            const itemCgstAmount = isSameState ? (itemTotalValue * (taxRate / 2)) / 100 : 0;
                            const itemSgstAmount = isSameState ? (itemTotalValue * (taxRate / 2)) / 100 : 0;
                            const itemIgstAmount = !isSameState ? (itemTotalValue * taxRate) / 100 : 0;
                            const itemTotalAmount = isSameState
                                ? itemTotalValue + itemCgstAmount + itemSgstAmount
                                : itemTotalValue + itemIgstAmount;

                            return (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.name || 'N/A'}</td> 
                                <td>{item?.selectedVariant?.[0]?.optionLabel || 'N/A'}</td> 
                                <td>{sliceDescription(item.description)}</td>
                                <td>{item.hsn}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{itemTotalValue.toFixed(2)}</td>
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
                </div>

            <div className="row bg-light p-4 m-0">
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center mb-4">
                    <h5>Bank Details</h5>
                    <p className="my-1"><strong>Bank Name:</strong> {invoiceData?.bankName || selectInvoice.bankName || 'Your Bank Name'}</p>
                    <p className="my-1"><strong>Account Number:</strong> {invoiceData?.accountNumber ||selectInvoice.accountNumber || 'Your Account Number'}</p>
                    <p className="my-1"><strong>IFSC Code:</strong> {invoiceData?.ifscCode || selectInvoice.ifscCode || 'Your IFSC Code'}</p>
                    <p className="my-1"><strong>Branch:</strong> {invoiceData?.branchName || selectInvoice.branchName || 'Your Branch'}</p>
                    <p className='my-1'><strong>Sub-Type:</strong> {invoiceData?.invoiceSubType ||selectInvoice.invoiceSubType}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center text-end">
                    <h5>Payment Summary</h5>
                    <p><strong>Net Amount:</strong> ₹ {totalAmount.toFixed(2)}</p>
                    {isSameState ? (
                        <>
                            <p><strong>CGST ({taxRate / 2}%):</strong> ₹ {taxAmount / 2}</p>
                            <p><strong>SGST ({taxRate / 2}%):</strong> ₹ {taxAmount / 2}</p>
                        </>
                    ) : (
                        <p><strong>IGST ({taxRate}%):</strong> ₹ {taxAmount}</p>
                    )}
                    <p className="my-1"><strong>Total:</strong> ₹ {amountDue.toFixed(2)}</p>
                    <p className="my-1 value-in-words"><strong>Value in Words:</strong> ₹ {convertNumberToWords(Number(amountDue.toFixed(2)))} ONLY</p>
                    <p className="my-1"><strong>Net Received:</strong> ₹ {netReceived.toFixed(2)}</p>
                    <p className="my-1"><strong>Amount Due:</strong> ₹ {amountDue.toFixed(2)}</p>
                </div>
            </div>

           
           
        </div>
    );
});

export default PrintFormat;
