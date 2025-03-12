import React, { forwardRef } from 'react';
import '../../assets/scss/bootstrap.scss';
const currencyOptions = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
    { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
    { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
    { code: "USD", symbol: "$", name: "US Dollar" },
  ];
  
  const getCurrencyDetails = (currencyCode) => {
    const currency = currencyOptions.find((option) => option.code === currencyCode);
    return currency ? currency.symbol : currencyCode;
  };
  
const sliceDescription = (description) => {
    if (description && description.length > 50) {
        return description.slice(0, 50) + '...';
    }
    return description || ''; 
};

const PrintFormat = forwardRef(({ invoiceData, companyData }, ref) => {
    const selectInvoice = invoiceData?.firmId || {};  
    console.log(companyData);
    const currency = getCurrencyDetails(companyData.currency || "INR");  
    
    const items = invoiceData?.items || []; 
    const companyAddress = companyData?.address || [];

    const subtotal = items.reduce((acc, item) => {
        const itemPrice = item.varSelPrice || item.price; 
        return acc + (item.quantity * itemPrice); 
    }, 0);

    const totalTaxAmount = items.reduce((acc, item) => {
        const itemPrice = item.varSelPrice || item.price; 
        const itemTotalValue = item.quantity * itemPrice;
        const taxRate = (item.taxComponents || []).reduce((sum, tax) => sum + tax.rate, 0);
        return acc + (itemTotalValue * (taxRate / 100)); 
    }, 0);

    const grandTotal = subtotal + totalTaxAmount; 
    const amountPaid = Number(invoiceData?.amountPaid) || 0;    
    //  const totalInWords = convertNumberToWords(grandTotal); 

    const customerName = invoiceData?.firstName && invoiceData?.lastName
        ? `${invoiceData.firstName} ${invoiceData.lastName}`
        : invoiceData?.customerName || 'Please select a customer';

    return (
        <div ref={ref} className="card p-0 border rounded position-relative">
            <div className="row text-center card-title-heading m-0 mb-4">
                <h2 className="text-white">{invoiceData?.invoiceType}</h2>
            </div>

            <div className="row m-text-center p-4 pb-0 m-0">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    {(invoiceData?.companyLogo || selectInvoice.avatar) && (
                        <img 
                            src={selectInvoice.avatar || invoiceData?.companyLogo}  
                            alt="Company Logo" 
                            style={{ height: "100px", maxWidth: "200px", marginBottom: "10px", marginTop: "-36px" }} 
                        />
                    )}
                    {companyAddress?.map((address, index) => (
                        <div key={index}>
                            <p className="my-1">{address?.h_no}, {address?.nearby}, {address?.district}</p>
                            <p className="my-1">{address?.city}, {address?.state}, {address?.country}, {address?.zip_code}</p>
                        </div>
                    ))}
                    <p className="my-1">{invoiceData?.companyEmail}</p>
                    <p className="my-1"><b>GSTIN:</b> {invoiceData?.gstin || selectInvoice.gstin}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center text-end">
                    <p><strong>Invoice Number:</strong> INV-24-MAG</p>
                    <p><strong>Issue Date:</strong> {invoiceData?.issueDate || selectInvoice.issueDate}</p>
                    <p><strong>Due Date:</strong> {invoiceData?.dueDate || selectInvoice.dueDate}</p>
                    <p><strong>Amount Due:</strong> {currency} {(grandTotal - amountPaid).toFixed(2)}</p>
                </div>
            </div>

            <div className="row pb-1 m-4 border-bottom">
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center">
                    <h4>Customer Details:</h4>
                    <p className="my-1">{customerName}</p>
                    <p className="my-1">{invoiceData?.customerAddress.h_no}, {invoiceData?.customerAddress.nearby}, {invoiceData?.customerAddress.district}</p>
                    <p className="my-1">{invoiceData?.customerAddress.city}, {invoiceData?.customerAddress.state}, {invoiceData?.customerAddress.country}, {invoiceData?.customerAddress.zip_code}</p>
                    <p className="my-1">Phone : {invoiceData?.customerPhone} | Email : {invoiceData?.customerEmail}</p>
                </div>
            </div>

            <div className="table-responsive mx-4 mt-2">
                <table className="table table-bordered">
                    <thead className='table-light'>
                        <tr>
                            <th>Sr. no</th>
                            <th>Item Name</th>
                            <th>Variant</th>
                            <th>Description</th>
                            <th>Taxes</th>
                            <th>HSN/SAC</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            const itemPrice = item.varSelPrice || item.price; 
                            const itemTotalValue = item.quantity * itemPrice;
                            const taxRate = (item.taxComponents || []).reduce((sum, tax) => sum + tax.rate, 0);
                            const itemTaxAmount = itemTotalValue * (taxRate / 100);
                            const totalWithTax = itemTotalValue + itemTaxAmount;

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.name || 'N/A'}</td> 
                                    <td>{item?.selectedVariant?.[0]?.optionLabel || '-'}</td> 
                                    <td>{sliceDescription(item?.description)}</td>
                                    <td>
                                        {item?.taxComponents && item?.taxComponents.length > 0 ? (
                                            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                                {item?.taxComponents.map((tax, taxIndex) => (
                                                    <li key={taxIndex}>
                                                        <span>{tax?.taxType + " : " || 'N/A'}</span>  
                                                        <span>{tax?.rate || 'N/A'}%</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : 'N/A'}
                                    </td>
                                    <td>{item?.ProductHsn}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{itemPrice?.toFixed(2)}</td>
                                    <td>{totalWithTax?.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="row bg-light m-4">
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center ">
                    <h5>Bank Details</h5>
                    <p className="my-1"><strong>Bank Name:</strong> {invoiceData?.bankName || selectInvoice?.bankName || 'Your Bank Name'}</p>
                    <p className="my-1"><strong>Account Number:</strong> {invoiceData?.accountNumber ||selectInvoice?.accountNumber || 'Your Account Number'}</p>
                    <p className="my-1"><strong>IFSC Code:</strong> {invoiceData?.ifscCode || selectInvoice?.ifscCode || 'Your IFSC Code'}</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center text-end">
                    <h4>Summary:</h4>
                    <p className="my-1"><strong>Subtotal:</strong> {currency} {subtotal?.toFixed(2)}</p>
                    <p className="my-1"><strong>Tax:</strong> {currency} {totalTaxAmount?.toFixed(2)}</p>
                    <p className="my-1"><strong>Grand Total:</strong> {currency} {grandTotal?.toFixed(2)}</p>
                    <p className="my-1"><strong>Amount Paid:</strong> {currency} {amountPaid?.toFixed(2)}</p>
                    <p className="my-1"><strong>Balance:</strong> {currency} {(grandTotal - amountPaid).toFixed(2)}</p>
                    {/* <p className="my-1"><strong>Amount in Words:</strong> {totalInWords}</p> */}
                </div>
            </div>
        </div>
    );
});

export default PrintFormat;
