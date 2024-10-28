import React, { useEffect, useState } from "react";
import { Table, Modal, ModalHeader, ModalBody, Button, Row, Col, } from "reactstrap";
import axiosInstance from "../utils/axiosInstance";
import FetchBrands from "../Pages/Inventory-MNG/FetchBrands";
import FetchManufacturers from "../Pages/Inventory-MNG/fetchManufacturers";

const ItemDetailModal = ({ setVariantIndex, setVariant, setVariantModalOpen, setSelectedItem, deleteVariant, updateItem, handleEditVariant, modalOpen, setModalOpen, selectedItem, firmId, }) => {
  const [vendors, setVendors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const handleBrandsFetched = (fetchedBrands) => {
    setBrands(fetchedBrands);
  };
  const handleManufacturersFetched = (fetchedManufacturers) => {
    setManufacturers(fetchedManufacturers);
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axiosInstance.get( 
          `${process.env.REACT_APP_URL}/vendor/get-vendors/${firmId}`
        );
        setVendors(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchVendors();
  }, []);
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
        {selectedItem?.name} Details{" "}
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
            </Row>
            <Row>
              <Col md={6}>
                <label>
                  <strong>Vendor:</strong>
                </label>
                <input type="text"   value={selectedItem?.vendor?.name ?? 'N/A'} className="form-control" readOnly />
              </Col>
              {/* <Col md={3}>
                <label>
                  <strong>More Vendors:</strong>
                </label>
                <select id="vendorId" name="vendorId" value={selectedItem.vendorId}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      vendorId: e.target.value,
                    })
                  }
                  className="form-control"
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((vendor) => (
                    <option key={vendor._id} value={vendor._id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </Col> */}
              <Col md={6}>
                <label>
                  <strong>Quantity Type:</strong>
                </label>

                <div className="d-flex">
                  <input
                    type="number"
                    value={selectedItem.quantity}
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
                    value={selectedItem.qtyType}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        qtyType: e.target.value,
                      })
                    }
                    className="form-control w-50"
                    readOnly
                  >
                    <option value="">Select Unit Type</option>
                    <option value="litres">Litres</option>
                    <option value="kg">Kilograms</option>
                    <option value="packets">Packets</option>
                    <option value="pieces">Pieces</option>
                    <option value="single unit">Single Unit</option>
                    <option value="gm">Grams</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
            <Col md={6}>
                <label>
                  <strong>Brand:</strong>
                </label>
                {selectedItem.brand && selectedItem.brand.name ? (
                  <input
                    type="text"
                    value={selectedItem.brand.name}
                    className="form-control"
                    readOnly
                  />
                ) : (
                  <select
                    className="form-control"
                    value={selectedItem.brand?._id || ""}
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
      <strong>Manufacturer:</strong>
    </label>
    {selectedItem.manufacturer && selectedItem.manufacturer.name ? (
      <input
        type="text"
        value={selectedItem.manufacturer.name}
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
              </Row>
            <Row>
              <Col md={6}>
                <label>
                  <strong>Selling Price:</strong>
                </label>
                <input
                  type="number"
                  value={selectedItem.sellingPrice}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      sellingPrice: parseFloat(e.target.value),
                    })
                  }
                  className="form-control"
                />
              </Col>
              <Col md={6}>
                <label>
                  <strong>Cost Price:</strong>
                </label>
                <input
                  type="number"
                  value={selectedItem.costPrice}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      costPrice: parseFloat(e.target.value),
                    })
                  }
                  className="form-control"
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
                  value={selectedItem.ProductHsn}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      ProductHsn: e.target.value,
                    })
                  }
                  className="form-control"
                />
              </Col>
            </Row>

            <Button
              className="my-4"
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
                  // vendor:selectedItem.vendorId
                })
              }
            >
              Update Item
            </Button>

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
                    {selectedItem.variants.map((variant, vIndex) => (
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
                          {/* <Button
                          color="danger"
                          onClick={() => deleteVariant(variant._id)}
                        >
                          Delete
                        </Button> */}
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
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ItemDetailModal;
