const Role = require("../schemas/role.schema")

const roleServices = {}

roleServices.createRole = async (body) => {
    const { roleName, description } = body
    const existingRole = await Role.findOne({roleName: roleName})
    if(existingRole){
        throw new Error("Role with this name already exists"); 
    }
    const role = await Role.create({ roleName, description })
    return role
}

// GET ALL ROLES
roleServices.getAllRoles = async () => {
    const roles = await Role.find()
    if(roles.length === 0){
        throw new Error("No roles found");
    }
    return roles
}

// GET ROLES BY ID
roleServices.getRoleById = async (roleId) => {
    const role = await Role.findOne({_id: roleId})
    if(!role){
        throw new Error("No role found");
    }
    return role
}


// UPDATE ROLE
roleServices.updateRole = async (roleId, data) => {
    const updatedRole = await Role.findOneAndUpdate({_id: roleId}, data, {new: true})
    if(!updatedRole){
        throw new Error("Role not found or Updation failed");
    }
    return updatedRole
}


// SOFT DELETE ROLE
roleServices.deleteRole = async (roleId) => {
    const deletedRole = await Role.findOneAndUpdate({_id: roleId}, {deleted_at: new Date()}, {new: true})
    if(!deletedRole){
        throw new Error("Role not found or Deletion failed");
    }
    return deletedRole
}

module.exports = roleServices