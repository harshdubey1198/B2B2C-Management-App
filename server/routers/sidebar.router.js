const express = require("express");
const router = express.Router();
const sidebarController = require("../controllers/sidebar.controller");
// const { tokenVerification, adminTokenVerification } = require("../middleware/auth.middleware");

router.post("/create",  sidebarController.createSidebar);

router.get("/all", sidebarController.getAllSidebars);

router.get("/:role", sidebarController.getSidebarByRole);

router.put("/update/:role",   sidebarController.updateSidebar);

router.delete("/delete/:role",  sidebarController.deleteSidebar);

module.exports = router;
