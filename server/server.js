const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config")
const path = require("path");

dotenv.config();
const app = express();

app.use(cors()); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

connectDB()

const userRoute = require("./routers/auth.router");
const planRoute = require("./routers/plan.router");
const paymentRoute = require("./routers/payment.router");
const categoryRoute = require("./routers/category.router")
const inventoryRoute = require("./routers/inventory.router")
const customerRoute = require("./routers/customer.router")
const invoiceRoute = require("./routers/invoice.router")
const vendorRoute = require("./routers/vendor.router")
const taxRouter = require("./routers/tax.router")
const brandRouter = require("./routers/brand.router")
const manufacturerRouter = require("./routers/manufacturer.router")
const roleRouter = require("./routers/role.router")
const leadRouter = require("./routers/lead.router")
const taskRouter = require("./routers/task.router")
const crmUserRouter = require("./routers/crmuser.router")
const blogCategoryRouter = require("./routers/blogcategory.router")

app.use("/api/auth", userRoute);
app.use("/api/plan", planRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/category", categoryRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/customer", customerRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/tax", taxRouter);
app.use("/api/brand", brandRouter);
app.use("/api/manufacturer", manufacturerRouter);
app.use("/api/role", roleRouter);
app.use("/api/lead", leadRouter);
app.use("/api/task", taskRouter);
app.use("/api/crmuser", crmUserRouter);
app.use("/api/blogcategory", blogCategoryRouter);

// CLIENT ROUTES
// app.use('/api/clientadmin', require("./controllers/clientadmin.controller"))
// app.use('/api/plan', require("./controllers/plans.controller"))
// app.use('/api/auth', require("./controllers/auth.controller"))
// app.use('/api/firmadmin', require("./controllers/firm.controller"))

app.get("/", (req, res) => {
  res.send("Welcome to HRMS Servers!");
});

// console.log(path.join(__dirname, "../build"));

// Serve static files from the build folder
// const buildpath = path.join(__dirname, "../build");

app.all("*", function (req, res) {
  res.status(404).send("aaMOBee Servers!");
});

const server = app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server started at ${process.env.PORT}!`);
});
