import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import UserTable from "../../components/FirmComponents/userTable";
import ClientUserCreateForm from "../../components/FirmComponents/clientUserForm";
import FirmUserCreateForm from "../../components/FirmComponents/firmUserForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirmSwitcher from "./FirmSwitcher";

function UserManage() {
  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [firms, setFirms] = useState([]);
  const [defaultFirm, setDefaultFirm] = useState(null);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const [trigger, setTrigger] = useState(0);

  const [formValues, setFormValues] = useState({
    adminId:"",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    emergencyContact: "",
    // address: [],
    birthday: "",
    role: "",
  });

  const clientAdminRoles = ["firm_admin", "accountant", "g_emp"];
  const firmAdminRoles = ["accountant", "g_emp"];

  useEffect(() => {
    if (selectedFirmId && firms.length > 0) {
      const selectedFirm = firms.find((firm) => firm.fuid === selectedFirmId) || "";
      localStorage.setItem(
        "defaultFirm",
        JSON.stringify({
          firmId: selectedFirm._id,
          fuid: selectedFirmId,
          name: selectedFirm.firmName,
        })
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        firmId: selectedFirm._id,
        firmUniqueId: selectedFirm.fuid,
        firmName: selectedFirm.firmName,
      }));
    }
  }, [selectedFirmId, firms]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const availableRoles =
    authuser.response.role === "client_admin"
      ? clientAdminRoles
      : firmAdminRoles;

  return ( 
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="aaMOBee" breadcrumbItem="Firm Users" />
        <div className="d-flex justify-content-between mb-4">
          <p className="mm-active">
            This is the user management page. Here you can manage users.
          </p>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <Button color="primary" onClick={toggleModal}>
            Add User
          </Button>
          {authuser?.response.role === "client_admin" && (
            <FirmSwitcher
            selectedFirmId={selectedFirmId}
            onSelectFirm={setSelectedFirmId}
            />
          )}
        </div>
        <Col lg={12}>
          <Card>
            <CardBody>
              
                <UserTable selectedFirmId={selectedFirmId} trigger={trigger} />
             
            </CardBody>
          </Card>
        </Col>
      </div>
      {authuser?.response.role === "client_admin" && (
        <ClientUserCreateForm
          isOpen={modalOpen}
          toggle={toggleModal}
          // firms={firms}
          selectedFirmId={selectedFirmId}
          setTrigger={setTrigger}
          setSelectedFirmId={setSelectedFirmId}
          defaultFirm={defaultFirm}
          formValues={formValues}
          setFormValues={setFormValues}
          availableRoles={availableRoles}
        />
      )}
      {authuser?.response.role === "firm_admin" && (
        <FirmUserCreateForm
          isOpen={modalOpen}
          toggle={toggleModal}
          firms={firms}
          selectedFirmId={selectedFirmId}
          setTrigger={setTrigger}
          setSelectedFirmId={setSelectedFirmId}
          defaultFirm={defaultFirm}
          formValues={formValues}
          setFormValues={setFormValues}
          availableRoles={availableRoles}
        />
      )}
      <ToastContainer />
    </React.Fragment>
  );
}

export default UserManage;
