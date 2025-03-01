import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Modal, ModalHeader, ModalBody, Button, Input } from "reactstrap";
import { getFirmWastage, getWastageById } from "../../apiServices/service";
import FirmSwitcher from "../Firms/FirmSwitcher";
import { toast } from "react-toastify";

function WasteManagement() {
  const [wasteData, setWasteData] = useState([]);
  const [filteredWasteData, setFilteredWasteData] = useState([]);
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // const [customItemsPerPage, setCustomItemsPerPage] = useState("");

  const authuser = JSON.parse(localStorage.getItem("authUser"))?.response || {};
  const userRole = authuser?.role;
  const firmId = authuser?.adminId;
  const effectiveFirmId = userRole === "client_admin" ? selectedFirmId : firmId;

  useEffect(() => {
    fetchFirmWaste();
  }, [effectiveFirmId, trigger]);

  const fetchFirmWaste = async () => {
    if (!effectiveFirmId) return;
    try {
      const response = await getFirmWastage(effectiveFirmId);
      setWasteData(response.data || []);
      setFilteredWasteData(response.data || []);
    } catch (error) {
      console.error("Error fetching Firm Waste:", error.message);
    }
  };

  const fetchWastageDetails = async (id) => {
    try {
      const response = await getWastageById(id);
      setSelectedWaste(response.data || {});
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching wastage details:", error.message);
    }
  };

  const refetchWasteData = () => {
    setTrigger(!trigger);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = wasteData.filter((item) =>
      item.productionOrderId?.productionOrderNumber.toLowerCase().includes(query) ||
      item.rawMaterials.some((material) =>
        material.itemId?.name.toLowerCase().includes(query)
      ) ||
      item.status.toLowerCase().includes(query)
    );

    setFilteredWasteData(filteredData);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...filteredWasteData].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (key === "productionOrderId") {
        valueA = a.productionOrderId?.productionOrderNumber || "";
        valueB = b.productionOrderId?.productionOrderNumber || "";
      } else if (key === "status") {
        valueA = a.status || "";
        valueB = b.status || "";
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setSortConfig({ key, direction });
    setFilteredWasteData(sortedData);
  };
  const renderStatusBadge = (status) => {
    switch (status) {
      case "created":
        return <span className="badge bg-success">{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
      case "Pending Disposal":
        return <span className="badge bg-warning">{status}</span>;
      case "cancelled":
        return <span className="badge bg-danger">{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ▲" : " ▼";
    }
    return " ⇅";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWasteData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredWasteData.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // const handleCustomItemsPerPage = () => {
  //   const value = parseInt(customItemsPerPage, 10);
  //   if (!isNaN(value) && value > 0) {
  //     setItemsPerPage(value);
  //     setCurrentPage(1);
  //   } else {
  //     toast.error("Please enter a valid number of items per page.");
  //   }
  // };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Waste Management" />

        <div className="d-flex justify-content-start gap-2 align-items-center mb-3 px-3">
          <i className='bx bx-refresh cursor-pointer' style={{ fontSize: "24.5px", fontWeight: "bold", color: "black" }}
            onClick={refetchWasteData}
          ></i>

          {userRole === "client_admin" && (
            <FirmSwitcher selectedFirmId={selectedFirmId} onSelectFirm={setSelectedFirmId} />
          )}

          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-25"
          />

          <select className="form-select w-auto" onChange={handleItemsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>

          {/* <Input
            type="number"
            placeholder="Custom"
            min="1"
            value={customItemsPerPage}
            onChange={(e) => setCustomItemsPerPage(e.target.value)}
            className="w-25"
          />
          <Button color="primary" onClick={handleCustomItemsPerPage}>Set</Button> */}
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th onClick={() => handleSort("productionOrderId")} style={{ cursor: "pointer" }}>
                  PO No. {renderSortIcon("productionOrderId")}
                </th>
                <th onClick={() => handleSort("rawMaterials")} style={{ cursor: "pointer" }}>
                  Material
                </th>
                <th onClick={() => handleSort("wasteQuantity")} style={{ cursor: "pointer" }}>
                  Quantity 
                </th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item._id} onClick={() => fetchWastageDetails(item._id)} style={{ cursor: "pointer" }}>
                  <td>{item?.productionOrderId?.productionOrderNumber || "N/A"}</td>
                  <td>{item.rawMaterials?.map(m => m.itemId?.name).join(", ") || "N/A"}</td>
                  <td><ul className="p-0" style={{ listStyleType: "none" }}>
                        {item?.rawMaterials?.length > 0 ? (
                          item.rawMaterials.map((rawMaterial, index) => (
                            <li key={index}>{rawMaterial?.wasteQuantity || 0} units</li>
                          ))
                        ) : (
                          <li>0 units</li>
                        )}
                     </ul>
                  </td>
                  <td>{renderStatusBadge(item?.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-controls">
          {pageNumbers.map(number => (
            <Button key={number} onClick={() => setCurrentPage(number)}>{number}</Button>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default WasteManagement;
