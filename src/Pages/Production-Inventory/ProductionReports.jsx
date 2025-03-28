import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { getInventoryItems } from "../../apiServices/service";
import { Row, Col } from "reactstrap";
import FirmSwitcher from "../Firms/FirmSwitcher";

function ProductionReports() {
  const [finishedProductsData, setFinishedProductsData] = useState([]);
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [view, setView] = useState("rawMaterials");
  const [chartType, setChartType] = useState("pie");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedFirmId, setSelectedFirmId] = useState(null); // Used for client_admin firm switching

  const authuser = JSON.parse(localStorage.getItem("authUser")).response;
  const userRole = authuser?.role;
  const firmId = authuser?.adminId;

  // Determine firm ID based on role
  const effectiveFirmId = userRole === "client_admin" ? selectedFirmId : firmId;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchItems = async () => {
    if (!effectiveFirmId) return;
    try {
      const response = await getInventoryItems(effectiveFirmId);
      if (response.data) {
        const finishedProducts = response.data.filter(
          (item) => item.type === "readyProduct" || item.type === "finished_good"
        );
        const rawMaterials = response.data.filter((item) => item.type === "raw_material");

        setFinishedProductsData(finishedProducts);
        setRawMaterialData(rawMaterials);
      } else {
        setFinishedProductsData([]);
        setRawMaterialData([]);
      }
    } catch (error) {
      console.error("Error fetching Inventory Items:", error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [effectiveFirmId]);

  const totalFinishedProducts = finishedProductsData.reduce((sum, product) => sum + parseFloat(product.quantity || 0), 0);
  const totalRawMaterials = rawMaterialData.reduce((sum, material) => sum + parseFloat(material.quantity || 0), 0);

  const chartData = view === "finishedProducts" ? finishedProductsData : rawMaterialData;

  const barChartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: chartData.map((item) => item.name),
      title: { text: view === "finishedProducts" ? "Finished Products" : "Raw Materials" },
    },
    yaxis: { title: { text: "Quantity" } },
    title: { text: `${view === "finishedProducts" ? "Finished Products" : "Raw Materials"} Bar Chart`, align: "center" },
  };

  const barChartSeries = [{ name: "Quantity", data: chartData.map((item) => parseFloat(item.quantity || 0)) }];

  const pieChartData = chartData.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + parseFloat(item.quantity || 0);
    return acc;
  }, {});

  const pieChartOptions = {
    chart: { type: "pie" },
    labels: Object.keys(pieChartData).map((name) => {
      const quantity = pieChartData[name];
      const percentage = ((quantity / (view === "finishedProducts" ? totalFinishedProducts : totalRawMaterials)) * 100).toFixed(2);
      return `${name} (${quantity} - ${percentage}%)`;
    }),
    title: { text: `${view === "finishedProducts" ? "Finished Products" : "Raw Materials"} Pie Chart`, align: "center" },
    legend: {
      show: true,
      position: windowWidth < 768 ? "bottom" : "right",
      horizontalAlign: windowWidth < 768 ? "center" : "left",
      itemMargin: { horizontal: 5, vertical: 2 },
    },
  };

  const pieChartSeries = Object.values(pieChartData);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Production Reports" />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Row className="justify-content-between align-items-center">
                  <Col xs="12" md="4">
                    <h5>Total Finished Products: {totalFinishedProducts}</h5>
                    <h5>Total Raw Materials: {totalRawMaterials}</h5>
                    <h5 className="mt-2">Total Products: {totalFinishedProducts + totalRawMaterials}</h5>
                  </Col>
                  <Col xs="12" md="8" className="d-flex justify-content-start align-items-center flex-wrap gap-2">
                    <button className="btn btn-primary me-2 p-2" style={{maxHeight:"27.13px",fontSize:"10.5px" , lineHeight:"1"}} onClick={() => navigate("/production/orders")}>
                      <i className="bx bxs-chevron-left me-1"></i>
                      <span>Orders</span>
                    </button>

                    {userRole === "client_admin" && (
                      <FirmSwitcher selectedFirmId={selectedFirmId} onSelectFirm={setSelectedFirmId} />
                    )}

                    <select className="form-select " style={{maxHeight:"27.13px",fontSize:"10.5px" ,width:"fit-content", lineHeight:"1"}} value={view} onChange={(e) => setView(e.target.value)}>
                      <option value="finishedProducts">Finished Products</option>
                      <option value="rawMaterials">Raw Materials</option>
                    </select>

                    <select className="form-select " style={{maxHeight:"27.13px",fontSize:"10.5px" ,width:"fit-content", lineHeight:"1"}} value={chartType} onChange={(e) => setChartType(e.target.value)}>
                      <option value="bar">Bar Chart</option>
                      <option value="pie">Pie Chart</option>
                    </select>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {chartType === "bar" && barChartSeries[0].data.length > 0 ? (
                  <Chart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
                ) : chartType === "pie" && pieChartSeries.length > 0 ? (
                  <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={windowWidth < 768 ? 600 : 350} />
                ) : (
                  <div>No data available for selected category.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductionReports;
