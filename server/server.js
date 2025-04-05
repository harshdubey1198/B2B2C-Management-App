const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config");
const path = require("path");
const http = require("http");
const { initializeSocket } = require("./utils/socket"); // Import socket initializer

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server

app.use(cors()); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

connectDB();

// Initialize Socket.IO
initializeSocket(server);

// Import Routes
const userRoute = require("./routers/auth.router");
const planRoute = require("./routers/plan.router");
const paymentRoute = require("./routers/payment.router");
const categoryRoute = require("./routers/category.router");
const inventoryRoute = require("./routers/inventory.router");
const customerRoute = require("./routers/customer.router");
const invoiceRoute = require("./routers/invoice.router");
const vendorRoute = require("./routers/vendor.router");
const taxRouter = require("./routers/tax.router");
const brandRouter = require("./routers/brand.router");
const manufacturerRouter = require("./routers/manufacturer.router");
const roleRouter = require("./routers/role.router");
const leadRouter = require("./routers/lead.router");
const taskRouter = require("./routers/task.router");
const crmUserRouter = require("./routers/crmuser.router");
const blogCategoryRouter = require("./routers/blogcategory.router");
const blogRouter = require("./routers/blog.router");
const feedBackRouter = require("./routers/feedback.router");
const bomRouter = require("./routers/bom.router");
const productionOrderRouter = require("./routers/productionorder.router");
const wasteInventoryRouter = require("./routers/wasteinventory.router");
const notificationRouter = require("./routers/notification.router");

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
app.use("/api/blog", blogRouter);
app.use("/api/feedback", feedBackRouter);
app.use("/api/bom", bomRouter);
app.use("/api/productionorder", productionOrderRouter);
app.use("/api/wasteinventory", wasteInventoryRouter); 
app.use("/api/notification", notificationRouter);

app.get("/", (req, res) => {
  res.send("Welcome to aaMOBee Main Server!");
});

app.all("*", function (req, res) {
  res.status(404).send("aaMOBee Servers!");
});

// Start the server with HTTP (for Socket.IO support)
server.listen(process.env.PORT || 5000, () => {
  console.log(`Server started at port ${process.env.PORT || 5000}`);
});
