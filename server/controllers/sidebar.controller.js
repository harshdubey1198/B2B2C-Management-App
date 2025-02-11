const SidebarServices = require("../services/sidebar.services");

const sidebarController = {};

// ✅ Create Sidebar
sidebarController.createSidebar = async (req, res) => {
  try {
    const response = await SidebarServices.createSidebar(req.body);
    return res.status(201).json({ message: "Sidebar created successfully", response });
  } catch (error) {
    console.error("Error creating sidebar:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Sidebars
sidebarController.getAllSidebars = async (req, res) => {
  try {
    const response = await SidebarServices.getAllSidebars();
    return res.status(200).json({ message: "Fetched all sidebars", data: response });
  } catch (error) {
    console.error("Error fetching sidebars:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get Sidebar by Role
sidebarController.getSidebarByRole = async (req, res) => {
  try {
    const response = await SidebarServices.getSidebarByRole(req.params.role);
    return res.status(200).json({ message: "Fetched sidebar", response });
  } catch (error) {
    console.error("Error fetching sidebar:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Update Sidebar
sidebarController.updateSidebar = async (req, res) => {
  try {
    const { role } = req.params;
    const updateData = req.body;

    if (!role || !updateData.label) {
      return res.status(400).json({ message: "Role and sidebar label are required." });
    }

    const response = await SidebarServices.updateSidebar(role, updateData);

    return res.status(200).json({
      message: "Sidebar updated successfully",
      response,
      error: false
    });
  } catch (error) {
    console.error("Error updating sidebar:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};



// ✅ Delete Sidebar
sidebarController.deleteSidebar = async (req, res) => {
  try {
    const response = await SidebarServices.deleteSidebar(req.params.role);
    return res.status(200).json({ message: "Sidebar deleted successfully", response });
  } catch (error) {
    console.error("Error deleting sidebar:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = sidebarController;
