import React, { useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';

function ProductionSettings() {
  const [settings, setSettings] = useState({
    enableNotifications: true,
    defaultUnit: "pcs",
    qualityCheck: true,
    autoRestockThreshold: 50,
    productionModes: ["Manual", "Semi-Automatic", "Automatic"],
    selectedMode: "Manual",
    workHours: { start: "09:00", end: "17:00" },
    wasteManagementEnabled: true,
    inventorySync: false,
    enableAudits: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (e) => {
    setSettings((prev) => ({ ...prev, selectedMode: e.target.value }));
  };

  const handleInputChange = (e, key) => {
    setSettings((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs
          title="Production & Inventory"
          breadcrumbItem="Production Settings"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Production Settings</h4>
                  <p className="card-title-desc">
                    Configure production and inventory management settings.
                  </p>

                  <form>
                    {/* Enable Notifications */}
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.enableNotifications}
                          onChange={() => toggleSetting("enableNotifications")}
                        />
                        Enable Notifications
                      </label>
                    </div>

                    {/* Default Unit */}
                    <div className="form-group">
                      <label>Default Unit</label>
                      <select
                        className="form-control"
                        value={settings.defaultUnit}
                        onChange={(e) =>
                          handleInputChange(e, "defaultUnit")
                        }
                      >
                        <option value="pcs">Pieces</option>
                        <option value="kg">Kilograms</option>
                        <option value="litres">Litres</option>
                        <option value="units">Units</option>
                      </select>
                    </div>

                    {/* Quality Check */}
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.qualityCheck}
                          onChange={() => toggleSetting("qualityCheck")}
                        />
                        Enable Quality Check
                      </label>
                    </div>

                    {/* Auto Restock Threshold */}
                    <div className="form-group">
                      <label>Auto Restock Threshold</label>
                      <input
                        type="number"
                        className="form-control"
                        value={settings.autoRestockThreshold}
                        onChange={(e) =>
                          handleInputChange(e, "autoRestockThreshold")
                        }
                      />
                    </div>

                    {/* Production Modes */}
                    <div className="form-group">
                      <label>Production Mode</label>
                      <select
                        className="form-control"
                        value={settings.selectedMode}
                        onChange={handleSelectChange}
                      >
                        {settings.productionModes.map((mode) => (
                          <option key={mode} value={mode}>
                            {mode}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Work Hours */}
                    <div className="form-group">
                      <label>Work Hours</label>
                      <div className="d-flex gap-2">
                        <input
                          type="time"
                          className="form-control"
                          value={settings.workHours.start}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              workHours: {
                                ...prev.workHours,
                                start: e.target.value,
                              },
                            }))
                          }
                        />
                        <span>to</span>
                        <input
                          type="time"
                          className="form-control"
                          value={settings.workHours.end}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              workHours: {
                                ...prev.workHours,
                                end: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* Waste Management */}
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.wasteManagementEnabled}
                          onChange={() =>
                            toggleSetting("wasteManagementEnabled")
                          }
                        />
                        Enable Waste Management
                      </label>
                    </div>

                    {/* Inventory Sync */}
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.inventorySync}
                          onChange={() => toggleSetting("inventorySync")}
                        />
                        Enable Inventory Sync
                      </label>
                    </div>

                    {/* Enable Audits */}
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={settings.enableAudits}
                          onChange={() => toggleSetting("enableAudits")}
                        />
                        Enable Audits
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductionSettings;
