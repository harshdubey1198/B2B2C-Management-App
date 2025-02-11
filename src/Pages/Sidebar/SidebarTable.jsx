import React, { useState } from "react";
import { Table, Button } from "reactstrap";

const SidebarTable = ({ sidebarData, onEdit, onDeleteSidebar, onDeleteSubItem }) => {
  const [openRoleIndex, setOpenRoleIndex] = useState(null);
  const [openSidebarIndex, setOpenSidebarIndex] = useState(null);

  const toggleRole = (index) => {
    setOpenRoleIndex(openRoleIndex === index ? null : index);
    setOpenSidebarIndex(null);
  };

  const toggleSidebar = (index) => {
    setOpenSidebarIndex(openSidebarIndex === index ? null : index);
  };

  return (
    <div>
      <Table  bordered>
        <thead>
          <tr className="bg-light text-dark">
            <th style={{width:"33%"}}>Role</th>
            <th style={{width:"43%"}}>Label</th>
            <th style={{width:"100px"}} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sidebarData.map((roleData, roleIndex) => (
            <React.Fragment key={roleIndex}>
              {/* Role Header Row */}
              <tr onClick={() => toggleRole(roleIndex)}>
                <td className="cursor-pointer bg-primary text-white d-flex justify-content-between align-items-center">
                  <strong>{roleData.role.replace(/_/g, " ").replace(/\b\w/, (char) => char.toUpperCase())}</strong>
                  <strong>{openRoleIndex === roleIndex ? <i className="bx bx-chevron-up"></i> : <i className="bx bx-chevron-down"></i>}</strong>
                </td>
                <td></td>
                <td></td>
              </tr>

              {openRoleIndex === roleIndex &&
                roleData.sidebar.map((item, sidebarIndex) => (
                  <React.Fragment key={sidebarIndex}>
                    {/* Sidebar Item Row */}
                    <tr onClick={() => toggleSidebar(sidebarIndex)} className="cursor-pointer bg-info text-white">
                      <td></td>
                      <td className="d-flex justify-content-between align-items-center">
                        {item.label}
                        <div>
                          <i style={{fontSize:"20px"}} className={item.icon || "mdi mdi-menu"}></i>
                          {item.subItem && item.subItem.length > 0 && (
                            <span className="ms-2" style={{ cursor: "pointer" , fontSize:"20px"}}>
                              {openSidebarIndex === sidebarIndex ? <i className="bx bx-chevron-up"></i> : <i className="bx bx-chevron-down"></i>}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-center ">
                        <div className="d-flex justify-content-center gap-2">
                            <Button color="danger" size="sm" onClick={() => onDeleteSidebar(roleData.role, item)}>
                            <i className="bx bx-trash text-white"></i>
                            </Button>
                            <Button color="primary" size="sm" onClick={() => onEdit(roleData.role, item)}>
                            <i className="bx bx-pencil"></i>
                            </Button>
                        </div>
                      </td>
                    </tr>

                    {openSidebarIndex === sidebarIndex &&
                      item.subItem.length > 0 &&
                      item.subItem.map((sub, subIndex) => (
                        /* Subitem Row */
                        <tr key={subIndex} className="bg-success text-white">
                          <td></td>
                          <td>{sub.sublabel}</td>
                          <td className="text-center d-flex justify-content-center gap-2">
                            <Button color="danger" size="sm" onClick={() => onDeleteSubItem(roleData.role, item, sub)}>
                              <i className="bx bx-trash text-white"></i>
                            </Button>
                            <Button color="primary" size="sm" onClick={() => onEdit(roleData.role, item, sub)}>
                              <i className="bx bx-pencil"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SidebarTable;
