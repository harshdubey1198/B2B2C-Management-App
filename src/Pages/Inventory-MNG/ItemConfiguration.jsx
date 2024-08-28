import React, { useEffect, useState } from "react";
import {  Card,  CardBody,  Col,  Button,  Modal,  ModalHeader,  ModalBody,  ModalFooter,  FormGroup,  Label,  Input,  Table,} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { mdiPencil, mdiDelete, mdiClose } from "@mdi/js";
import Icon from "@mdi/react";

function ItemConfiguration() {
  const [items, setItems] = useState([]);
  const [taxations, setTaxations] = useState([]);
  const [editingItem, setEditingItem] = useState({
    id: null,
    name: "",
    variants: [],
  });
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    const storedTaxations =
      JSON.parse(localStorage.getItem("taxationData")) || [];
    setTaxations(storedTaxations);

    const storedItems =
      JSON.parse(localStorage.getItem("inventoryItems")) || [];
    setItems(storedItems);
  }, []);

  console.log(setItems, "setitems");

  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  const handleEdit = (item) => {
    setEditingItem({
      ...item,
      variants: item.variants.map((v) => ({
        name: v.name || v,
        price: v.price || 0,
        tax: v.tax || 0,
      })),
    });
    toggleModal();
  };

  const handleSave = () => {
    if (editingItem.id) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? {
                ...editingItem,
                variants: editingItem.variants,
              }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          ...editingItem,
          id: items.length
            ? Math.max(items.map((item) => parseInt(item.id))) + 1
            : 1,
          variants: editingItem.variants,
        },
      ]);
    }
    toggleModal();
    setEditingItem({ id: null, name: "", variants: [] });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({ ...editingItem, [id]: value });
  };

  const handleVariantChange = (index, e) => {
    const { id, value } = e.target;
    const updatedVariants = [...editingItem.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [id]: id === "price" || id === "tax" ? parseFloat(value) || 0 : value,
    };
    setEditingItem({ ...editingItem, variants: updatedVariants });
  };

  const handleTaxChange = (index, e) => {
    const { value } = e.target;
    const selectedTax = taxations.find((t) => t.id === parseInt(value));
    const updatedVariants = [...editingItem.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      tax: selectedTax ? selectedTax.rate : 0,
    };
    setEditingItem({
      ...editingItem,
      variants: updatedVariants,
      taxation: selectedTax,
    });
  };

  const handleAddVariant = () => {
    setEditingItem({
      ...editingItem,
      variants: [...editingItem.variants, { name: "", price: 0, tax: 0 }],
    });
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = editingItem.variants.filter((_, i) => i !== index);
    setEditingItem({ ...editingItem, variants: updatedVariants });
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs
          title="Item Configuration"
          breadcrumbItem="Item Configuration"
        />
        <Col lg={12}>
          <Card>
            <CardBody>
              <Button
                color="primary"
                onClick={() => {
                  setEditingItem({ id: null, name: "", variants: [] });
                  toggleModal();
                }}
              >
                Add New Item
              </Button>
              <Table className="table-bordered mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Variants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 &&
                    items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <ul>
                            {Array.isArray(item.variants)
                              ? item.variants.map((variant, idx) => (
                                  <li key={idx}>
                                    {variant.name} - $
                                    {isNaN(variant.price)
                                      ? "0.00"
                                      : parseFloat(variant.price).toFixed(
                                          2
                                        )}{" "}
                                    (Tax: {variant.tax}%)
                                  </li>
                                ))
                              : "No variants"}
                          </ul>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              color="warning"
                              onClick={() => handleEdit(item)}
                              className="mr-2"
                            >
                              <Icon path={mdiPencil} size={1} />
                            </Button>
                            <Button
                              color="danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Icon path={mdiDelete} size={1} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </div>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editingItem?.id ? "Edit Item" : "Add New Item"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={editingItem?.name || ""}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Variants</Label>
            {editingItem?.variants.map((variant, index) => (
              <div
                key={index}
                className="d-flex mb-2"
                style={{ gap: "10px", alignItems: "center", height: "50px" }}
              >
                <Input
                  type="text"
                  id="variantName"
                  placeholder="Variant Name"
                  value={variant.name || ""}
                  onChange={(e) => handleVariantChange(index, e)}
                  style={{ flex: 1 }}
                />
                <Input
                  type="number"
                  id="price"
                  placeholder="Price"
                  value={variant.price || ""}
                  onChange={(e) => handleVariantChange(index, e)}
                  style={{ flex: 1 }}
                />
                <FormGroup className="mb-0" style={{ flex: 1 }}>
                  <Label for={`tax-${index}`} style={{ marginBottom: "0" }}>
                    Tax
                  </Label>
                  <Input
                    type="select"
                    id={`tax-${index}`}
                    value={
                      taxations.find((t) => t.rate === variant.tax)?.id || ""
                    }
                    onChange={(e) => handleTaxChange(index, e)}
                    style={{ flex: 1, height: "calc(100% - 2px)" }} // Adjust height to match other inputs
                  >
                    <option value="">Select Tax</option>
                    {taxations.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.name} ({tax.rate}%)
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <Button
                  color="danger"
                  onClick={() => handleRemoveVariant(index)}
                  // style={{
                  //   padding: "0.5rem",
                  //   minWidth: "2rem",
                  //   fontSize: "1rem",
                  // }}
                >
                  <Icon path={mdiClose} size={1} />
                </Button>
              </div>
            ))}
            <Button color="success" onClick={handleAddVariant}>
              Add Variant
            </Button>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            {editingItem?.id ? "Save Changes" : "Add Item"}
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default ItemConfiguration;
