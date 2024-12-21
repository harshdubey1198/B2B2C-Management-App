import React, { useEffect, useState } from "react";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getAllLeads, getLeadById, assignLeadsToEmployee, updateLeadById, deleteLeadById, deleteMultipleLeads } from "../../apiServices/service"; // Add updateLeadById API call
import LeadDetailsModal from "../../Modal/crm-modals/leadDetailsModal";
import { useNavigate } from "react-router-dom";

function AllLeads() {
    const navigate = useNavigate();
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

    const handleLeadSelection = (e, leadId) => {
        if (e.target.checked) {
            setSelectedLeads([...selectedLeads, leadId]);
        } else {
            setSelectedLeads(selectedLeads.filter((id) => id !== leadId));
        }
    };

    const handleDeleteLeads = async (leadId) => {
        if (leadId) {
            // Single lead deletion
            try {
                const result = await deleteLeadById([leadId]);
                setMessage(result.message);
                fetchLeads(); // Refresh leads after deletion
            } catch (error) {
                setMessage(error.message);
            }
        } else {
            // Bulk deletion
            if (selectedLeads.length === 0) {
                setMessage("Please select leads to delete.");
                return;
            }
            try {
                const result = await deleteMultipleLeads({ leadIds: selectedLeads });
                setMessage(result.message);
                fetchLeads(); // Refresh leads after deletion
                setSelectedLeads([]); // Reset selected leads
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
            setSelectedLeads([]); // Reset selected leads after assignment
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleUpdateLead = async (updatedLead) => {
        try {
            const result = await updateLeadById(updatedLead._id, updatedLead);
            setMessage(result.message);
            fetchLeads(); // Refresh the leads list after update
            setModal(false); // Close the modal
        } catch (error) {
            setMessage(error.message);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="CRM" breadcrumbItem="All Leads" />
                <div className="button-panel">
                    <button className="btn btn-primary" onClick={() => navigate('/crm/create-lead')}>Add Lead</button>
                    <button className="btn btn-primary">Import Leads</button>
                    <button className="btn btn-primary">Export Leads</button>
                    <button className="btn btn-primary" onClick={() => handleDeleteLeads(null)}> Delete Selected Leads </button>
                </div>
                {/* <div className="bulk-action">
                </div> */}
                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" onChange={(e) => {
                                        const checked = e.target.checked;
                                        setSelectedLeads(checked ? leads.map((lead) => lead._id) : []);
                                    }} />
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Platform</th>
                                <th>Organic</th>
                                <th>Ad. data</th>
                                <th>Created/Updated</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, index) => (
                                <tr key={lead._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedLeads.includes(lead._id)}
                                            onChange={(e) => handleLeadSelection(e, lead._id)}
                                        />
                                    </td>
                                    <td>{lead.firstName + " " + lead.lastName}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.phoneNumber}</td>
                                    <td>{lead.platform}</td>
                                    <td>{lead.isOrganic ? "yes" : "no"}</td>
                                    <td>{lead.adId}<br />{lead.adName}</td>
                                    <td>
                                        {new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}
                                        <br />
                                        {new Date(lead.updatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}
                                    </td>
                                    <td>{lead.status}</td>
                                    <td>
                                        <i className="bx bx-show" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => toggleModal(lead._id, "view")} ></i>
                                        <i className="bx bx-edit" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => toggleModal(lead._id, "edit")} ></i>
                                        <i className="bx bx-trash" style={{ fontSize: "22px", fontWeight: "bold", cursor: "pointer" }} onClick={() => handleDeleteLeads(lead._id)} ></i>
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
                    onUpdate={handleUpdateLead} // Pass update handler
                />
            </div>
        </React.Fragment>
    );
}

export default AllLeads;
