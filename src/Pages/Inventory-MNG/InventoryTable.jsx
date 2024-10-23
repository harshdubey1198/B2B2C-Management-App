import React, { useEffect, useState } from "react";
import {Table,Modal,ModalHeader,ModalBody,Button,Row,Col,} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import VariantModal from "./VariantModal";
import FirmsTable from "../../components/InventoryComponents/firmsTable";
import axiosInstance from "../../utils/axiosInstance";
import ItemDetailModal from "../../Modal/ItemDetailModal";

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
  useEffect(() => {
    if(authuser.role === "firm_admin"  || authuser.role==="accountant" || authuser.role==="employee"){
      const fetchInventoryData = async () => {
        try {
          const response = await axiosInstance.get(
            `${process.env.REACT_APP_URL}/inventory/get-items/${userId}`
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
    // console.log(selectedItem.vendor.name);
    setModalOpen(true);
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setVariant((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteInventory = async (item) => {
    try {
      await axiosInstance.delete(
        `${process.env.REACT_APP_URL}/inventory/delete-item/${item._id}`
        
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
        let response;
        if (variantIndex !== null) {
          // Update existing variant
          response = await axiosInstance.put(
            `${process.env.REACT_APP_URL}/inventory/update-item/${selectedItem._id}`,
            {
              variants: [
                {
                  _id: selectedItem.variants[variantIndex]._id,
                  ...variant,
                },
              ],
            }
          );
  
          // Update the selectedItem's variants list with the updated variant
          const updatedVariants = [...selectedItem.variants];
          updatedVariants[variantIndex] = { ...variant, _id: updatedVariants[variantIndex]._id }; // Retain original variant ID
          setSelectedItem({
            ...selectedItem,
            variants: updatedVariants,
          });
        } else {
          // Add new variant
          response = await axiosInstance.put(
            `${process.env.REACT_APP_URL}/inventory/add-variant/${selectedItem._id}`,
            
            variant
          );
  
          setSelectedItem({
            ...selectedItem,
            variants: [...selectedItem.variants, variant],
          });
        }
  
        setTrigger((prev) => prev + 1);
        setModalOpen(!modalOpen);
        toast.success(response.message);
        
      } catch (error) {
        console.error("Error adding or updating variant:", error);
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
        await axiosInstance.delete(
          `${process.env.REACT_APP_URL}/inventory/${selectedItem._id}/delete-variant/${variantId}`);
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
      const response = await axiosInstance.put(
        `${process.env.REACT_APP_URL}/inventory/update-item/${selectedItem._id}`,
        updatedFields
      );
      setSelectedItem((prev) => ({ ...prev, ...updatedFields }));
      toast.success(response.message);
      setModalOpen(!modalOpen);
      setTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  
  const handleEditVariant = (variant, index) => {
    console.log("Editing Variant:", variant);
    console.log("Variant Index:", index);
    setVariant(variant);
    setVariantIndex(index);
    setVariantModalOpen(true);
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
              <td>₹ {item.costPrice?.toFixed(2)}</td>
              <td>₹ {item.sellingPrice?.toFixed(2)}</td>
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
    <ItemDetailModal
      setVariantIndex={setVariantIndex}
      setVariant={setVariant}
      setVariantModalOpen={setVariantModalOpen}
      setSelectedItem={setSelectedItem}
      deleteVariant={deleteVariant}
      updateItem={updateItem}
      handleEditVariant={handleEditVariant}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      selectedItem={selectedItem} 
    />

        <VariantModal
          isOpen={variantModalOpen}
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
