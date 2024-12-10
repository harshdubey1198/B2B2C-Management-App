const roleServices = require("../services/role.services");
const { createResult } = require("../utils/utills");

const roleController = {}

roleController.createRole = async (req,res) => {
    try {
        const newRole = await roleServices.createRole(req.body)
        return res.status(200).json(createResult("Role created Succefully", newRole))
    } catch (error) {
        console.log("error creating role", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

// get all roles
roleController.getAllRoles = async (req,res) => {
    try {
        const Roles = await roleServices.getAllRoles()
        return res.status(200).json(createResult("Roles Fetched Succefully", Roles))
    } catch (error) {
        console.log("error getting roles", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

// get role by id
roleController.getRoleById = async (req,res) => {
    try {
        const Role = await roleServices.getRoleById(req.params.id)
        return res.status(200).json(createResult("Role Fetched Succefully", Role))
    } catch (error) {
        console.log("error getting role", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

// update role by id
roleController.updateRole = async (req,res) => {
    try {
        const Role = await roleServices.updateRole(req.params.id, req.body)
        return res.status(200).json(createResult("Role Updated Succefully", Role))
    } catch (error) {
        console.log("error updateding role", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

// Delete role by id
roleController.deleteRole = async (req,res) => {
    try {
        const Role = await roleServices.deleteRole(req.params.id)
        return res.status(200).json(createResult("Role Deleted Succefully", Role))
    } catch (error) {
        console.log("error deleting role", error.message)
        return res.status(500).json(createResult(null, null, error.message ));
    }
}

module.exports = roleController