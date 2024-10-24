import React, { useState ,useEffect} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const BrandModal = ({ isOpen,onBrandAdded, toggle}) => {
  const [brand, setBrand] = useState({ name: "", description: "", website: "", country: "" });
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const authuser = JSON.parse(localStorage.getItem("authUser")).response;
  const userId = authuser._id;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    const formReset = () => {
    setBrand({ name: "", description: "", website: "", country: "" });
    };

    const handleSubmit = async () => {
        if (!brand.name) {
          toast.error("Please enter the brand name.");
          return;
        }
      
        setLoading(true);
        try {
          const response = await axiosInstance.post(
            `${process.env.REACT_APP_URL}/brand/create-brand/${userId}`,
            brand
          );
          setBrands((prevBrands) => [...prevBrands, response.data]);
          toast.success("Brand added successfully.");
          toggle();
          formReset();
        } catch (error) {
          if (error.response && error.response && error.response.error) {

            toast.error(error.response.error);
          } else {
            // Fallback for other errors
            console.log(error);
            toast.error("Failed to add brand.");
          }
        } finally {
          setLoading(false);
        }
      };
      




  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand.name);
  };

  const handleBrandAdded = (newBrand) => {
    setBrands((prevBrands) => [...prevBrands, newBrand]);
    setSelectedBrand(newBrand.name); 
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Brand</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="name">Brand Name</Label>
          <Input type="text" id="name" name="name" value={brand.name} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" id="description" name="description" value={brand.description} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="website">Website</Label>
          <Input type="text" id="website" name="website" value={brand.website} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="country">Country</Label>
          <Input type="text" id="country" name="country" value={brand.country} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Brand"}
        </Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default BrandModal;
