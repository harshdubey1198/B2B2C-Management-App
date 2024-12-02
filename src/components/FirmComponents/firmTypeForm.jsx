import React, { useState, useEffect } from "react";

function FirmTypeForm({ firmDetails, setFirmDetails }) {
  const [fields, setFields] = useState([]);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const role = authuser?.response?.role;
  // console.log(role);

  const firmTypes = [
    { value: "sole_proprietorship", label: "Sole Proprietorship" },
    { value: "partnership", label: "Partnership Firm" },
    { value: "llp", label: "Limited Liability Partnership (LLP)" },
    { value: "pvt_ltd", label: "Private Limited Company (Pvt. Ltd.)" },
    { value: "public_ltd", label: "Public Limited Company (Ltd.)" },
    { value: "opc", label: "One Person Company (OPC)" },
  ];

  const fieldsMap = {
    sole_proprietorship: ["pan", "gstin", "udyam", "shopAndEstablishmentLicense", "currentBankAccount"],
    partnership: ["pan", "partnershipDeed", "gstin", "tan", "udyam", "shopAndEstablishmentLicense"],
    llp: ["pan", "certificateOfIncorporation", "llpAgreement", "gstin", "tan", "digitalSignatureCertificate", "din", "udyam"],
    pvt_ltd: ["pan", "certificateOfIncorporation", "moaAndAoa", "gstin", "tan", "dsc", "din", "esiAndPfRegistration", "udyam"],
    public_ltd: ["pan", "certificateOfIncorporation", "moaAndAoa", "gstin", "tan", "dsc", "din", "esiAndPfRegistration", "cin", "sebiRegistration"],
    opc: ["pan", "certificateOfIncorporation", "moaAndAoa", "gstin", "tan", "dsc", "din", "udyam"],
  };

  useEffect(() => {
    setFields(fieldsMap[firmDetails.firmDetails?.firmType] || []);
  }, [firmDetails.firmDetails?.firmType]);

  const handleFirmTypeChange = (e) => {
    const selectedFirmType = e.target.value;
    setFirmDetails((prev) => ({
      ...prev,
      firmDetails: { ...prev.firmDetails, firmType: selectedFirmType },
    }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFirmDetails((prev) => ({
      ...prev,
      firmDetails: { ...prev.firmDetails, [name]: value },
    }));
  };

  return (
    <div>
      <div className="form-group">
      <div
          className='p-2 my-2 col-lg-3 col-md-3 col-sm-12 rounded'  
          style={{
            width:"100%",
            height:"auto",
            fontWeight:"bolder",
            background : "var(--bs-header-dark-bg)",
            color:"white"
              }}> 
              Firm Type details section
          </div>
            {(role === "client_admin" || role === "super_admin") && (
                <>
                  <label>Firm Type</label>
                  <select
                    className="form-control mb-3"
                    value={firmDetails?.firmDetails?.firmType || ""}
                    onChange={handleFirmTypeChange}
                  >
                    <option value="">Select Firm Type</option>
                    {firmTypes.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </>
              )}

      </div>

      {fields.map((field) => (
        <div className="form-group" key={field}>
          <label>
              {field
                .replace(/([a-z])([A-Z])/g, "$1 $2") 
                .replace(/[_-]/g, " ") 
                .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())} 
            </label>

          <input
            type="text"
            className="form-control mb-2"
            name={field}
            value={firmDetails?.firmDetails?.[field] || ""}
            onChange={handleFieldChange}
          />
        </div>
      ))}
    </div>
  );
}

export default FirmTypeForm;
