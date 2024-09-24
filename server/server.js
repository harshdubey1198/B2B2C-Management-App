const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config")

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB()

const userRoute = require("./routers/auth.router");
const planRoute = require("./routers/plan.router");
const paymentRoute = require("./routers/payment.router");
const categoryRoute = require("./routers/category.router")
const inventoryRoute = require("./routers/inventory.router")
const customerRoute = require("./routers/customer.router")
const invoiceRoute = require("./routers/invoice.router")

app.use("/api/auth", userRoute);
app.use("/api/plan", planRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/category", categoryRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/customer", customerRoute);
app.use("/api/invoice", invoiceRoute);

// CLIENT ROUTES
// app.use('/api/clientadmin', require("./controllers/clientadmin.controller"))
// app.use('/api/plan', require("./controllers/plans.controller"))
// app.use('/api/auth', require("./controllers/auth.controller"))
// app.use('/api/firmadmin', require("./controllers/firm.controller"))

app.get("/", (req, res) => {
  res.send("Welcome to HRMS Servers!");
});

app.all("*", function (req, res) {
  res.status(404).send("aaMOBee Servers!");
});

const server = app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server started at ${process.env.PORT}!`);
});
