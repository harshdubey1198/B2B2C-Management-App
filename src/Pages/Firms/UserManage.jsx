import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import UserTable from "../../components/FirmComponents/userTable";
import ClientUserCreateForm from "../../components/FirmComponents/clientUserForm";
import FirmUserCreateForm from "../../components/FirmComponents/firmUserForm";
import { toast, ToastContainer } from "react-toastify";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "react-toastify/dist/ReactToastify.css";

function UserManage() {
  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [firms, setFirms] = useState([]);
  const [defaultFirm, setDefaultFirm] = useState(null);
  const authuser = JSON.parse(localStorage.getItem("authUser"));
  const [trigger, setTrigger] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    firmUniqueId: "",
    firmName: "",
    firmId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    emergencyContact: "",
    address: "",
    dob: "",
    role: "",
    permissions: [],
    restrictions: "",
  });

  const clientAdminRoles = ["firm_admin", "accountant", "g_emp"];
  const firmAdminRoles = ["accountant", "g_emp"];

  useEffect(() => {
    if (authuser?.response.role === "client_admin") {
      axios
        .get(`https://b2b2c-management-app.onrender.com/api/clientadmin/getFirms/${authuser?.response._id}`)
        .then((response) => {
          const firmsData = response || [];
          setFirms(firmsData);
          // Removed default firm selection here
        })
        .catch((error) => {
          console.log(error, "error getting firms");
        });
    }
  }, []);

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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggleDropdown}
              style={{ width: "150px" }}
            >
              <DropdownToggle
                style={{ backgroundColor: "#0bb197", width: "140px" }}
              >
                <span style={{ marginRight: "10px" }}>
                  {firms.find((firm) => firm.fuid === selectedFirmId)
                    ?.firmName || "Select Firm"}
                </span>
                {dropdownOpen ? (
                  <i className="mdi mdi-chevron-up"></i>
                ) : (
                  <i className="mdi mdi-chevron-down"></i>
                )}
              </DropdownToggle>
              <DropdownMenu>
                {firms.map((firm) => (
                  <DropdownItem
                    key={firm._id}
                    onClick={() => setSelectedFirmId(firm.fuid)}
                    active={firm.fuid === selectedFirmId}
                  >
                    <img
                      src={firm.avatar}
                      alt={firm.firmName}
                      className="img-fluid"
                      style={{ maxWidth: "30px", marginRight: "10px" }}
                    />
                    {firm.firmName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <Col lg={12}>
          <Card>
            <CardBody>
              {selectedFirmId ? (
                <UserTable selectedFirmId={selectedFirmId} trigger={trigger} />
              ) : (
                <p>Please select a firm to view its users.</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </div>
      {authuser?.response.role === "client_admin" && (
        <ClientUserCreateForm
          isOpen={modalOpen}
          toggle={toggleModal}
          firms={firms}
          selectedFirmId={selectedFirmId}
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
