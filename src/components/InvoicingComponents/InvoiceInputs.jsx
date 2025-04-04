import React, { useEffect, useRef, useState } from "react";
import { FormGroup, Label, Input, Row, Col } from "reactstrap";
import useDebounce from "../../Hooks/UseDebounceHook";
// import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const InvoiceInputs = ({ invoiceData, handleInputChange , companyData, setInvoiceData }) => {
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const firmId = authuser?.response?.adminId;
  const suggestionsRef = useRef(null); 
  const [searchResults, setSearchResults] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  // const debouncedSearchTerm = useDebounce(searchKey, 500);
  const [selectedIndex, setSelectedIndex] = useState(-1);
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
  const currency = getCurrencyDetails(companyData?.currency || "INR");

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex === searchResults.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex <= 0 ? searchResults.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSuggestionClick(searchResults[selectedIndex]);
    }
  };

  const searchCustomer = useDebounce(async (searchKey) => {
    if (searchKey) {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_URL}/customer/search?q=${searchKey}&firmId=${firmId}`);
        setSearchResults(response.data || []); 
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error searching customer:", error);
      }
    }
  }, 500);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [issueDate] = useState(getCurrentDate());

  useEffect(() => {
    if (!invoiceData.issueDate) {
      handleInputChange({ target: { name: "issueDate", value: issueDate } });
    }
  }, [issueDate, invoiceData.issueDate, handleInputChange]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchKey(value);
    searchCustomer(value);
  };

  const handleSuggestionClick = (customer) => {
    handleInputChange({ target: { name: "firstName", value: customer.firstName } });
    handleInputChange({ target: { name: "lastName", value: customer.lastName } });
    handleInputChange({ target: { name: "customerEmail", value: customer.email } });
    handleInputChange({ target: { name: "customerPhone", value: customer.mobile } });
    handleInputChange({
      target: {
        name: "customerAddress",
        value: {
          h_no: customer.address.h_no,
          nearby: customer.address.nearby,
          city: customer.address.city,
          state: customer.address.state,
          country: customer.address.country,
          zip_code: customer.address.zip_code,
          district: customer.address.district,
        },
      },
    });
    setShowSuggestions(false); 
  };

  const highlightSearchTerm = (text) => {
    const parts = text.split(new RegExp(`(${searchKey})`, "gi"));
    return parts.map((part, index) => (
      <span
        key={index}
        style={part.toLowerCase() === searchKey.toLowerCase() ? { backgroundColor: "yellow" } : {}}
      >
        {part}
      </span>
    ));
  };
  // const handleAmountPaidChange = (event) => {
  //   const amountPaid = parseFloat(event.target.value) || 0;
  //   const totalInclusiveTaxes = invoiceData.items.reduce((acc, item) => acc + (item.total || 0), 0);
  
  //   if (amountPaid > totalInclusiveTaxes) {
  //     alert(`Amount Paid cannot exceed the total invoice amount inclusive of taxes (₹ ${totalInclusiveTaxes.toFixed(2)}).`);
  //     return;
  //   }
  
  //   setInvoiceData((prevData) => ({
  //     ...prevData,
  //     amountPaid,
  //   }));
  // };
  const totalInclusiveTaxes = invoiceData.items.reduce((acc, item) => acc + (item.total || 0), 0);

  return (
    <div className="invoice-form">
      <Row className="align-items-center mb-3">
      <Col  lg={6} md={6} sm={12} className="m-text-center mb-2">
          <h3>Invoice Details</h3>
        </Col>
        <Col  lg={6} md={6} sm={12} className="text-right">
        <FormGroup className="mb-0">
            <Input
              type="text"
              placeholder="Search Customer Here..."
              value={searchKey}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="form-control"
              style={{
                border: "2px solid #007bff",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "16px",
              }}
            />
            {showSuggestions && searchResults.length > 0 && (
              <ul
                ref={suggestionsRef}
                className="list-group position-absolute"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  zIndex: 1000,
                  marginTop: "5px",
                }}
              >
                {searchResults
                  .sort((a, b) => {
                    const searchTerm = searchKey.toLowerCase();
                    const aMatch = a.firstName.toLowerCase().includes(searchTerm) || a.lastName.toLowerCase().includes(searchTerm);
                    const bMatch = b.firstName.toLowerCase().includes(searchTerm) || b.lastName.toLowerCase().includes(searchTerm);
                    // Move the matching user to the top
                    return bMatch - aMatch;
                  })
                  .map((customer, index) => (
                    <li
                      key={index}
                      className={`list-group-item d-flex align-items-center ${
                        selectedIndex === index ? "bg-light text-dark" : ""
                      }`}
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                      }}
                      onClick={() => handleSuggestionClick(customer)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div
                        className="d-flex align-items-center gap-3"
                        style={{ width: "100%" }}
                      >
                        <div
                          className="mr-3"
                          style={{
                            fontSize: "24px",
                            color: "#007bff",
                          }}
                        >
                          <i className="fa fa-user-circle"></i>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: "bold" }}>
                            {highlightSearchTerm(
                              customer.firstName + " " + customer.lastName
                            )}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "12px",
                              color: "#666",
                            }}
                          >
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </FormGroup>
        </Col>
      </Row>

      <Row>
  <Col md={3}>
    <FormGroup>
      <Label for="firstName">First Name</Label>
      <Input
        type="text"
        name="firstName"
        placeholder="First Name"
        id="firstName"
        value={invoiceData.firstName}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="lastName">Last Name</Label>
      <Input
        type="text"
        name="lastName"
        placeholder="Last Name"
        id="lastName"
        value={invoiceData.lastName}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="customerEmail">Customer Email</Label>
      <Input
        type="text"
        name="customerEmail"
        id="customerEmail"
        placeholder="Customer Email"
        value={invoiceData.customerEmail}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="customerPhone">Customer Phone</Label>
      <Input
        type="number"
        name="customerPhone"
        id="customerPhone"
        placeholder="Customer Phone"
        value={invoiceData.customerPhone}
        onChange={handleInputChange}
        onWheel={(e) => e.target.blur()}
        required
      />
    </FormGroup>
  </Col>

  <Col md={3}>
    <FormGroup>
      <Label for="customerAddress.h_no">Customer House No.</Label>
      <Input
        type="text"
        name="customerAddress.h_no"
        id="customerAddress.h_no"
        placeholder="House No."
        value={invoiceData.customerAddress.h_no}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="customerAddress.district">District</Label>
      <Input
        type="text"
        name="customerAddress.district"
        id="customerAddress.district"
        placeholder="District"
        value={invoiceData.customerAddress.district}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="customerAddress.city">City</Label>
      <Input
        type="text"
        name="customerAddress.city"
        id="customerAddress.city"
        placeholder="City"
        value={invoiceData.customerAddress.city}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="customerAddress.zip_code">Zip Code</Label>
      <Input
        type="text"
        name="customerAddress.zip_code"
        id="customerAddress.zip_code"
        placeholder="Zip Code"
        value={invoiceData.customerAddress.zip_code}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
  </Col>

  <Col md={3}>
    <FormGroup>
      <Label for="customerAddress.state">State</Label>
      <Input
        type="text"
        name="customerAddress.state"
        id="customerAddress.state"
        placeholder="State"
        value={invoiceData.customerAddress.state}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="customerAddress.country">Country</Label>
      <Input
        type="text"
        name="customerAddress.country"
        id="customerAddress.country"
        placeholder="Country"
        value={invoiceData.customerAddress.country}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="customerAddress.nearby">Nearby Landmark</Label>
      <Input
        type="text"
        name="customerAddress.nearby"
        id="customerAddress.nearby"
        placeholder="Nearby Landmark"
        value={invoiceData.customerAddress.nearby}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="amountPaid">Amount Paid</Label>
      <Input
              type="number"
              name="amountPaid"
              id="amountPaid"
              placeholder="Amount Paid"
              value={invoiceData.amountPaid}
              onChange={(e) => {
                const value = Math.max(0, Math.min(totalInclusiveTaxes, e.target.value)); 
                handleInputChange({ target: { name: "amountPaid", value } });
              }}
              required
              min={0}
              max={totalInclusiveTaxes} 
              onWheel={(e) => e.target.blur()} 
            />
    </FormGroup>
  </Col>

  <Col md={3}>
    <FormGroup>
      <Label for="issueDate">Issue Date</Label>
      <Input
        type="date"
        name="issueDate"
        id="issueDate"
        value={invoiceData.issueDate || issueDate}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="dueDate">Due Date</Label>
      <Input
        type="date"
        name="dueDate"
        id="dueDate"
        value={invoiceData.dueDate}
        onChange={handleInputChange}
        required
      />
    </FormGroup>
    <FormGroup>
      <Label for="invoiceType">Invoice Type</Label>
      <Input
        type="select"
        name="invoiceType"
        id="invoiceType"
        value={invoiceData.invoiceType}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Invoice Type</option>
        <option value="Tax Invoice">Tax Invoice</option>
        <option value="Proforma">Proforma Invoice</option>
        <option value="Bill of Supply">Bill of Supply</option>
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="invoiceSubType">Invoice Sub Type</Label>
      <Input
        type="select"
        name="invoiceSubType"
        id="invoiceSubType"
        value={invoiceData.invoiceSubType}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Invoice Sub Type</option>
        <option value="Original">Original</option>
        <option value="Duplicate">Duplicate</option>
        <option value="Triplicate">Triplicate</option>
        <option value="Quadruplicate">Quadruplicate</option>
      </Input>
    </FormGroup>
  </Col>
</Row>
                <div className="invoice-total">
                  <h4>Final Invoice Amount : {currency} {invoiceData.items.reduce((acc, item) => acc + (item.total || 0), 0).toFixed(2)}</h4>
                </div>
    </div>
  );
};

export default InvoiceInputs;
