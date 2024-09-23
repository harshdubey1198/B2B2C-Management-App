import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from "reactstrap";

const VariantModal = ({ modal, toggleModal, variant, handleVariantChange, addVariant }) => {
  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Add Variant</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="variationType">Variant Type</Label>
          <Input type="text" id="variationType" name="variationType" value={variant.variationType} onChange={handleVariantChange} />
        </FormGroup>
        <FormGroup>
          <Label for="optionLabel">Option Label</Label>
          <Input type="text" id="optionLabel" name="optionLabel" value={variant.optionLabel} onChange={handleVariantChange} />
        </FormGroup>
        <FormGroup>
          <Label for="priceAdjustment">Price Adjustment</Label>
          <Input type="number" id="priceAdjustment" name="priceAdjustment" value={variant.priceAdjustment} onChange={handleVariantChange} />
        </FormGroup>
        <FormGroup>
          <Label for="stock">Stock</Label>
          <Input type="number" id="stock" name="stock" value={variant.stock} onChange={handleVariantChange} />
        </FormGroup>
        <FormGroup>
          <Label for="sku">SKU</Label>
          <Input type="text" id="sku" name="sku" value={variant.sku} onChange={handleVariantChange} />
        </FormGroup>
        <FormGroup>
          <Label for="barcode">Barcode</Label>
          <Input type="text" id="barcode" name="barcode" value={variant.barcode} onChange={handleVariantChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={addVariant}>Add Variant</Button>
        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default VariantModal;
