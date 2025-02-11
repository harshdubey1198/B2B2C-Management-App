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
    if (!role || !updateData.label) {
      throw new Error("Role and sidebar label are required.");
    }

    let updatedSidebar;

    if (updateData.sublabel) {
      updatedSidebar = await Sidebar.findOneAndUpdate(
        { role, "sidebar.label": updateData.label, "sidebar.subItem.sublabel": updateData.sublabel },
        {
          $set: {
            "sidebar.$[sidebarItem].subItem.$[subItem].sublabel": updateData.newSublabel || updateData.sublabel,
            "sidebar.$[sidebarItem].subItem.$[subItem].link": updateData.newLink || updateData.link
          }
        },
        {
          arrayFilters: [
            { "sidebarItem.label": updateData.label },
            { "subItem.sublabel": updateData.sublabel }
          ],
          new: true
        }
      );

    } else {
      const updateFields = {};

      if (updateData.newLabel) updateFields["sidebar.$.label"] = updateData.newLabel;
      if (updateData.icon) updateFields["sidebar.$.icon"] = updateData.icon;
      if (updateData.url) updateFields["sidebar.$.url"] = updateData.url;

      updatedSidebar = await Sidebar.findOneAndUpdate(
        { role, "sidebar.label": updateData.label },
        { $set: updateFields },
        { new: true }
      );
    }

    if (!updatedSidebar) {
      throw new Error("Sidebar item not found.");
    }

    return updatedSidebar;
  } catch (error) {
    console.error("Error updating sidebar:", error);
    throw new Error(error.message || "Failed to update sidebar");
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

// ✅ Soft Delete Sidebar
SidebarServices.softDeleteSidebar = async (role, label, subItemLabel) => {
  try {
    if (role && !label && !subItemLabel) {
      const sidebar = await Sidebar.findOne({ role });
      if (!sidebar) throw new Error("Role not found");

      const newStatus = !sidebar.deleted;

      return await Sidebar.findOneAndUpdate(
        { role },
        { $set: { deleted: newStatus } },
        { new: true }
      );
    }

    if (role && label && !subItemLabel) {
      const sidebar = await Sidebar.findOne({ role, "sidebar.label": label });
      if (!sidebar) throw new Error("Sidebar not found");

      const itemIndex = sidebar.sidebar.findIndex(item => item.label === label);
      if (itemIndex === -1) throw new Error("Sidebar item not found");

      const newStatus = !sidebar.sidebar[itemIndex].deleted;

      return await Sidebar.findOneAndUpdate(
        { role, "sidebar.label": label },
        { $set: { "sidebar.$.deleted": newStatus } },
        { new: true }
      );
    }

    if (role && label && subItemLabel) {
      const sidebar = await Sidebar.findOne({ role, "sidebar.label": label });
      if (!sidebar) throw new Error("Sidebar not found");

      const itemIndex = sidebar.sidebar.findIndex(item => item.label === label);
      if (itemIndex === -1) throw new Error("Sidebar item not found");

      const subItemIndex = sidebar.sidebar[itemIndex].subItem.findIndex(sub => sub.sublabel === subItemLabel);
      if (subItemIndex === -1) throw new Error("SubItem not found");

      const newStatus = !sidebar.sidebar[itemIndex].subItem[subItemIndex].deleted;

      return await Sidebar.findOneAndUpdate(
        { role, "sidebar.label": label, "sidebar.subItem.sublabel": subItemLabel },
        { $set: { "sidebar.$.subItem.$[subItem].deleted": newStatus } },
        {
          arrayFilters: [{ "subItem.sublabel": subItemLabel }],
          new: true,
        }
      );
    }

    throw new Error("Invalid deletion parameters.");
  } catch (error) {
    console.error("Error toggling soft delete:", error);
    throw new Error(error.message || "Failed to toggle soft delete status");
  }
};




module.exports = SidebarServices;
