const mongoose = require("mongoose");

const SidebarSchema = new mongoose.Schema({
  role: { type: String, required: true },
  sidebar: [
    {
      label: String,
      icon: String,
      url: String,
      deleted: { type: Boolean, default: false }, 
      subItem: [
        {
          sublabel: String,
          link: String,
          deleted: { type: Boolean, default: false } 
        }
      ]
    }
  ],
  deleted: { type: Boolean, default: false } 
});

module.exports = mongoose.model("Sidebar", SidebarSchema);
