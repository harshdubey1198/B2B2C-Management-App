import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import FirmSwitcher from '../../Pages/Firms/FirmSwitcher';

function FirmsTable({handleViewDetails}) {
  const [inventoryData, setInventoryData] = useState([])
  const [selectedFirmId, setSelectedFirmId] = useState(null)
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const token = authuser?.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/inventory/get-items/${selectedFirmId}`,
          config
        );
        setInventoryData(response.data)
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchInventoryData();
  }, [selectedFirmId])

  return (
    <div className="table-responsive">
      <div className="d-flex justify-content-between mb-4">
          <p className="mm-active">
            This is the Inventory management page you can see Inventory by Firms.
          </p>
        </div>
        <div className="d-flex justify-content-between mb-4">
            <FirmSwitcher
            selectedFirmId={selectedFirmId}
            onSelectFirm={setSelectedFirmId}
            />
        </div>

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
               
                <i className="bx bx-show" style={{fontSize: "22px", fontWeight:"bold", cursor: "pointer" , marginLeft:"5px"}}  onClick={() => handleViewDetails(item)}></i>

                {/* <Button
                  color="danger"
                  // onClick={() => handleDeleteInventory(item)}
                >
                  Delete
                </Button> */}
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
  );
}

export default FirmsTable;
