import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import { triggerSidebarUpdateForRole } from "../../utils/sidebarUtils";

const SidebarTable = ({ sidebarData, onToggleActiveRole, onToggleActiveSidebarLabel, onToggleActiveSubItemLabel, onEdit }) => {
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
      <Table bordered>
        <thead>
          <tr className="bg-light text-dark">
            <th style={{ width: "33%" }}>Role</th>
            <th style={{ width: "43%" }}>Label</th>
            <th style={{ width: "100px" }} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sidebarData.map((roleData, roleIndex) => (
            <React.Fragment key={roleIndex}>
              {/* Role Header Row */}
              <tr onClick={() => toggleRole(roleIndex)}>
                <td className="cursor-pointer bg-primary text-white d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {/* <i
                      className={`mdi ${roleData.deleted ? "mdi-toggle-switch-off text-secondary" : "mdi-toggle-switch text-success"}`}
                      style={{ fontSize: "22px", cursor: "pointer", marginRight: "10px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleActiveRole(roleData.role, !roleData.deleted);
                      }}
                    ></i> */}
                    <strong>{roleData.role.replace(/_/g, " ").replace(/\b\w/, (char) => char.toUpperCase())}</strong>
                  </div>
                  <strong>
                    {openRoleIndex === roleIndex ? <i className="bx bx-chevron-up"></i> : <i className="bx bx-chevron-down"></i>}
                  </strong>
                </td>
                <td></td>
                <td></td>
              </tr>

              {openRoleIndex === roleIndex &&
                roleData.sidebar.map((item, sidebarIndex) => (
                  <React.Fragment key={sidebarIndex}>
                    <tr onClick={() => toggleSidebar(sidebarIndex)} className="cursor-pointer bg-info text-white">
                      <td></td>
                      <td className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center" style={{fontWeight:"bolder"}}>
                          <i
                            className={`mdi ${item.deleted ? "mdi-toggle-switch-off text-secondary" : "mdi-toggle-switch text-success"}`}
                            style={{ fontSize: "22px", cursor: "pointer", marginRight: "10px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleActiveSidebarLabel(roleData.role, item.label, !item.deleted);
                              triggerSidebarUpdateForRole(roleData.role);
                            }}
                          ></i>
                          {"#" + "  " + (item.itemOrder || "") + " " + item.label}
                        </div>
                        <div>
                          <i style={{ fontSize: "20px" }} className={item.icon || "mdi mdi-menu"}></i>
                          {item.subItem && item.subItem.length > 0 && (
                            <span className="ms-2" style={{ cursor: "pointer", fontSize: "20px" }}>
                              {openSidebarIndex === sidebarIndex ? <i className="bx bx-chevron-up"></i> : <i className="bx bx-chevron-down"></i>}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button color="primary" size="sm" onClick={() => onEdit(roleData.role, item)}>
                            <i className="bx bx-pencil"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {openSidebarIndex === sidebarIndex &&
                      item.subItem.map((sub, subIndex) => (
                        /* Subitem Row */
                        <tr key={subIndex} className="bg-success text-white">
                          <td></td>
                          <td className="d-flex align-items-center">
                            <i
                              className={`mdi ${sub.deleted ? "mdi-toggle-switch-off text-secondary" : "mdi-toggle-switch text-success"}`}
                              style={{ fontSize: "22px", cursor: "pointer", marginRight: "10px" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleActiveSubItemLabel(roleData.role, item.label, sub.sublabel, !sub.deleted);
                                triggerSidebarUpdateForRole(roleData.role);
                              }}
                            ></i>
                            {"  " + "*" + "  " + (sub.itemOrder || "") + " " + sub.sublabel}
                          </td>
                          <td className="text-center">
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
