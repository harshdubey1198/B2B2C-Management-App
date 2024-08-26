const Accountant = require("../schemas/accountant.schema");
const FirmAdmin = require("../schemas/firmadmin.schema");
const GeneralEmployee = require("../schemas/generalEmployee.schema");
const PasswordService = require("./password.services");

let services = {};
services.getFirmData = getFirmData;

async function getFirmData(id) {
  try {
    const data = await FirmAdmin.findOne({ _id: id }).populate({
      path: "firmId",
    });

    if (!data || !data.firmId) {
      return Promise.reject("Firm data not found");
    }

    const result = {
      _id: data.firmId._id || "",
      fuid: data.firmId.fuid || "",
      cidm: data.firmId.cidm || "",
      firmName: data.firmId.firmName || "",
      firmEmail: data.firmId.firmEmail || "",
      firmPhone: data.firmId.firmPhone || "", 
      companyAddress: [{
        h_no: data.firmId.companyAddress?.[0]?.h_no || "",
        nearby: data.firmId.companyAddress?.[0]?.nearby || "",
        district: data.firmId.companyAddress?.[0]?.district || "",
        city: data.firmId.companyAddress?.[0]?.city || "",
        state: data.firmId.companyAddress?.[0]?.state || "",
        zip_code: data.firmId.companyAddress?.[0]?.zip_code || "",
        country: data.firmId.companyAddress?.[0]?.country || ""
      }],
      bankName: data.firmId.bankName || "",
      accountNumber: data.firmId.accountNumber || "",
      ifscCode: data.firmId.ifscCode || "",
      cifNumber: data.firmId.cifNumber || "",
      gstin: data.firmId.gstin || "",
      branchName: data.firmId.branchName || "",
      accountHolder: data.firmId.accountHolder || "",
      avatar: data.firmId.avatar || ""
    };

    return result;
  } catch (error) {
    console.log("Error getting firm data", error);
    return Promise.reject("Error getting firm data");
  }
}

module.exports = services;
