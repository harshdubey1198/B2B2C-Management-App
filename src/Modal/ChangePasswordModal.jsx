import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axiosInstance from '../utils/axiosInstance';

const ChangePasswordModal = ({ isOpen, toggle, authUser }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await axiosInstance.put(
        `${process.env.REACT_APP_URL}/auth/changePassword/${authUser._id}`,
        { oldPassword, newPassword }
      );
      toast.success(response?.data?.message || 'Password changed successfully!');
      toggle();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Change Password</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="oldPassword">Old Password</Label>
            <Input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm New Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
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
