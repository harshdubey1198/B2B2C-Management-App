import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from "reactstrap";
import IconSelector from "../../components/IconSelector"; 

const SidebarCreateModal = ({ isOpen, toggle, onSave }) => {
  const [role, setRole] = useState("");
  const [sidebars, setSidebars] = useState([]);
  console.log(role,sidebars);
  const handleAddSidebarItem = () => {
    setSidebars([...sidebars, { label: "", icon: "", url: "", subItem: [] }]);
  };

  const handleRemoveSidebarItem = (index) => {
    const updatedSidebars = sidebars.filter((_, i) => i !== index);
    setSidebars(updatedSidebars);
  };

  const handleSidebarChange = (index, field, value) => {
    const updatedSidebars = [...sidebars];
    updatedSidebars[index][field] = value;

    if (field === "subItem" && value.length > 0) {
      updatedSidebars[index].url = "";
    }

    setSidebars(updatedSidebars);
  };

  const handleAddSubItem = (sidebarIndex) => {
    const updatedSidebars = [...sidebars];
    updatedSidebars[sidebarIndex].subItem.push({ sublabel: "", link: "" });
    updatedSidebars[sidebarIndex].url = "";
    setSidebars(updatedSidebars);
  };

  const handleRemoveSubItem = (sidebarIndex, subIndex) => {
    const updatedSidebars = [...sidebars];
    updatedSidebars[sidebarIndex].subItem = updatedSidebars[sidebarIndex].subItem.filter((_, i) => i !== subIndex);
    setSidebars(updatedSidebars);
  };

  const handleSubItemChange = (sidebarIndex, subIndex, field, value) => {
    const updatedSidebars = [...sidebars];
    updatedSidebars[sidebarIndex].subItem[subIndex][field] = value;
    setSidebars(updatedSidebars);
  };

  const handleSave = () => {
    const newSidebar = { role, sidebar: sidebars };
    onSave(newSidebar);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Create New Sidebar</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Role</Label>
            <Input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter Role" />
          </FormGroup>

          <Label>Sidebar Items</Label>
          {sidebars.map((sidebar, index) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6>Item {index + 1}</h6>
                <i className="bx bx-x text-white cursor-pointer bg-danger p-2 rounded" onClick={() => handleRemoveSidebarItem(index)}></i>
              </div>
              
              <FormGroup>
                <Label>Label</Label>
                <Input
                  type="text"
                  value={sidebar.label}
                  placeholder="Enter Item Label"
                  onChange={(e) => handleSidebarChange(index, "label", e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Icon</Label>
                <IconSelector 
                  selectedIcon={sidebar.icon} 
                  setSelectedIcon={(icon) => handleSidebarChange(index, "icon", icon)} 
                />
              </FormGroup>

              {sidebar.subItem.length === 0 && (
                <FormGroup>
                  <Label>URL</Label>
                  <Input
                    type="text"
                    value={sidebar.url}
                    placeholder="Enter URL"
                    onChange={(e) => handleSidebarChange(index, "url", e.target.value)}
                  />
                </FormGroup>
              )}

              <Label className="me-2">Sub Items</Label>
              <i className="bx bx-plus cursor-pointer bg-primary text-white p-2 ml-2 rounded" onClick={() => handleAddSubItem(index)}></i>
              {sidebar.subItem.map((sub, subIndex) => (
                  <div key={subIndex} className="mb-2 d-flex align-items-center gap-2">
                  <span style={{ fontWeight: "bolder" }}>{subIndex + 1}</span>
                  <Input
                    type="text"
                    value={sub.sublabel}
                    placeholder="Sub-Item Label"
                    onChange={(e) => handleSubItemChange(index, subIndex, "sublabel", e.target.value)}
                  />
                  <Input
                    type="text"
                    value={sub.link}
                    placeholder="Sub-Item Link"
                    onChange={(e) => handleSubItemChange(index, subIndex, "link", e.target.value)}
                  />
                  <i className="bx bx-x text-white cursor-pointer bg-danger p-2 rounded" onClick={() => handleRemoveSubItem(index, subIndex)}></i>
                </div>
              ))}

            </div>
          ))}
          <i className="bx bx-plus cursor-pointer bg-primary text-white p-2 rounded" onClick={handleAddSidebarItem}></i>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSave}>Create</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default SidebarCreateModal;
