import React, { useState } from 'react';

function FirmTypeForm({ firmDetails, setFirmDetails }) {
  console.log(firmDetails, "firmdetails")
  const [firmType, setFirmType] = useState('');
  const [fields, setFields] = useState([]);

  const firmTypes = [
    "Sole Proprietorship",
    "Partnership Firm",
    "Limited Liability Partnership (LLP)",
    "Private Limited Company (Pvt. Ltd.)",
    "Public Limited Company (Ltd.)",
    "One Person Company (OPC)",
    "Hindu Undivided Family (HUF)",
    "Cooperative Society",
    "Section 8 Company (Non-Profit Organization)",
    "Joint Venture (JV)"
  ];

  const fieldOptions = {
    "Sole Proprietorship": ["PAN", "GSTIN", "Udyam Registration", "Shop and Establishment License", "Current Bank Account"],
    "Partnership Firm": ["PAN for Partnership Firm", "Partnership Deed", "GSTIN", "TAN", "Udyam Registration", "Shop and Establishment License"],
    "Limited Liability Partnership (LLP)": ["PAN for LLP", "Certificate of Incorporation", "LLP Agreement", "GSTIN", "TAN", "Digital Signature Certificate", "DIN", "Udyam Registration"],
    "Private Limited Company (Pvt. Ltd.)": ["PAN for Company", "Certificate of Incorporation", "MOA and AOA", "GSTIN", "TAN", "DSC", "DIN", "ESI and PF Registration", "Udyam Registration"],
    "Public Limited Company (Ltd.)": ["PAN for Company", "Certificate of Incorporation", "MOA and AOA", "GSTIN", "TAN", "DSC", "DIN", "ESI and PF Registration", "CIN", "SEBI Registration"],
    "One Person Company (OPC)": ["PAN for Company", "Certificate of Incorporation", "MOA and AOA", "GSTIN", "TAN", "DSC", "DIN", "Udyam Registration"],
    "Hindu Undivided Family (HUF)": ["HUF PAN", "GSTIN", "TAN", "Current Bank Account"],
    "Cooperative Society": ["PAN for Society", "Registration Certificate", "GSTIN", "TAN", "ESI and PF Registration"],
    "Section 8 Company (Non-Profit Organization)": ["PAN for Company", "Certificate of Incorporation", "MOA and AOA", "GSTIN", "TAN", "12A and 80G Registration", "ESI and PF Registration"],
    "Joint Venture (JV)": ["PAN for JV Entity", "JV Agreement", "Certificate of Incorporation", "GSTIN", "TAN", "Other Business-Specific Licenses"]
  };

  const handleFirmTypeChange = (e) => {
    const selectedFirmType = e.target.value;
    setFirmType(selectedFirmType);
    setFields(fieldOptions[selectedFirmType] || []);
  };

  return (
    <div className="container mt-4">
      <h3>Select Firm Type</h3>
      <div className="mb-3">
        <label htmlFor="firmType" className="form-label">Firm Type</label>
        <select
          id="firmType"
          className="form-select"
          value={firmType}
          onChange={handleFirmTypeChange}
        >
          <option value="" >Select Firm Type</option>
          {firmTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {fields.length > 0 && (
        <div>
          <h4>Required Fields</h4>
          <form>
            {fields.map((field, index) => (
              <div className="mb-3" key={index}>
                <label htmlFor={`field-${index}`} className="form-label">{field}</label>
                <input
                  type="text"
                  id={`field-${index}`}
                  className="form-control"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </form>
        </div>
      )}
    </div>
  );
}

export default FirmTypeForm;
