import React, { useEffect } from 'react'
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

function BomCreateModal ({ isOpen,toggle,  setSellingPrice, toggleBomModal, formData, setFormData, categories, subCategories, vendors, brands, taxes, items, setItems, setBomModal , fetchSubCategories, fetchItems, fetchBrands, fetchVendors, fetchTaxes, fetchCategories, fetchBoms, handleMaterialChange, handleVariantChange, addMaterialField, addVariantField, removeMaterialField, removeVariantField, saveBom , calculateTotalCostPrice }) {
  useEffect(() => {
    // it must be number not the string    
    // setSellingPrice(formData.sellingPrice);
    setFormData({ ...formData, sellingPrice: Number(formData.sellingPrice) });

  }, [formData.qtyType, formData.rawMaterials, formData.sellingPrice, formData.tax, formData.vendor, formData.brand, formData.subCategoryId, formData.categoryId]);
  
  console.log("FormData's Selling Price", formData.sellingPrice);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggleBomModal}>Add BOM</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
          <FormGroup>
          <Label for="productName">BOM Name</Label>
          <Input
              id="productName"
              placeholder='Enter Product Name'
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          />
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
          <Label for="category">Category</Label>
          <Input
              type="select"
              value={formData.categoryId}
              onChange={(e) => {
                const selectedCategory = e.target.value;
                setFormData({ ...formData, categoryId: selectedCategory });
                fetchSubCategories(selectedCategory);
              }}
            >
              <option value="">Select Category</option>
              {categories.length > 0 ? (
              categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                  </option>
              ))
              ) : (
              <option disabled>No categories available</option>
              )}
          </Input>
          </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="subCategory">Sub Category</Label>
              <Input
                type="select"
                value={formData.subCategoryId}
                onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value })}
              >
                <option value="">Select Subcategory</option>
                {subCategories.length > 0 ? (
                  subCategories.map((subCat) => (
                    <option key={subCat._id} value={subCat._id}>
                      {subCat.categoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>No subcategories available</option>
                )}
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
          <FormGroup>
          <Label for="vendor">Vendor</Label>
          <Input
              type="select"
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
          >
              <option value="">Select Vendor</option>
              {vendors.length > 0 ? (
              vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                  {vendor.name}
                  </option>
              ))
              ) : (
              <option disabled>No vendors available</option>
              )}
          </Input>
          </FormGroup>
          </Col>
          <Col md={3}>
          <FormGroup>
          <Label for="brand">Brand</Label>
          <Input
              type="select"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          >
              <option value="">Select Brand</option>
              {brands.length > 0 ? (
              brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                  {brand.name}
                  </option>
              ))
              ) : (
              <option disabled>No brands available</option>
              )}
          </Input>
          </FormGroup>
          </Col>
          <Col md={3}>
          <FormGroup>
            <Label for="qtyType">Qty Type</Label>
            <Input
              type="select"
              value={formData.qtyType}
              onChange={(e) => setFormData({ ...formData, qtyType: e.target.value })}
            >
              <option value="">Select Qty Type</option>
              <option value="pcs">Pieces</option>
              <option value="grams">Gm</option>
              <option value="kg">Kg</option>
              <option value="centimeters">Centimeter</option>
              <option value="feet">Feet</option>
              <option vlaue="meters">Meters</option>
              <option value="litre">Litre</option>
            </Input>
          </FormGroup>
          </Col>
          <Col md={3}>
            <Label for="estimatedCost">Estimated Cost</Label>
            <Input
              type="number"
              value={calculateTotalCostPrice()}
              disabled
            />
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="sellingPrice">Selling Price</Label>
              {/* <Input
                type="text"
                onChange={(e) => setSellingPrice(e.target.value)}
              /> */}
               <Input 
              type="number" 
              value={formData.sellingPrice || 0} 
              onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
            />
            </FormGroup>
          </Col>
          
          <Col md={3}>
            <FormGroup>
              <Label for="tax">Tax Selection</Label>
              <Input
                type="select"
                value={formData.tax}
                onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
              >
                <option value="">Select Tax</option>
                {taxes.length > 0 ? (
                  taxes.map((tax) => (
                    <option key={tax._id} value={tax._id}>
                      {tax.taxName}
                    </option>
                  ))
                ) : (
                  <option disabled>No taxes available</option>
                )}
              </Input>
            </FormGroup>
          </Col>
        </Row>
          <h6 className="text-primary">Materials</h6>
          {formData.rawMaterials.map((material, materialIndex) => (
              <Row key={materialIndex} className="mb-3">
                  <Col md={3}>
                  <Label>Material</Label>
                  <Input
                      type="select"
                      value={material.itemId}
                      onChange={(e) => handleMaterialChange(materialIndex, 'itemId', e.target.value)}
                    >
                      <option value="">Select Material</option>
                      {items.length > 0 ? (
                        items.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name} - {item.qtyType}
                             {/* {item.variants?.length > 0 && (
                              <span className="text-muted">✅</span>
                            )} */}
                          </option>
                        ))
                      ) : (
                        <option disabled>No items available</option>
                      )}
                    </Input>

                  </Col>
                  {/* if variant in the item doesn't exist we will see this quantity for the item  */}
                  {!items.find((item) => item._id === material.itemId)?.variants.length > 0 && (
                    <Col md={2}>
                      <Label>Quantity</Label>
                      <Input
                        type="text"
                        placeholder='Enter Quantity'
                        value={material.quantity}
                        onChange={(e) => {
                          const newValue = Math.max(0, Number(e.target.value)); 
                          handleMaterialChange(materialIndex, 'quantity', newValue);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === '-' || e.key === 'e') {
                            e.preventDefault(); 
                          }
                        }}                              
                      />
                    </Col>
                  )}
                  
                  <Col md={2}>
                  <Label>Waste (%)</Label>
                  <Input
                      type="number"
                      value={material.wastePercentage}
                      onChange={(e) => handleMaterialChange(materialIndex, 'wastePercentage', e.target.value)}
                  />
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    <i className='bx bx-trash' style={{fontSize: '1.5rem', marginTop:'29px', cursor: 'pointer'}} onClick={() => removeMaterialField(materialIndex)}></i>
                  </Col>
                  <Col md={12} className="mt-2">
                  {material.variants?.map((variant, variantIndex) => (
                    <Row key={variantIndex} className="mb-2">
                      <h6 className="text-primary">Variants</h6>
                      <Col md={3}>
                          <Label>Variant</Label>
                          <Input
                          type="select"
                          value={variant.variantId}
                          onChange={(e) =>
                                
                            handleVariantChange(materialIndex, variantIndex, 'variantId', e.target.value)
                            
                          }
                          >
                          <option value="">Select Variant</option>
                          {items
                              .find((item) => item._id === material.itemId)
                              ?.variants.map((v) => (
                              <option key={v._id} value={v._id}>
                                  {v.optionLabel} - {v.stock} Qty
                              </option>
                              ))}
                          </Input>
                      </Col>
                      <Col md={2}>
                          <Label>Quantity</Label>
                          <Input
                            type="text"
                            value={variant.quantity}
                            onChange={(e) => {
                              const newValue = Math.max(   Number(e.target.value));
                              handleVariantChange(materialIndex, variantIndex, 'quantity', newValue);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === '-' || e.key === 'e') {
                                e.preventDefault(); 
                              }
                            }}
                          />

                      </Col>
                      <Col md={2}>
                          <Label>Waste (%)</Label>
                          <Input
                          type="number"
                          value={variant.wastePercentage}
                          onChange={(e) =>
                              handleVariantChange(materialIndex, variantIndex, 'wastePercentage', e.target.value) }
                          />
                      </Col>
                      <Col md={2}>
                        <i className='bx bx-trash' style={{fontSize: '1.5rem', marginTop:'29px', cursor: 'pointer'}} onClick={() => removeVariantField(materialIndex, variantIndex)}></i>
                      </Col>
                      </Row>
                  ))}

                  {/* variant length > 0 */}
                  {items.find((item) => item._id === material.itemId)?.variants.length > 0 && (
                    <Col md={2}>
                      <Button color="success" onClick={() => addVariantField(materialIndex)}>
                        Add Variant
                      </Button>
                    </Col>
                  )}
                  </Col>
              </Row>
              ))}
              <Button color="success" onClick={addMaterialField}>
              Add Material
              </Button>

      </ModalBody>
     <ModalFooter>
          <Button color="primary" onClick={saveBom}>
          Save
          </Button>
          <Button color="secondary" onClick={toggle}>
          Cancel
          </Button>
     </ModalFooter>
  </Modal>
  )
}

export default BomCreateModal