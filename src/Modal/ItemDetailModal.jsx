import React, { useEffect, useState } from "react";
import { Table, Modal, ModalHeader, ModalBody, Button, Row, Col, } from "reactstrap";
import axiosInstance from "../utils/axiosInstance";
import FetchBrands from "../Pages/Inventory-MNG/FetchBrands";
import FetchManufacturers from "../Pages/Inventory-MNG/fetchManufacturers";
import { getTaxes } from "../apiServices/service";
import Select from "react-select";

const ItemDetailModal = ({ setVariantIndex, setVariant, setVariantModalOpen, setSelectedItem, deleteVariant, updateItem, handleEditVariant, modalOpen, setModalOpen, selectedItem, firmId, }) => {
  const [vendors, setVendors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [selectedTaxComponents, setSelectedTaxComponents] = useState([]);
  const [selectedTaxRates, setSelectedTaxRates] = useState([]);
  const role = JSON.parse(localStorage.getItem("authUser"))?.response?.role || "";
  // console.log("role", role);  
  const handleBrandsFetched = (fetchedBrands) => {
    setBrands(fetchedBrands);
  };
  const handleManufacturersFetched = (fetchedManufacturers) => {
    setManufacturers(fetchedManufacturers);
  };
  const fetchTaxes = async () => {
    try {
      const response = await getTaxes();
      setTaxes(response.data || [] );
    } catch (error) {
      console.error(error.message);

    }
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axiosInstance.get( 
          `${process.env.REACT_APP_URL}/vendor/get-vendors/${firmId}`
        );
        setVendors(response.data || []);
        // console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTaxes();
    fetchVendors();
  }, []);

  const handleTaxChange = (selectedOption) => { 
    const selectedTax = taxes.find((tax) => tax._id === selectedOption.value);

    if (selectedTax) {
        setSelectedTaxComponents(selectedTax.taxRates.map(rate => ({
            value: rate._id,
            label: `${rate.taxType} (${rate.rate}%)`
        })));

        setSelectedItem((prevState) => ({
            ...prevState,
            tax: {
                taxId: String(selectedTax._id), 
                selectedTaxTypes: prevState.tax?.selectedTaxTypes?.length 
                    ? prevState.tax.selectedTaxTypes.map(type => type._id)  
                    : selectedTax.taxRates.map(rate => rate._id)
            }
        }));
    } else {
        setSelectedTaxComponents([]);
        setSelectedItem((prevState) => ({
            ...prevState,
            tax: { taxId: null, selectedTaxTypes: [] }
        }));
    }
};

const selectedTaxId = selectedItem?.tax?.taxId
  ? typeof selectedItem.tax.taxId === "object"
    ? selectedItem.tax.taxId._id
    : selectedItem.tax.taxId
  : "";
  const selectedTax = selectedTaxId 
  ? taxes.find(tax => tax._id === selectedTaxId)
  : undefined;
// console.log("selectedItem.tax:", selectedItem?.tax);
// console.log("Extracted selectedTaxId:", selectedTaxId);
// console.log("Taxes List:", taxes);
// console.log("Filtered selectedTax:", selectedTax);

// console.log("selected tax types",selectedItem?.tax?.selectedTaxTypes);


const handleTaxTypeChange = (selectedTypes) => {
  const selectedTypeIds = selectedTypes ? selectedTypes.map(type => type.value) : [];

  setSelectedItem((prevState) => ({
    ...prevState,
    tax: {
      ...prevState.tax,
      selectedTaxTypes: selectedTypeIds 
    }
  }));
};
// console.log(selectedItem?.tax?.selectedTaxTypes, "selectedtaxttxttxtttttttttttt")
const selectedTaxTypes = selectedItem?.tax?.selectedTaxTypes || [];
// console.log("selected tax types",selectedTaxTypes);
// console.log("selectedtaxxxxxx",selectedTax);
const availableTaxTypes = selectedTax?.taxRates.map(rate => ({
  value: rate._id,
  label: `${rate.taxType} (${rate.rate}%)`
})) || [];

// console.log("available tax types",availableTaxTypes);


useEffect(() => {
  if (taxes.length > 0 && selectedTaxId) {
    setSelectedItem((prevState) => ({
      ...prevState,
      tax: {
        ...prevState.tax,
        taxId: selectedTaxId,
        selectedTaxTypes: prevState.tax?.selectedTaxTypes?.length
          ? prevState.tax.selectedTaxTypes
          : taxes.find(tax => tax._id === selectedTaxId)?.taxRates.map(rate => rate._id) || []
      }
    }));
  }
}, [taxes]); // Run only when `taxes` is updated




  return (
    <Modal
      modalClassName="custom-modal-width"
      isOpen={modalOpen}
      toggle={() => setModalOpen(!modalOpen)}
    >
      <FetchBrands firmId={firmId} onBrandsFetched={handleBrandsFetched} />
      <FetchManufacturers firmId={firmId} onManufacturersFetched={handleManufacturersFetched} />
      <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
        {" "}
        {selectedItem?.name} Details{" "} ||
        Item Type : 
        {/* { " " + selectedItem?.type.replace(/_/g, " ") .replace(/\b\w/g, (char) => char.toUpperCase()) || " " } */}

      </ModalHeader>
      <ModalBody>
        {selectedItem && (
          <div>
            <Row>
              <Col md={6}>
                <label>
                  <strong>Name:</strong>
                </label>
                <input type="text" value={selectedItem.name}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      name: e.target.value,
                    })
                  }
                  className="form-control"
                />
              </Col>

              <Col md={6}>
                <label>
                  <strong>Description:</strong>
                </label>
                <input type="text" value={selectedItem.description}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      description: e.target.value,
                    })
                  }
                  className="form-control"
                />
              </Col>
           
              <Col md={3}>
                <label>
                  <strong>Vendor:</strong>
                </label>
                {selectedItem?.vendor && selectedItem?.vendor?.name ? (
                  <input type="text" value={selectedItem?.vendor?.name} className="form-control" readOnly />
                ) : (
                  <select className="form-control" value={selectedItem.vendorId || ""}
                    onChange={(e) => {
                      const selectedVendor = vendors.find((vendor) => vendor._id === e.target.value);
                      setSelectedItem({
                        ...selectedItem,
                        vendor: selectedVendor || null,
                      });
                    }
                    }
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor._id} value={vendor._id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                )}

              </Col>
              <Col md={3}>
                <label>
                  <strong>Brand:</strong>
                </label>
                {selectedItem?.brand && selectedItem?.brand?.name ? (
                  <input
                    type="text"
                    value={selectedItem?.brand?.name}
                    className="form-control"
                    readOnly
                  />
                ) : (
                  <select
                    className="form-control"
                    value={selectedItem?.brand?._id || ""}
                    onChange={(e) => {
                      const selectedBrand = brands.find(
                        (brand) => brand._id === e.target.value
                      );
                      setSelectedItem({
                        ...selectedItem,
                        brand: selectedBrand || null,
                      });
                    }}
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                )}
              </Col>              
              <Col md={6}>
                <label>
                  <strong>Quantity Type:</strong>
                </label>

                <div className="d-flex">
                  <input
                    type="number"
                    value={selectedItem?.quantity}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        quantity: e.target.value,
                      })
                    }
                    className="form-control w-25 mr-2"
                    // readOnly
                  />

                  <select
                    id="qtyType"
                    name="qtyType"
                    value={selectedItem?.qtyType}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        qtyType: e.target.value,
                      })
                    }
                    className="form-control w-50"
                    readOnly
                  >
                    <option value="">Select Quantity Type</option>
                    <option value="kg">Kilograms</option>
                    <option value="grams">Grams</option>
                    <option value="pcs">Pieces</option>
                    <option value="litre">Litre</option>
                    <option value="meters">Meters</option>
                    <option value="centimeters">Centimeters</option>
                    <option value="feet">Feet</option>
                  </select>
                </div>
              </Col>
               <Col md={6}>
                <label>
                  <strong>Manufacturer:</strong>
                </label>
                {selectedItem?.manufacturer && selectedItem?.manufacturer?.name ? (
                  <input
                    type="text"
                    value={selectedItem?.manufacturer?.name}
                    className="form-control"
                    readOnly
                  />
                ) : (
                  <select
                    className="form-control"
                    value={selectedItem.manufacturer?._id || ""}
                    onChange={(e) => {
                      const selectedManufacturer = manufacturers.find(
                        (manufacturer) => manufacturer._id === e.target.value
                      );
                      setSelectedItem({
                        ...selectedItem,
                        manufacturer: selectedManufacturer || null,
                      });
                    }}
                  >
                    <option value="">Select Manufacturer</option>
                    {manufacturers.map((manufacturer) => (
                      <option key={manufacturer._id} value={manufacturer._id}>
                        {manufacturer.name}
                      </option>
                    ))}
                  </select>
                )}
              </Col>
              <Col md={6}>
                  <label>
                      <strong>Tax:</strong>
                  </label>
                  <Select
  options={taxes.map(tax => ({ value: tax._id, label: tax.taxName }))}
  value={selectedTax
    ? { value: selectedTax._id, label: selectedTax.taxName }
    : null}
  onChange={handleTaxChange}
  placeholder="Select Tax"
