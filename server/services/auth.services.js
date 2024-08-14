const Accountant = require("../schemas/accountant.schema");
const ClientAdmin = require("../schemas/clientadmin.schema");
const FirmAdmin = require("../schemas/firmadmin.schema");
const GeneralEmployee = require("../schemas/generalEmployee.schema");
const SuperAdmin = require("../schemas/superadmin.schema");
const SupportExecutive = require("../schemas/supportExecutive.schema");
const Viewer = require("../schemas/viewersshema");

let service = {};
service.createUser = createUser;

async function createUser(body, id) {
  const { role } = body;
  let userModel;

  switch (role) {
    case "super_admin":
      userModel = SuperAdmin;
      break;
    case "client_admin":
      userModel = ClientAdmin;
      break;
    case "firm_admin":
      userModel = FirmAdmin;
      break;
    case "accountant":
      userModel = Accountant;
      break;
    case "g_emp":
      userModel = GeneralEmployee;
      break;
    case "customer_sp":
      userModel = SupportExecutive;
      break;
    case "viewer":
      userModel = Viewer;
      break;
    default:
      return Promise.reject("Invalid Role");
  }
}

module.exports = service;
