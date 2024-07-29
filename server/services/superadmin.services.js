const SuperAdmin = require("../schemas/superadmin.schema")

let service = {}
service.superAdminLogin = superAdminLogin

async function superAdminLogin(email, password) {
    try {
        const user = await SuperAdmin.find({email: email})
        if(!user){
            Promise.reject("Account Not Found")
        }else{
            if(user.password !== password){
                Promise.reject("Invalid Credentials")
            }else{
                const superadmindata = await SuperAdmin.findOne({_id: user._id}).select('-password')
                return superadmindata
            }
        }
    } catch (error) {
        Promise.reject("Login Failed, Try Again Later")
    }
}

module.exports = service