/>

              </Col>

              <Col md={6}>
                <label>
                  <strong>Tax Type(s):</strong>
                </label>
                <Select
  isMulti
  options={availableTaxTypes}
  value={selectedTaxTypes
    .map(selectedType => {
      const found = availableTaxTypes.find(type => type.value === selectedType._id);
      return found ? { value: selectedType._id, label: found.label } : null;
    })
    .filter(Boolean)} // Remove null values
  onChange={handleTaxTypeChange} 
  placeholder="Select Tax Type"
/>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <label>
                  <strong>Selling Price:</strong>
                </label>
                <input
                  type="number"
                  value={selectedItem?.sellingPrice}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      sellingPrice: parseFloat(e.target.value),
                    })
                  }
                  className="form-control"
                  // readOnly
                />
              </Col>
              <Col md={6}>
                <label>
                  <strong>Cost Price:</strong>
                </label>
                <input
                  type="number"
                  value={selectedItem?.costPrice}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      costPrice: parseFloat(e.target.value),
                    })
                  }
                  className="form-control"
                  // readOnly
                />
              </Col>
            </Row>
            <Row>
       
              <Col md={6}>
                <label>
                  <strong>HSN Code:</strong>
                </label>
                <input
                  type="text"
                  value={selectedItem?.ProductHsn}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      ProductHsn: e.target.value,
                    })
                  }
                  className="form-control"
                  readOnly
                />
              </Col>     
              <Col md={6}>
                  <label>
                    <strong>Item Type</strong>
                  </label>
                  <select
                    className="form-control"
                    value={selectedItem?.type || ""}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="">Select the type</option>
                    <option value="raw_material">Raw Material</option>
                    <option value="finished_good">Finished Goods</option>
                  </select>
                </Col>
              
            </Row>


            <div className="table-responsive">
              <strong>Variants:</strong>
              {selectedItem.variants.length > 0 ? (
                <table className="table table-bordered mt-3">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Variation Type</th>
                      <th>Option Label</th>
                      <th>Price ⬆️</th>
                      <th>Stock</th>
                      <th>Reserved</th>
                      <th>SKU</th>
                      <th>Barcode</th>
                      <th className="d-flex justify-content-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItem?.variants?.map((variant, vIndex) => (
                      <tr key={vIndex}>
                        <td>{vIndex + 1}</td>
                        <td>{variant.variationType}</td>
                        <td>{variant.optionLabel}</td>
                        <td>₹ {variant.price}</td>
                        <td>{variant.stock}</td>
                        <td>{variant.reservedQuantity}</td>
                        <td>{variant.sku}</td>
                        <td>{variant.barcode}</td>
                        <td className="d-flex justify-content-center">
                          <i
                            className="bx bx-pencil"
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                            onClick={() => handleEditVariant(variant, vIndex)}
                          ></i>
                          <i
                            className="bx bx-trash"
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteVariant(variant._id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No Variants</p>
              )}
            </div>

              {role==="client_admin" || role==="firm_admin" || role === "employee" || role ==="super_admin" ? ( 
                <div className="d-flex justify-content-between mt-2 gap-2">
                <Button
                    color="primary"
                    onClick={() => {
                      setVariantModalOpen(true);
                      setVariant({
                        variationType: "",
                        optionLabel: "",
                        price: "",
                        stock: "",
                        sku: "",
                        barcode: "",
                      });
                      setVariantIndex(null);
                    }}
                  >
                  Add Variant
                </Button>
                <Button
                  className=" ml-2"
                  color="primary"
                  onClick={() =>
                    updateItem({
                      name: selectedItem.name,
                      description: selectedItem.description,
                      qtyType: selectedItem.qtyType,
                      quantity: selectedItem.quantity,
                      manufacturer: selectedItem.manufacturer,
                      brand: selectedItem.brand,
                      costPrice: selectedItem.costPrice,
                      sellingPrice: selectedItem.sellingPrice,
                      vendor:selectedItem.vendor,
                      type: selectedItem.type,
                      tax: selectedItem.tax,
                      ProductHsn: selectedItem.ProductHsn,
                    })
                  }
                >
                  Update Item
                </Button>
            </div>
              ) : (<span>hi</span>)
          }

          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ItemDetailModal;
