import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { saveAs } from "file-saver";
import TaskAssigner from "../../Modal/crm-modals/taskAssigner";
import { getAllLeads, getLeadById, updateLeadById, deleteLeadById, deleteMultipleLeads, exportLeads } from "../../apiServices/service";
import LeadDetailsModal from "../../Modal/crm-modals/leadDetailsModal";
import { useNavigate } from "react-router-dom";
import LeadImportModal from "../../Modal/crm-modals/leadImportModal";  
import { toast } from "react-toastify";
import { getRole } from "../../utils/roleUtils";

function AllLeads() {
    const navigate = useNavigate();
    const [assignModal, setAssignModal] = useState(false);
    const [leads, setLeads] = useState([]);
    const [importModal, setImportModal] = useState(false);
    const [filteredLeads, setFilteredLeads] = useState(false);
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [filterOptions, setFilterOptions] = useState({
        sortBy: "name",
        order: "asc",
    });
    const role = JSON.parse(localStorage.getItem('authUser'))?.response?.role;
    // console.log(role, "role")
    useEffect(() => {
        getRole();
    }, []);

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
    const toggleImportModal = () => setImportModal(!importModal);

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
    const handleSelectAll = () => {
        const unassignedLeads = leads.filter((lead) => lead.status !== "Assigned");
        if (selectedLeads.length === unassignedLeads.length) {
            // console.log("Deselecting all unassigned leads");
            setSelectedLeads([]);
        } else {
            const updatedLeads = unassignedLeads.map((lead) => lead._id);
            setSelectedLeads(updatedLeads);
            // console.log("Selected Leads:", updatedLeads);
        }
    };

    const handleDeleteLeads = async (leadId) => {
        if (leadId) {
            try {
                const result = await deleteLeadById([leadId]);
                setMessage(result.message);
                toast.success(result.message);
                fetchLeads();
            } catch (error) {
                setMessage(error.message);
            }
        } else {
            if (selectedLeads.length === 0) {
                setMessage("Please select leads to delete.");
                toast.error("Please select leads to delete.");
                return;
            }
            try {
                const result = await deleteMultipleLeads({ leadIds: selectedLeads });
                setMessage(result.message);
                toast.success(result.message);
                fetchLeads();
                setSelectedLeads([]);
            } catch (error) {
                setMessage(error.message);
                toast.error(error.message);
            }
        }
    };

    const handleUpdateLead = async (updatedLead) => {
        try {
            const result = await updateLeadById(updatedLead._id, updatedLead);
            setMessage(result.message);
            toast.success(result.message);
            fetchLeads();
            setModal(false);
        } catch (error) {
            setMessage(error.message);
        }
    };
    // console.log(selectedLeads, "seletecdleads")
    const handleExportLeads = async () => {
        if (selectedLeads.length === 0) {
            setMessage("Please select leads to export.");
            toast.error("Please select leads to export.");
            return;
        }
        try {
            const result = await exportLeads({ leadIds: selectedLeads });
            const blob = new Blob([result], { type: "text/csv" });
            
            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
            const formattedTime = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}`;
            const filename = `Lead-data_${formattedDate}_${formattedTime}.csv`;
            
            saveAs(blob, filename);
            setMessage("Leads exported successfully.");
            toast.success("Leads exported successfully.");
        } catch (error) {
            setMessage(error);
            toast.error(error);
        }
    };
    
    useEffect(() => {
        fetchLeads(); 
    }, []);
    const handleFilterChange = (field, value) => {
        setFilterOptions((prev) => ({ ...prev, [field]: value }));
    };
    const applyFilters = () => {
        let filteredLeads = [...leads];
    
        // Apply Search Filter
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filteredLeads = filteredLeads.filter((lead) => {
                const name = `${lead.firstName} ${lead.lastName}`.toLowerCase();
                const email = lead.email?.toLowerCase();
                const status = lead.status?.toLowerCase();
    
                return (
                    name.includes(term) ||
                    email?.includes(term) ||
                    status?.includes(term)
                );
            });
        }
    
        // Sorting Logic (unchanged)
        if (filterOptions.sortBy === "name") {
            filteredLeads.sort((a, b) => {
                const nameA = a.firstName.toLowerCase();
                const nameB = b.firstName.toLowerCase();
                return filterOptions.order === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });
        } else if (filterOptions.sortBy === "date") {
            filteredLeads.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return filterOptions.order === "asc" ? dateA - dateB : dateB - dateA;
            });
        } else if (filterOptions.sortBy === "status") {
            filteredLeads.sort((a, b) => {
                const statusA = a.status.toLowerCase();
                const statusB = b.status.toLowerCase();
                return filterOptions.order === "asc" ? statusA.localeCompare(statusB) : statusB.localeCompare(statusA);
            });
        }
    
        setFilteredLeads(filteredLeads);
    };
    
    // const applyFilters = () => {
    //     let sortedLeads = [...leads];
    //     if (filterOptions.sortBy === "name") {
    //         sortedLeads.sort((a, b) => {
    //             const nameA = a.firstName.toLowerCase();
    //             const nameB = b.firstName.toLowerCase();
    //             return filterOptions.order === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    //         });
    //     } else if (filterOptions.sortBy === "date") {
    //         sortedLeads.sort((a, b) => {
    //             const dateA = new Date(a.createdAt);
    //             const dateB = new Date(b.createdAt);
    //             return filterOptions.order === "asc" ? dateA - dateB : dateB - dateA;
    //         });
    //     } else if (filterOptions.sortBy === "status") {
    //         sortedLeads.sort((a, b) => {
    //             const statusA = a.status.toLowerCase();
    //             const statusB = b.status.toLowerCase();
    //             return filterOptions.order === "asc" ? statusA.localeCompare(statusB) : statusB.localeCompare(statusA);
    //         });
    //     }
    //     setFilteredLeads(sortedLeads);
    // };
    // useEffect(() => {
    //     applyFilters();
    // }, [filterOptions, leads]);
    useEffect(() => {
        applyFilters();
    }, [searchTerm, filterOptions, leads]);
    
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="CRM" breadcrumbItem="All Leads" />
                <div className="button-panel">

                    { (role === "firm_admin" || role === "ASM") && (
                        <>
                            <Button color="primary" onClick={() => navigate("/crm/create-lead")}> Add Lead </Button>
                            <Button color="primary" onClick={toggleImportModal}> Import Leads </Button>
                            <Button color="primary" onClick={handleExportLeads}> Export Leads </Button>
                        </>
                      )}
                    { (role === "firm_admin") && (
                        <Button color="primary" onClick={() => handleDeleteLeads(null)}> Delete Selected Leads </Button>
                       )
                      }
                    { (role === "ASM" || role === "SM" ) && (
                        <Button color="primary" onClick={toggleAssignModal}> Assign Leads </Button>
            )    
                }

                {/* { role ==="ASM" && (
                    <Button color="primary" onClick={toggleAssignModal}> Assign Leads </Button> 
                )} */}
                </div>
                <div className="search-bar mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name, Email, or Status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "300px", display: "inline-block", marginRight: "10px" }}
                    />
                </div>

                <div className="filter-panel" style={{ float: "right", marginTop: "-50px", position: "relative" }}>
                    <i
                        className="mdi mdi-filter"
                        style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            padding: "5px 7px",
                            border: "1px solid #ccc",
                        }}
                        onClick={toggleFilterDropdown}
                    ></i>
                    {showFilterDropdown && (
                        <div
                            className="dropdown-menu show"
                            style={{
                                position: "absolute",
                                right: "0",
                                top: "40px",
                                zIndex: 1050,
                                display: "block",
                            }}
                        >
                            <div className="p-3">
                                <label>Sort By:</label>
                                <select
                                    value={filterOptions.sortBy}
                                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                                    className="form-control"
                                >
                                    <option value="name">Name</option>
                                    <option value="date">Date</option>
                                    <option value="status">Status</option>
                                </select>
                                <label className="mt-2">Order:</label>
                                <select
                                    value={filterOptions.order}
                                    onChange={(e) => handleFilterChange("order", e.target.value)}
                                    className="form-control"
                                >
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                {/* <input
                                    type="checkbox"
                                    onClick={() => {
                                        const unassignedLeads = leads.filter((lead) => lead.status !== "Assigned");
                                        if (selectedLeads.length === unassignedLeads.length) {
                                        console.log("Deselecting all unassigned leads");
                                        setSelectedLeads([]);
                                    } else {
                                        console.log("Selecting all unassigned leads");
                                        setSelectedLeads(unassignedLeads.map((lead) => lead._id));
                                        console.log(selectedLeads);
                                        }
                                    }}
                                    /> */}
                                    <input
                                        type="checkbox"
                                        onClick={handleSelectAll}
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
                            {Array.isArray(filteredLeads) && filteredLeads.length > 0 ? (
                                filteredLeads.map((lead) => (
                                    <tr key={lead._id}>
                                        <td>
                                            {lead.status !== "Assigned" && (
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLeads.includes(lead._id)}
                                                    onClick={() => handleLeadSelection(lead._id)}
                                                />
                                            )}
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        No leads found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {/* {message && <p className="text-danger">{message}</p>} */}

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
                <LeadImportModal isOpen={importModal} toggle={toggleImportModal} />
            </div>
        </React.Fragment>
    );
}

export default AllLeads;