const mongoose = require("mongoose");

const SidebarSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  sidebar: [
    {
      label: { type: String, required: true },
      icon: { type: String },
      url: { type: String },
      subItem: [
        {
          sublabel: { type: String },
          link: { type: String }
        }
      ]
    }
  ]
});
const Sidebar = mongoose.model("Sidebar", SidebarSchema);
module.exports = Sidebar;
