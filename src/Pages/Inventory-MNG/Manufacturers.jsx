import React, { useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import FetchManufacturers from './fetchManufacturers';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ManufacturerModal from '../../Modal/ManufacturerModal';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const Manufacturers = () => {
  const authuser = JSON.parse(localStorage.getItem("authUser")).response;
  const firmId = authuser?.adminId;
  const [manufacturers, setManufacturers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [manufacturerToDelete, setManufacturerToDelete] = useState(null);
  const [manufacturerToEdit, setManufacturerToEdit] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleManufacturersFetched = (fetchedManufacturers) => {
    setManufacturers(fetchedManufacturers);
    console.log(fetchedManufacturers);
  };

  const handleManufacturerEdit = (manufacturer) => {
    setManufacturerToEdit(manufacturer);
    toggleModal();
  };

  const handleManufacturerDelete = (manufacturer) => {
    setManufacturerToDelete(manufacturer);
    toggleDeleteModal();
  };

  const confirmDeleteManufacturer = async () => {
    try {
      await axiosInstance.delete(`${process.env.REACT_APP_URL}/manufacturer/delete-manufacturer/${manufacturerToDelete._id}`);
      setManufacturers((prevManufacturers) => prevManufacturers.filter((m) => m._id !== manufacturerToDelete._id));
      toast.success('Manufacturer deleted successfully');
    } catch (error) {
      console.error('Error deleting manufacturer:', error);
      toast.error('Failed to delete manufacturer');
    } finally {
      toggleDeleteModal();
    }
  };

  const handleManufacturerUpdated = (updatedManufacturer) => {
    if (manufacturerToEdit) {
      setManufacturers((prevManufacturers) =>
        prevManufacturers.map((manufacturer) =>
          manufacturer._id === updatedManufacturer._id ? updatedManufacturer : manufacturer
        )
      );
    } else {
      setManufacturers((prevManufacturers) => [...prevManufacturers, updatedManufacturer]);
    }
    setManufacturerToEdit(null);
    toggleModal();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Inventory Management" breadcrumbItem="Manufacturer" />
          <FetchManufacturers onManufacturersFetched={handleManufacturersFetched} firmId={firmId} />
        </div>
        <div className='table-responsive'>
          <Table bordered className='table table-centered table-nowrap mb-0'>
            <thead className='thead-light'>
              <tr>
                <th>Title</th>
                <th>Lead</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.map((manufacturer) => (
                <tr key={manufacturer._id}>
                  <td>{manufacturer.name}</td>
                  <td>{manufacturer.contactPerson}</td>
                  <td>{manufacturer.phone}</td>
                  <td>
                    <i
                      className='bx bx-edit'
                      style={{ fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => handleManufacturerEdit(manufacturer)}
                    ></i>
                    <i
                      className='bx bx-trash'
                      style={{ fontSize: '22px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '5px' }}
                      onClick={() => handleManufacturerDelete(manufacturer)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <ManufacturerModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        manufacturerToEdit={manufacturerToEdit}
        onManufacturerUpdated={handleManufacturerUpdated}
      />

      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the manufacturer "{manufacturerToDelete?.name}"?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDeleteManufacturer}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Manufacturers;
