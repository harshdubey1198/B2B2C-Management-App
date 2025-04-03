import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Table, } from "reactstrap";

const PaymentHistoryModal = ({ isOpen, toggle, paymentHistory }) => {
    const currencySymbols = {
        usd: "$",
        eur: "€",
        inr: "₹",
        gbp: "£",
        jpy: "¥",
        aud: "A$",
        cad: "C$",
        chf: "CHF",
        cny: "¥",
        aed: "د.إ",
        sar: "﷼",
      };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Payment History</ModalHeader>
      <ModalBody>
            {paymentHistory.length > 0 ? (
                <Table striped responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Plan Title</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>Expiry Date</th>
                    <th className="text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistory.map((payment, index) => {
                    const isExpired = new Date(payment.expirationDate) < new Date() || payment.status === "expired";
                    const isActive = new Date(payment.expirationDate) > new Date();
                    
                    return (
                        <tr
                        key={payment._id}
                        style={{
                            backgroundColor: isExpired ? "transparent" : "rgba(0, 255, 0, 0.2)", 
                            fontWeight: isExpired ? "bold" : "normal",
                            position: "relative",
                        }}
                        >
                        <td>{index + 1}</td>
                        <td>{payment.planId?.title}</td>
                        <td>{currencySymbols[payment.currency] || payment.currency}{payment.amount}</td>
                        <td>{new Date(payment.paymentDate).toLocaleDateString("en-GB")}</td>
                        <td>{new Date(payment.expirationDate).toLocaleDateString("en-GB")}</td>
                        {isExpired && (
                            <td style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>*</td>
                        )}
                        {isActive && (
                            <td style={{ color: "green", fontSize: "20px", fontWeight: "bold", textAlign:"center" }}>*</td>
                        )}
                        </tr>
                    );
                    })}
                </tbody>
                </Table>
            ) : (
                <p className="text-center">No payment history found.</p>
            )}
            </ModalBody>
        </Modal>
  );
};

export default PaymentHistoryModal;
