import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axiosInstance from '../utils/axiosInstance';
import { updateCrmUserPassword } from '../apiServices/service';

const ChangePasswordModal = ({ isOpen, toggle, authUser, role, mainUsers, crmUsers }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const passwordData = {
      password,
      newPassword,
    };

    try {
      if (mainUsers.includes(role)) {
        const response = await axiosInstance.put(
          `${process.env.REACT_APP_URL}/auth/updatePassword/${authUser?.response?._id}`,
          passwordData
        );
        toast.success(response?.data?.message || 'Password updated successfully');
        resetForm();
        toggle();
      } else if (crmUsers.includes(role)) {
        const response = await updateCrmUserPassword(passwordData);
        if (response?.status === 200) {
          toast.success(response.message || 'Password updated successfully');
          resetForm();
          toggle();
        } else {
          toast.success(response.message || 'Failed to update password');
        }
      } else {
        toast.error('Unauthorized to update password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password.');
    }
  };

  const resetForm = () => {
    toggle();
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Change Password</ModalHeader>
      <ModalBody>
        <Form onSubmit={handlePasswordChange}>
          <FormGroup className='position-relative'>
            <Label for="password">Old Password</Label>
            <Input
              type={show.password ? 'text' : 'password'}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your old password"
              required
            />
            <button
              className="cursor btn btn-link position-absolute end-0"
              style={{ top: '74%', transform: 'translateY(-50%)' }}
              onClick={() =>
                setShow((prevState) => ({ ...prevState, password: !prevState.password }))
              }
              type="button"
            >
              <i className={`mdi mdi-eye${show.password ? '-off' : ''}`}></i>
            </button>
          </FormGroup>

          <FormGroup className='position-relative'>
            <Label for="newPassword">New Password</Label>
            <Input
              type={show.newPassword ? 'text' : 'password'}
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
            <button
              className="cursor btn btn-link position-absolute end-0"
              style={{ top: '74%', transform: 'translateY(-50%)' }}
              onClick={() =>
                setShow((prevState) => ({ ...prevState, newPassword: !prevState.newPassword }))
              }
              type="button"
            >
              <i className={`mdi mdi-eye${show.newPassword ? '-off' : ''}`}></i>
            </button>
          </FormGroup>

          <FormGroup className='position-relative'>
            <Label for="confirmPassword">Confirm New Password</Label>
            <Input
              type={show.confirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
            />
            <button
              className="cursor btn btn-link position-absolute end-0"
              style={{ top: '74%', transform: 'translateY(-50%)' }}
              onClick={() =>
                setShow((prevState) => ({ ...prevState, confirmPassword: !prevState.confirmPassword }))
              }
              type="button"
            >
              <i className={`mdi mdi-eye${show.confirmPassword ? '-off' : ''}`}></i>
            </button>
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={handlePasswordChange}>
          Submit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChangePasswordModal;
