import React, { useEffect } from 'react'
import {Table   } from "reactstrap"
import Breadcrumbs from '../../components/Common/Breadcrumb'
import { getAllLeads } from '../../apiServices/service';
function AllLeads() {
    const [leads, setLeads] = React.useState([]);
    const [message, setMessage] = React.useState('');    
    const fetchLeads = async () => {
        try {
            const result = await getAllLeads();
            setLeads(result?.data?.leads || []);
        } catch (error) {
            setMessage(error.message);
        }
    };

    useEffect(() => {
        fetchLeads();
    }
    , []);

  return (
    <React.Fragment>
        <div className='page-content'>
            <Breadcrumbs title='CRM' breadcrumbItem='All Leads' />
            <div className='button-panel'>
                <button className='btn btn-primary'>Add Lead</button>
                <button className='btn btn-primary'>Import Leads</button>
                <button className='btn btn-primary'>Export Leads</button>
            </div>
           <div className='table-responsive'>
           <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Platform</th>
                        <th>Organic</th>
                        <th>Ad. data </th>
                        <th>Created/Updated</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead, index) => (
                        <tr key={lead.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{lead.firstName + " " +lead.lastName}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phoneNumber}</td>
                            <td>{lead.platform}</td>
                            <td>{lead.isOrganic?"yes":"no"}</td>
                            <td>{lead.adId}<br/>{lead.adName}</td>
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
                            <br/>
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
                                <i className="bx bx-show" style={{fontSize: "22px", fontWeight:"bold",cursor: "pointer" }} color="info"></i>
                                <i className="bx bx-edit" style={{fontSize: "22px", fontWeight:"bold",cursor: "pointer" , marginLeft:"5px"}}></i>
                                <i className="bx bx-trash"  style={{fontSize: "22px", fontWeight:"bold", cursor: "pointer" , marginLeft:"5px"}}></i>

                              </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
           </div>
            {message && <p className="text-danger">{message}</p>}
        
                    
        </div>   
    </React.Fragment>
  )
}

export default AllLeads