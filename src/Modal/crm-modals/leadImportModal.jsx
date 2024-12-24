import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { uploadLeads } from "../../apiServices/service";
import { toast } from "react-toastify";

const LeadImportModal = ({ isOpen, toggle }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to import.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await uploadLeads(formData);
      if (response.status === "success") {
        toast.success("Leads imported successfully!");
        toggle();
      } else {
        throw new Error(response.message || "Failed to import leads");
      }
    } catch (error) {
      toast.error(error.message || "Error importing leads.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Import Leads</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="leadFile">Select File</Label>
            <Input
              type="file"
              name="file"
              id="leadFile"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Importing..." : "Import"}
        </Button>
        <Button color="secondary" onClick={toggle} disabled={loading}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LeadImportModal;
