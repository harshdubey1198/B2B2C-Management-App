const Sidebar = require("../schemas/sidebar.schema");

const SidebarServices = {};

// ✅ Create Sidebar
SidebarServices.createSidebar = async (data) => {
  try {
    const existingSidebar = await Sidebar.findOne({ role: data.role });
    if (existingSidebar) {
      throw new Error("Sidebar for this role already exists");
    }

    const sidebar = new Sidebar(data);
    await sidebar.save();
    return sidebar;
  } catch (error) {
    console.error("Error creating sidebar:", error);
    throw new Error("Failed to create sidebar");
  }
};

// ✅ Get All Sidebars
SidebarServices.getAllSidebars = async () => {
  try {
    return await Sidebar.find({});
  } catch (error) {
    console.error("Error fetching sidebars:", error);
    throw new Error("Failed to fetch sidebars");
  }
};

// ✅ Get Sidebar by Role
SidebarServices.getSidebarByRole = async (role) => {
  try {
    const sidebar = await Sidebar.findOne({ role });
    if (!sidebar) {
      throw new Error("Sidebar not found");
    }
    return sidebar;
  } catch (error) {
    console.error("Error fetching sidebar:", error);
    throw new Error("Failed to fetch sidebar");
  }
};

// ✅ Update Sidebar
SidebarServices.updateSidebar = async (role, updateData) => {
  try {
    const updatedSidebar = await Sidebar.findOneAndUpdate({ role }, updateData, { new: true });
    if (!updatedSidebar) {
      throw new Error("Sidebar not found or update failed");
    }
    return updatedSidebar;
  } catch (error) {
    console.error("Error updating sidebar:", error);
    throw new Error("Failed to update sidebar");
  }
};

// ✅ Delete Sidebar
SidebarServices.deleteSidebar = async (role) => {
  try {
    const deletedSidebar = await Sidebar.findOneAndDelete({ role });
    if (!deletedSidebar) {
      throw new Error("Sidebar not found");
    }
    return "Sidebar deleted successfully";
  } catch (error) {
    console.error("Error deleting sidebar:", error);
    throw new Error("Failed to delete sidebar");
  }
};

module.exports = SidebarServices;
