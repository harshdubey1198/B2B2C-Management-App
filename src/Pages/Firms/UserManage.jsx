import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FirmSwitcher from "./FirmSwitcher";
import axios from "axios";
import UserTable from "../../components/FirmComponents/userTable";
import ClientUserCreateForm from "../../components/FirmComponents/clientUserForm";
import FirmUserCreateForm from "../../components/FirmComponents/firmUserForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


function UserManage() {
  const [selectedFirmId, setSelectedFirmId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [firms, SetFirms] = useState([]);
  const [defaultFirm, setDefaultFirm] = useState();
  const authuser = JSON.parse(localStorage.getItem("authUser"));

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
        .get(`${process.env.REACT_APP_URL}/clientadmin/getFirms/${authuser?.response._id}`)
        .then((response) => {
          const firmsData = response || [];
          SetFirms(firmsData);
          if (firmsData.length > 0) {
            const firstFirm = firmsData[0]; 
            setDefaultFirm(firstFirm);
            setSelectedFirmId(firstFirm.fuid);
            setFormValues((prevValues) => ({
              ...prevValues,
              firmId: firstFirm._id,
              firmUniqueId: firstFirm.fuid,
              firmName: firstFirm.firmName,
            }));
          }
        })
        .catch((error) => {
          console.log(error, "error getting firms");
          // toast.error("Failed to fetch firms data");
        });
      // console.log("Auth User Role:", authuser?.response.role);
    }

    const storedDefaultFirm = JSON.parse(localStorage.getItem("defaultFirm"));
    if (storedDefaultFirm && storedDefaultFirm.fuid) {
      setDefaultFirm(storedDefaultFirm);
      setSelectedFirmId(storedDefaultFirm.fuid);
      setFormValues((prevValues) => ({
        ...prevValues,
        firmId: storedDefaultFirm.firmId,
        firmUniqueId: storedDefaultFirm.fuid,
        firmName: storedDefaultFirm.name,
      }));
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
          {authuser.response.role === "client_admin" && (
            <FirmSwitcher
              selectedFirmId={selectedFirmId}
              onSelectFirm={setSelectedFirmId}
            />
          )}
        </div>
        <Col lg={12}>
          <Card>
            <CardBody>
              <UserTable selectedFirmId={selectedFirmId} />
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
      )}  <ToastContainer />
    </React.Fragment>
  );
}

export default UserManage;
