import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getAllSidebars, createSidebar, updateSidebar } from "../../apiServices/service";
import SidebarTable from "./SidebarTable";
import SidebarModal from "../../Modal/Sidebar/SidebarModal";
import SidebarCreateModal from "../../Modal/Sidebar/SidebarCreateModal";
import { Button } from "reactstrap";

function Sidebars() {
  const [sidebars, setSidebars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const fetchAllSidebars = async () => {
    try {
      const response = await getAllSidebars();
      if (response?.data) {
        setSidebars(response.data);
      }
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    }
  };

  const handleEdit = (role, sidebarItem, subItem = null) => {
    setSelectedRole(role);
    setSelectedSidebarItem(sidebarItem);
    setSelectedSubItem(subItem);
    setModalOpen(true);
  };

  const handleSave = async (role, sidebarItem, subItem, updatedData) => {
    const updatedSidebar = [...sidebars];
    const roleIndex = updatedSidebar.findIndex((r) => r.role === role);

    if (roleIndex === -1) return;

    let updatedPayload = { label: sidebarItem.label };

    if (subItem) {
      updatedPayload.sublabel = subItem.sublabel;
      updatedPayload.newSublabel = updatedData.label;
      updatedPayload.newLink = updatedData.url;
    } else {
      updatedPayload.newLabel = updatedData.label;
      updatedPayload.icon = updatedData.icon;
      updatedPayload.url = updatedData.url;
    }

    if (Object.keys(updatedPayload).length > 1) {
      try {
        const response = await updateSidebar(role, updatedPayload);
        if (response.message === "Sidebar updated successfully") {
          setSidebars(updatedSidebar);
          setModalOpen(false);
        } else {
          console.error("Error updating sidebar:", response.message);
        }
      } catch (error) {
        console.error("Failed to update sidebar:", error);
        alert("Failed to update sidebar. Check console for more details.");
      }
    } else {
      console.log("No changes detected, update skipped.");
      setModalOpen(false);
    }
  };

  const handleCreateSidebar = async (newSidebar) => {
    try {
      const response = await createSidebar(newSidebar);
      if (response.message === "Sidebar created successfully") {
        setSidebars([...sidebars, response.response]);
        setCreateModalOpen(false);
      } else {
        console.error("Error creating sidebar:", response.message);
      }
    } catch (error) {
      console.error("Failed to create sidebar:", error);
      alert("Failed to create sidebar. Check console for more details.");
    }
  };

  useEffect(() => {
    fetchAllSidebars();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Sidebar" breadcrumbItem="Sidebar" />
        
        <div className="d-flex justify-content-between mb-3">
          <h4>Manage Sidebars</h4>
          <Button color="primary" onClick={() => setCreateModalOpen(true)}>+ Create Sidebar</Button>
        </div>

        <SidebarTable sidebarData={sidebars} onEdit={handleEdit} />

        <SidebarModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(false)}
          role={selectedRole}
          sidebarItem={selectedSidebarItem}
          subItem={selectedSubItem}
          onSave={handleSave}
        />

        <SidebarCreateModal
          isOpen={createModalOpen}
          toggle={() => setCreateModalOpen(false)}
          onSave={handleCreateSidebar}
        />
      </div>
    </React.Fragment>
  );
}

export default Sidebars;
