import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import VariantModal from "./VariantModal";
import FirmsTable from "../../components/InventoryComponents/firmsTable";

function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [variant, setVariant] = useState({
    variationType: "",
    optionLabel: "",
    price: "",
    stock: "",
    sku: "",
    barcode: "",
  });
  const [variantIndex, setVariantIndex] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const userId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
  const authuser = JSON.parse(localStorage.getItem("authUser")).response;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if(authuser.role === "firm_admin"  || authuser.role==="accountant" || authuser.role==="employee"){
      const fetchInventoryData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_URL}/inventory/get-items/${userId}`,
            config
          );
          setInventoryData(response.data);
        } catch (error) {
          console.error("Error fetching inventory data:", error);
        }
      };
  
      fetchInventoryData();
    }
  }, [userId, trigger]);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariant((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteInventory = async (item) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/inventory/delete-item/${item._id}`,
        config
      );
      setTrigger((prev) => prev + 1);
      // setModalOpen(!modalOpen);
    } catch (error) {
      console.error("Error deleting Inventory:", error);
    }
  };

  const addOrUpdateVariant = async () => {
    if (
      variant.variationType &&
      variant.optionLabel &&
      variant.price &&
      variant.stock &&
      variant.sku &&
      variant.barcode
    ) {
      try {
        await axios.put(
          `${process.env.REACT_APP_URL}/inventory/add-variant/${selectedItem._id}`,
          variant,
          config
        );
        setSelectedItem({
          ...selectedItem,
          variants: [...selectedItem.variants, variant],
        });
        setTrigger((prev) => prev + 1);
        setModalOpen(!modalOpen);
        toast.success("Variant added successfully!");
      } catch (error) {
        console.error("Error adding variant:", error);
      }

      setVariant({
        variationType: "",
        optionLabel: "",
        price: "",
        stock: "",
        sku: "",
        barcode: "",
      });
      setVariantModalOpen(false);
    } else {
      toast.error("Please fill in all variant details");
    }
  };

  const deleteVariant = async (variantId) => {
    if (selectedItem) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_URL}/inventory/${selectedItem._id}/delete-variant/${variantId}`,
          config
        );
        setSelectedItem((prevState) => ({
          ...prevState,
          variants: prevState.variants.filter((v) => v._id !== variantId),
        }));
        setTrigger((prev) => prev + 1);
        setModalOpen(!modalOpen);
        toast.success("Variant deleted successfully!");
      } catch (error) {
        console.error("Error deleting variant:", error);
      }
    }
  };

  const updateItem = async (updatedFields) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/inventory/update-item/${selectedItem._id}`,
        updatedFields,
        config
      );
      setSelectedItem((prev) => ({ ...prev, ...updatedFields }));
      toast.success("Item updated successfully!");
      setModalOpen(!modalOpen);
      setTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs
          title="Inventory Management"
          breadcrumbItem="Inventory Table"
        />

{authuser.role === 'client_admin' ? (
  <FirmsTable handleViewDetails={handleViewDetails}/>
) : (
  <div className="table-responsive">
    <Table bordered className="mb-0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Brand</th>
          <th>Cost Price</th>
          <th>Selling Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventoryData.length > 0 ? (
          inventoryData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                {item.quantity} {item.qtyType}
              </td>
              <td>{item.brand}</td>
              <td>${item.costPrice?.toFixed(2)}</td>
              <td>${item.sellingPrice?.toFixed(2)}</td>
              <td>
               
                <i className="bx bx-show" style={{fontSize: "22px", fontWeight:"bold",cursor: "pointer" }} color="info"
                  onClick={() => handleViewDetails(item)}></i>
                <i className="bx bx-trash"  style={{fontSize: "22px", fontWeight:"bold", cursor: "pointer" , marginLeft:"5px"}} onClick={() => handleDeleteInventory(item)}></i>

              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No inventory items found</td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)}


        {/* <div className="table-responsive">
          <Table bordered className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Brand</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.length > 0 ? (
                inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.quantity} {item.qtyType}
                    </td>
                    <td>{item.brand}</td>
                    <td>${item.costPrice?.toFixed(2)}</td>
                    <td>${item.sellingPrice?.toFixed(2)}</td>
                    <td className="d-flex gap-2">
                      <Button
                        color="info"
                        onClick={() => handleViewDetails(item)}
                      >
                        View Details
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => handleDeleteInventory(item)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No inventory items found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div> */}

        <Modal
          modalClassName="custom-modal-width"
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
        >
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
                      <strong>Description:</strong>
                    </label>
                    <input
                      type="text"
                      value={selectedItem.description}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          description: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </Col>
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
      className="form-control w-75 mr-2" 
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
      className="form-control w-25"
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
                    <input
                      type="text"
                      value={selectedItem.brand}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          brand: e.target.value,
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
                      <strong>Supplier:</strong>
                    </label>
                    <input
                      type="text"
                      value={selectedItem.supplier}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          supplier: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>
                      <strong>Manufacturer:</strong>
                    </label>
                    <input
                      type="text"
                      value={selectedItem.manufacturer}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          manufacturer: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </Col>
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
                  color="primary"
                  onClick={() =>
                    updateItem({
                      name: selectedItem.name,
                      description: selectedItem.description,
                      qtyType: selectedItem.qtyType,
                      supplier: selectedItem.supplier,
                      manufacturer: selectedItem.manufacturer,
                      brand: selectedItem.brand,
                      costPrice: selectedItem.costPrice,
                      sellingPrice: selectedItem.sellingPrice,
                    })
                  }
                >
                  Update Item
                </Button>

                <div>
                  <strong>Variants:</strong>
                  {selectedItem.variants.length > 0 ? (
                    <Table bordered className="mt-3">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Variation Type</th>
                          <th>Option Label</th>
                          <th>Price ⬆️</th>
                          <th>Stock</th>
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
                            <td>${variant.price}</td>
                            <td>{variant.stock}</td>
                            <td>{variant.sku}</td>
                            <td>{variant.barcode}</td>
                            <td className="d-flex justify-content-center">
                              {/* <Button
                                color="danger"
                                onClick={() => deleteVariant(variant._id)}
                              >
                                Delete
                              </Button> */}
                              <i className="bx bx-trash"  style={{fontSize: "22px", fontWeight:"bold", cursor: "pointer"}} onClick={() => deleteVariant(variant._id)}></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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

        <VariantModal
          modal={variantModalOpen}
          toggleModal={() => setVariantModalOpen(!variantModalOpen)}
          variant={variant}
          handleVariantChange={handleVariantChange}
          addVariant={addOrUpdateVariant}
        />
      </div>
    </React.Fragment>
  );
}

export default InventoryTable;
