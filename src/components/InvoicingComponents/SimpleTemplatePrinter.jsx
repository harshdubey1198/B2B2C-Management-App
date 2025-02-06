import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import { Button } from "reactstrap";

const InvoicePrintDownload = () => {
  const invoiceRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.html(invoiceRef.current, {
      callback: function (doc) {
        doc.save("invoice.pdf");
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <React.Fragment>
        <div className="page-content">
          <div ref={invoiceRef} className="card p-4 border rounded position-relative">
                <div className="row text-center card-title-heading m-0 mb-4">
                <h2 className="text-white">Tax Invoice</h2>
                </div>

                <div className="row m-text-center p-4 m-0">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <img
                    src="/static/logo.png"
                    alt="Company Logo"
                    style={{ height: "100px", maxWidth: "200px", marginBottom: "10px", marginTop: "-36px" }}
                    />
                    <p className="my-1" style={{ fontWeight: "700", fontSize: "24px" }}>Company Name</p>
                    <p className="my-1">Email : example@company.com</p>
                    <p className="my-1">Phone : 1234567890</p>
                    <p className="my-1">123, Main Street, City, State, Country, 123456</p>
                    <p className="my-1">
                    <b>GSTIN:</b> XYZ123456789
                    </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center text-end">
                    <p>
                    <strong>Invoice Number:</strong> INV-0001
                    </p>
                    <p>
                    <strong>Amount Due:</strong> ₹ 1000
                    </p>
                    <p>
                    <strong>Issue Date:</strong> 05-02-2025
                    </p>
                    <p>
                    <strong>Due Date:</strong> 05-02-2025
                    </p>
                </div>
                </div>

                <div className="row p-4 m-0 border-bottom">
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center">
                    <h4>Customer Details:</h4>
                    <p className="my-1">John Doe</p>
                    <p className="my-1">456, Another Street, City, State, Country, 654321</p>
                    <p className="my-1">Phone : 9876543210 | Email : john.doe@example.com</p>
                </div>
                </div>

                <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                    <tr>
                        <th>Sr. no</th>
                        <th>Item Name</th>
                        <th>Variant</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Tax</th>
                        <th>Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Item 1</td>
                        <td>Red</td>
                        <td>Description of Item 1</td>
                        <td>10</td>
                        <td>₹15</td>
                        <td>₹150</td>
                        <td>5%</td>
                        <td>₹157.50</td>
                    </tr>
                    </tbody>
                </table>
                </div>

                <div className="row bg-light p-4 m-0">
                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center mb-4">
                    <h5>Bank Details</h5>
                    <p className="my-1"><strong>Bank Name:</strong> XYZ Bank</p>
                    <p className="my-1"><strong>Account Number:</strong> 123456789</p>
                    <p className="my-1"><strong>IFSC Code:</strong> XYZB1234567</p>
                    <p className="my-1"><strong>Branch:</strong> XYZ Branch</p>
                    <p className="my-1"><strong>Sub-Type:</strong> Business</p>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 m-text-center text-end">
                    <h5>Payment Summary</h5>
                    <p className="my-1"><strong>Subtotal (Amount before Tax):</strong> ₹150</p>
                    <p className="my-1"><strong>Total Tax Amount:</strong> ₹7.50</p>
                    <p className="my-1"><strong>Grand Total (After Tax):</strong> ₹157.50</p>
                    <p className="my-1"><strong>Amount Paid:</strong> ₹0.00</p>
                    <p className="my-1"><strong>Total:</strong> ₹157.50</p>
                    <p className="my-1 value-in-words"><strong>Total in Words:</strong> One Hundred Fifty-Seven Rupees and Fifty Paise Only</p>
                </div>
                </div>
            </div>

            <div className="mt-4">
                <Button className="btn-primary me-2" onClick={handlePrint}>Print</Button>
                <Button className="btn-primary" onClick={handleDownloadPDF}>Download PDF</Button>
            </div>
            </div>
    </React.Fragment>
  );
};

export default InvoicePrintDownload;
