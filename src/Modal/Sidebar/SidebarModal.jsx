import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from "reactstrap";
import IconSelector from "../../components/IconSelector";

const SidebarModal = ({ isOpen, toggle, role, sidebarItem, subItem, onSave }) => {
  const [label, setLabel] = useState("");
  const [icon, setIcon] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (subItem) {
      setLabel(subItem.sublabel || "");
      setUrl(subItem.link || "");
      setIcon("");
    } else if (sidebarItem) {
      setLabel(sidebarItem.label || "");
      setIcon(sidebarItem.icon || "");
      setUrl(sidebarItem.url || "");
    } else {
      setLabel("");
      setIcon("");
      setUrl("");
    }
  }, [sidebarItem, subItem, isOpen]);

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
        <Button color="primary" onClick={handleSaveClick}>Save</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default SidebarModal;
