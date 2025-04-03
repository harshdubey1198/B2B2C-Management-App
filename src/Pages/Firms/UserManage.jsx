import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Input } from "reactstrap";
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
  const [searchQuery, setSearchQuery] = useState("");
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

  const clientAdminRoles = ["firm_admin", "accountant", "employee"];
  const firmAdminRoles = ["accountant", "employee"];

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
        <div className="d-flex mb-1" style={{justifyContent:"flex-end" , gap:"15px"}}>
          <Input
              type="text"
              placeholder="Search Users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "250px", maxHeight: "32px", fontSize: "14px" }}
            />
          <i className="bx bx-refresh bx-lg" style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", backgroundColor:"lightblue" , padding:"2px",marginLeft:"5px" , borderRadius:"5px" }} onClick={() => setTrigger((prev) => prev + 1)}></i>
          <i className="bx bx-plus bx-lg" style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer", backgroundColor:"lightblue" , padding:"2px",marginLeft:"5px" , borderRadius:"5px" }} onClick={toggleModal}></i>
          {authuser?.response.role === "client_admin" && (
            <FirmSwitcher
            selectedFirmId={selectedFirmId}
            onSelectFirm={setSelectedFirmId} 
            />
          )}
        </div>
        <Col lg={12}>
          <Card>
            <CardBody className="p-0 m-0">
              
                <UserTable selectedFirmId={selectedFirmId} trigger={trigger} searchQuery={searchQuery} />
             
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
