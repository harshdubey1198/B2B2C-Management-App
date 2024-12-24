import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TaskAssigner from "../../Modal/crm-modals/taskAssigner";
import {
    getAllLeads,
    getLeadById,
    assignLeadsToEmployee,
    updateLeadById,
    deleteLeadById,
    deleteMultipleLeads,
} from "../../apiServices/service";
import LeadDetailsModal from "../../Modal/crm-modals/leadDetailsModal";
import { useNavigate } from "react-router-dom";

function AllLeads() {
    const navigate = useNavigate();
    const [assignModal, setAssignModal] = useState(false);
    const [leads, setLeads] = useState([]);
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [employeeId, setEmployeeId] = useState("");

    const fetchLeads = async () => {
        try {
            const result = await getAllLeads();
            setLeads(result?.data?.leads || []);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const toggleModal = async (id, mode = "view") => {
        if (!modal && id) {
            setLoading(true);
            try {
                const result = await getLeadById(id);
                setSelectedLead({ ...result?.data, mode });
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setSelectedLead(null);
        }
        setModal(!modal);
    };
    const toggleAssignModal = () => setAssignModal(!assignModal);

    const handleLeadSelection = (leadId) => {
        setSelectedLeads((prevSelectedLeads) => {
            if (prevSelectedLeads.includes(leadId)) {
                // console.log("Unchecking lead:", leadId);
                return prevSelectedLeads.filter((id) => id !== leadId);
            } else {
                // console.log("Checking lead:", leadId);
                return [...prevSelectedLeads, leadId];
            }
        });
    };

    const handleDeleteLeads = async (leadId) => {
        if (leadId) {
            try {
                const result = await deleteLeadById([leadId]);
                setMessage(result.message);
                fetchLeads();
            } catch (error) {
                setMessage(error.message);
            }
        } else {
            if (selectedLeads.length === 0) {
                setMessage("Please select leads to delete.");
                return;
            }
            try {
                const result = await deleteMultipleLeads({ leadIds: selectedLeads });
                setMessage(result.message);
                fetchLeads();
                setSelectedLeads([]);
            } catch (error) {
                setMessage(error.message);
            }
        }
    };

    const handleAssignLeads = async () => {
        if (!employeeId) {
            setMessage("Please select an employee to assign leads.");
            return;
        }

        try {
            const result = await assignLeadsToEmployee({
                employeeId,
                leadIds: selectedLeads,
            });
            setMessage(result.message);
            fetchLeads();
            setSelectedLeads([]);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleUpdateLead = async (updatedLead) => {
        try {
            const result = await updateLeadById(updatedLead._id, updatedLead);
            setMessage(result.message);
            fetchLeads();
            setModal(false);
        } catch (error) {
            setMessage(error.message);
        }
    };
    // console.log(selectedLeads, "seletecdleads")

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="CRM" breadcrumbItem="All Leads" />
                <div className="button-panel">
                    <Button color="primary" onClick={() => navigate("/crm/create-lead")}>
                        Add Lead
                    </Button>
                    <Button color="primary">Import Leads</Button>
                    <Button color="primary">Export Leads</Button>
                    <Button color="primary" onClick={() => handleDeleteLeads(null)}>
                        Delete Selected Leads
                    </Button>
                    <Button color="primary" onClick={toggleAssignModal}>
                        Assign Leads
                    </Button>
                </div>
                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onClick={() => {
                                            if (selectedLeads.length === leads.length) {
                                                console.log("Deselecting all leads");
                                                setSelectedLeads([]);
                                            } else {
                                                console.log("Selecting all leads");
                                                setSelectedLeads(leads.map((lead) => lead._id));
                                            }
                                        }}
                                    />
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Platform</th>
                                <th>Organic</th>
                                <th>Ad. Data</th>
                                <th>Created/Updated</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedLeads.includes(lead._id)}
                                            onClick={() => handleLeadSelection(lead._id)}
                                        />
                                    </td>
                                    <td>{lead.firstName + " " + lead.lastName}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.phoneNumber}</td>
                                    <td>{lead.platform}</td>
                                    <td>{lead.isOrganic ? "yes" : "no"}</td>
                                    <td>{lead.adId}<br />{lead.adName}</td>
                                    <td>
                                        {new Date(lead.createdAt).toLocaleString("en-IN", {
                                            timeZone: "Asia/Kolkata",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                        <br />
                                        {new Date(lead.updatedAt).toLocaleString("en-IN", {
                                            timeZone: "Asia/Kolkata",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td>{lead.status}</td>
                                    <td>
                                        <i
                                            className="bx bx-show"
                                            style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }}
                                            onClick={() => toggleModal(lead._id, "view")}
                                        ></i>
                                        <i
                                            className="bx bx-edit"
                                            style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }}
                                            onClick={() => toggleModal(lead._id, "edit")}
                                        ></i>
                                        <i
                                            className="bx bx-trash"
                                            style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }}
                                            onClick={() => handleDeleteLeads(lead._id)}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                {message && <p className="text-danger">{message}</p>}

                <LeadDetailsModal
                    isOpen={modal}
                    toggle={() => toggleModal(null)}
                    lead={selectedLead}
                    loading={loading}
                    onUpdate={handleUpdateLead}
                />
                <TaskAssigner
                    isOpen={assignModal}
                    toggle={toggleAssignModal}
                    selectedLeads={selectedLeads}
                    fetchLeads={fetchLeads}
                />
            </div>
        </React.Fragment>
    );
}

export default AllLeads;
