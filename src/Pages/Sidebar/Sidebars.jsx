import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getAllSidebars, updateSidebar } from "../../apiServices/service";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import IconSelector from "../../components/IconSelector";

const SidebarTable = ({ sidebarData, onEdit }) => {
  const [openRoleIndex, setOpenRoleIndex] = useState(null);
  const [openSidebarIndex, setOpenSidebarIndex] = useState(null);

  const toggleRole = (index) => {
    setOpenRoleIndex(openRoleIndex === index ? null : index);
    setOpenSidebarIndex(null);
  };

  const toggleSidebar = (index) => {
    setOpenSidebarIndex(openSidebarIndex === index ? null : index);
  };

  return (
    <div >
      <Table responsive> 
        <thead>
          <tr className="bg-light text-dark">
            <th style={{ width: "110px" }}>Role</th>
            <th style={{ width: "110px" }}>Label</th>
            <th style={{ width: "80px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sidebarData.map((roleData, roleIndex) => (
            <React.Fragment key={roleIndex}>
              <tr onClick={() => toggleRole(roleIndex)}>
                <td className="cursor-pointer bg-primary text-white d-flex justify-content-between align-items-center">
                  <strong>{roleData.role.replace(/_/g, " ").replace(/\b\w/, (char) => char.toUpperCase())}</strong>
                  <strong style={{fontSize:"20px"}}>{openRoleIndex === roleIndex ? <i className="bx bx-chevron-up"></i> : <i className="bx bx-chevron-down"></i>}</strong>
                </td>
                <td></td>
                <td></td>
              </tr>

              {openRoleIndex === roleIndex &&
                roleData.sidebar.map((item, sidebarIndex) => (
                  <React.Fragment key={sidebarIndex}>
                    <tr onClick={() => toggleSidebar(sidebarIndex)} className="cursor-pointer">
                      <td></td>
                      <td className="d-flex justify-content-between pl-3 pr-3" style={{padding: "13px"}}>
                        {item.label}
                        <div className="d-flex gap-2">
                            <i className={item.icon}></i>
                            {item.subItem && item.subItem.length > 0 && (
                            <span  style={{lineHeight:"1",fontSize:"20.5px"}}>
                                {openSidebarIndex === sidebarIndex ? <i className="bx bx-chevron-up"></i> : <i className="bx bx-chevron-down"></i>}
                            </span>
                            )}
                        </div>
                      </td>
                      <td className="text-center">
                       
                        <span style={{lineHeight:"1",fontSize:"15.5px"}} onClick={() => onEdit(roleData.role, item)}>
                          <i className="bx bx-pencil"></i>
                        </span>
                      </td>
                    </tr>

                    {openSidebarIndex === sidebarIndex && item.subItem.length > 0 && (
                      <tr>
                        <td></td>
                        <td>
                          <ul className="list-unstyled">
                            {item.subItem.map((sub, subIndex) => (
                              <li key={subIndex} className="d-flex justify-content-between border-bottom " style={{padding: "3px"}}>
                                <a href={sub.link} className="text-primary">{sub.sublabel}</a>
                                <Button color="danger" size="sm" onClick={() => onEdit(roleData.role, item, sub)}>
                                  <i className="bx bx-pencil"></i>
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td></td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const SidebarModal = ({ isOpen, toggle, role, sidebarItem, subItem, onSave }) => {
    const [label, setLabel] = useState("");
    const [icon, setIcon] = useState("");
    const [url, setUrl] = useState("");
  
    useEffect(() => {
      if (subItem) {
        setLabel(subItem.sublabel || "");
        setUrl(subItem.link || "");
        setIcon(""); // Sub-items don't have icons
      } else if (sidebarItem) {
        setLabel(sidebarItem.label || "");
        setIcon(sidebarItem.icon || "");
        setUrl(sidebarItem.url || "");
      } else {
        setLabel("");
        setIcon("");
        setUrl("");
      }
    }, [sidebarItem, subItem, isOpen]); // Reset when modal opens
  
    const handleSaveClick = () => {
      const updatedData = { label, icon, url };
      onSave(role, sidebarItem, subItem, updatedData);
    };
  
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{subItem ? "Edit Sub-Item" : "Edit Sidebar"}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>{subItem ? "Sub-Item Label" : "Sidebar Label"}</Label>
              <Input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
            </FormGroup>
            {!subItem && (
              <FormGroup>
                <Label>Icon</Label>
                <IconSelector selectedIcon={icon} setSelectedIcon={setIcon} />
              </FormGroup>
            )}
            <FormGroup>
              <Label>URL</Label>
              <Input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

function Sidebars() {
  const [sidebars, setSidebars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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
    const roleIndex = updatedSidebar.findIndex(r => r.role === role);
  
    if (roleIndex === -1) return;

    let updatedPayload = { label: sidebarItem.label }; // Match sidebar by label

    if (subItem) {
        updatedPayload.sublabel = subItem.sublabel; // Match subitem by sublabel
        updatedPayload.newSublabel = updatedData.label; // Only update if modified
        updatedPayload.newLink = updatedData.url;
    } else {
        updatedPayload.newLabel = updatedData.label;
        updatedPayload.icon = updatedData.icon;
        updatedPayload.url = updatedData.url;
    }

    // **Only send update if data is modified**
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

  useEffect(() => {
    fetchAllSidebars();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Sidebar" breadcrumbItem="Sidebar" />
        <SidebarTable sidebarData={sidebars} onEdit={handleEdit} />
      </div>
      <SidebarModal isOpen={modalOpen} toggle={() => setModalOpen(false)} role={selectedRole} sidebarItem={selectedSidebarItem} subItem={selectedSubItem} onSave={handleSave} />
    </React.Fragment>
  );
}

export default Sidebars;
