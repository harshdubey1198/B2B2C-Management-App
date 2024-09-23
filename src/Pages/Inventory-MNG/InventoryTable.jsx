import React, { useEffect, useState } from 'react';
import { Table, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import VariantModal from './VariantModal';

function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);  
  const [modalOpen, setModalOpen] = useState(false);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [variant, setVariant] = useState({ variationType: "", optionLabel: "", price: "", stock: "", sku: "", barcode: "" });
  const [variantIndex, setVariantIndex] = useState(null);
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const userId = JSON.parse(localStorage.getItem("authUser")).response.adminId;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/inventory/get-items/${userId}`, config);
        setInventoryData(response.data); 
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    const timeoutId = setTimeout(fetchInventoryData, 1000); 

    return () => clearTimeout(timeoutId); 
  }, [userId, config]); 

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariant((prevState) => ({ ...prevState, [name]: value }));
  };

  const addOrUpdateVariant = async () => {
    if (variant.variationType && variant.optionLabel && variant.price && variant.stock && variant.sku && variant.barcode) {
      if (variantIndex !== null) {
        const updatedVariants = [...selectedItem.variants];
        updatedVariants[variantIndex] = variant;
        try {
          await axios.put(`http://localhost:8000/api/inventory/add-variant/${selectedItem._id}`, variant, config);
          setSelectedItem({ ...selectedItem, variants: updatedVariants });
          toast.success("Variant updated successfully!");
        } catch (error) {
          console.error('Error updating variant:', error);
        }
      } else {
        try {
          await axios.put(`http://localhost:8000/api/inventory/add-variant/${selectedItem._id}`, variant, config);
          setSelectedItem({ ...selectedItem, variants: [...selectedItem.variants, variant] });
          toast.success("Variant added successfully!");
        } catch (error) {
          console.error('Error adding variant:', error);
        }
      }

      setVariant({ variationType: "", optionLabel: "", price: "", stock: "", sku: "", barcode: "" });
      setVariantIndex(null);
      setVariantModalOpen(false);
    } else {
      toast.error("Please fill in all variant details");
    }
  };

  const deleteVariant = async (variantId) => {
    if (selectedItem) {
      try {
        await axios.delete(`http://localhost:8000/api/inventory/${selectedItem._id}/delete-variant/${variantId}`, config);
        setSelectedItem((prevState) => ({
          ...prevState,
          variants: prevState.variants.filter(v => v._id !== variantId),
        }));
        toast.success("Variant deleted successfully!");
      } catch (error) {
        console.error('Error deleting variant:', error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Inventory Table" />

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
                    <td>{item.quantity} {item.qtyType}</td>
                    <td>{item.brand}</td>
                    <td>${item.costPrice?.toFixed(2)}</td>
                    <td>${item.sellingPrice?.toFixed(2)}</td>
                    <td>
                      <Button color="info" onClick={() => handleViewDetails(item)}>
                        View Details
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
        </div>

        <Modal modalClassName="custom-modal-width" isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
          <ModalHeader toggle={() => setModalOpen(!modalOpen)}> {selectedItem?.name} Details </ModalHeader>
          <ModalBody>
            {selectedItem && (
              <div>
                <p><strong>Description:</strong> {selectedItem.description}</p>
                <p><strong>Quantity:</strong> {selectedItem.quantity} {selectedItem.qtyType}</p>
                <p><strong>Brand:</strong> {selectedItem.brand}</p>
                <p><strong>Cost Price:</strong> ${selectedItem.costPrice?.toFixed(2)}</p>
                <p><strong>Selling Price:</strong> ${selectedItem.sellingPrice?.toFixed(2)}</p>
                <p><strong>Supplier:</strong> {selectedItem.supplier}</p>
                <p><strong>Manufacturer:</strong> {selectedItem.manufacturer}</p>
                <p><strong>HSN Code:</strong> {selectedItem.ProductHsn}</p>

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
                          <th>Actions</th>
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
                            <td>
                              <Button color="danger" onClick={() => deleteVariant(variant._id)}>Delete</Button>
                              <Button color="warning" onClick={() => { 
                                setVariant(variant);
                                setVariantIndex(vIndex);
                                setVariantModalOpen(true);
                              }}>Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No Variants</p>
                  )}
                </div>

                <Button color="primary" onClick={() => { 
                  setVariantModalOpen(true); 
                  setVariant({ variationType: "", optionLabel: "", price: "", stock: "", sku: "", barcode: "" });
                  setVariantIndex(null);
                }}>Add Variant</Button>
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
