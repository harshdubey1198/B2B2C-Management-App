import React, { useEffect, useState } from "react";
import {Table,Modal,ModalHeader,ModalBody,Button,Row,Col,} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import VariantModal from "./VariantModal";
import FirmsTable from "../../components/InventoryComponents/firmsTable";
import axiosInstance from "../../utils/axiosInstance";
import ItemDetailModal from "../../Modal/ItemDetailModal";
import { useNavigate } from "react-router-dom";

function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredInventoryData, setFilteredInventoryData] = useState(inventoryData); 
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [customItemsPerPage, setCustomItemsPerPage] = useState("");
  const [variant, setVariant] = useState({
    variationType: "",
    optionLabel: "",
    price: "",
    stock: "",
    sku: "",
    barcode: "",
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventoryData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredInventoryData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to the first page when items per page change
  };

  const handleCustomItemsPerPage = () => {
    const value = parseInt(customItemsPerPage, 10);
    if (!isNaN(value) && value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1); // Reset to the first page when items per page change
    } else {
      toast.error("Please enter a valid number of items per page.");
    }
  };
  const [variantIndex, setVariantIndex] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const token = JSON.parse(localStorage.getItem("authUser")).token;
  const userId = JSON.parse(localStorage.getItem("authUser")).response.adminId;
  const authuser = JSON.parse(localStorage.getItem("authUser")).response;
  const firmId = authuser?.adminId;
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
    console.log(item);
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

  const handleAddItemPage = () => {
    navigate("/add-inventory");
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
        { ...updatedFields, type: selectedItem.type }
      ); 
      // setSelectedItem((prev) => ({ ...prev, ...updatedFields }));
      setSelectedItem((prev) => ({ ...prev, ...updatedFields ,type: selectedItem.type }));
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

  const handleSortByType = (type) => {

    // initially want all the data
    if (type === " ") {
      setFilteredInventoryData(inventoryData);
    }
    
    if (!type) {
      setFilteredInventoryData(inventoryData); 
    } else {
      const sortedData = inventoryData.filter((item) => item.type === type);
      setFilteredInventoryData(sortedData);
    }
  };
  useEffect(() => {
    setFilteredInventoryData(inventoryData);
  }, [inventoryData]);
  
useEffect(() => {
  handleSortByType(" ");
},[]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs
          title="Inventory Management"
          breadcrumbItem="Inventory Table"
        />

      <div className="d-flex justify-content-end gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
          <label htmlFor="itemsPerPageSelect">Items per page:</label>
                <select
                  id="itemsPerPageSelect"
                  className="form-select"
                  style={{ width: "auto" ,maxHeight:"33px"}}
                  onChange={handleItemsPerPageChange}
                >
                  <option value="10"  >10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="70">70</option>
                  <option value="100">100</option>
                </select>

                <label htmlFor="customItemsInput">Or enter custom:</label>
                <input
                  id="customItemsInput"
                  type="number"
                  min="1"
                  value={customItemsPerPage}
                  onChange={(e) => setCustomItemsPerPage(e.target.value)}
                  className="form-control"
                  style={{ width: "100px",maxHeight:"33px" }} 
                />
                <Button color="primary" onClick={handleCustomItemsPerPage}>
                  Set
                </Button>
            </div>

          <Button color="primary" className="p-2 text-black" style={{fontSize:"10.5px"}} onClick={handleAddItemPage}> Add Item </Button>
            {/* <span
                className="badge table-raw-materials p-2 text-black d-flex align-items-center cursor-pointer"
                onClick={() => handleSortByType("raw_material")}
              >
                Raw Material
              </span>

              <span
                className="badge table-row-blue p-2 text-black d-flex align-items-center cursor-pointer"
                onClick={() => handleSortByType("finished_good")} 
              >
                Finished Goods
              </span>
          <span className="badge table-row-yellow p-2 text-black d-flex align-items-center cursor-pointer"
            onClick={() => handleSortByType("")}
          >All</span> */}
          <select
            type="select"
            className="form-select"
            style={{ width: "auto" ,maxHeight:"33px"}}
            onChange={(e) => handleSortByType(e.target.value)}
          >
            <option value="">All Items</option>
            <option value="raw_material">Raw Material</option>
            <option value="finished_good">Finished Goods</option>
          </select>
          <span className="badge bg-success p-2 d-flex align-items-center">Total Items: {inventoryData.length}</span>
      </div>

        {/* <div className="d-flex align-items-center gap-3 mb-3">

        </div> */}


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
    {currentItems.length > 0 ? (
      currentItems.map((item, index) => {
      const rowClass =
        item.type === "raw_material"
          ? "table-raw-materials"
          : item.type==="finished_good"
          ? "table-row-blue"
          : "table-row-yellow";

      return (
        <tr key={index} className={rowClass}>
          <td className={rowClass} onClick={() => handleViewDetails(item)}>{item.name}</td>
          <td className={rowClass} onClick={() => handleViewDetails(item)}>{item.description}</td>
          <td className={rowClass} onClick={() => handleViewDetails(item)}>
            {item.quantity} {item.qtyType}
          </td>
          <td className={rowClass} onClick={() => handleViewDetails(item)}>{item.brand?.name}</td>
          <td className={rowClass} onClick={() => handleViewDetails(item)}>₹ {item.costPrice?.toFixed(2)}</td>
          <td className={rowClass} onClick={() => handleViewDetails(item)}>₹ {item.sellingPrice?.toFixed(2)}</td>
          <td><i className="bx bx-edit"
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
                onClick={() => handleViewDetails(item)}
              ></i>
              <i
                className="bx bx-trash"
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
                onClick={() => handleDeleteInventory(item)}
              ></i>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="7">No inventory items found</td>
    </tr>
  )}
</tbody>

    </Table>
  </div>
)}
    <div className="pagination-controls d-flex gap-2 mt-2">
      {pageNumbers.map(number => (
        <Button key={number} onClick={() => paginate(number)} className={currentPage === number ? "btn-primary" : "btn-secondary"}>
          {number}
        </Button>
      ))}
    </div>
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
          firmId={firmId}
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
