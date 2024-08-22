const Accountant = require("../schemas/accountant.schema")
const FirmAdmin = require("../schemas/firmadmin.schema")
const GeneralEmployee = require("../schemas/generalEmployee.schema")
const PasswordService = require("./password.services")

let services = {}
services.getFirmData = getFirmData

async function getFirmData(id){
    try {
        const data = await FirmAdmin.findOne({_id: id}).populate({
            path: "firmId",
            select: "_id firmName fuid"
        })
        const result = {
            _id: data.firmId._id,
            firmName: data.firmId.firmName,
            fuid: data.firmId.fuid
        }
        return result
    } catch (error) {
        console.log("error getting firm data", error)
        return Promise.reject("Error getting firm data")
    }
}

module.exports = services