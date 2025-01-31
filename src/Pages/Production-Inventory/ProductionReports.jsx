import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { getInventoryItems } from "../../apiServices/service";

function ProductionReports() {
  const [finishedProductsData, setFinishedProductsData] = useState([]);
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [view, setView] = useState("rawMaterials");
  const [chartType, setChartType] = useState("pie");

  const fetchItems = async () => {
    try {
      const response = await getInventoryItems();
      const finishedProducts = response.data.filter(
        (item) => item.type === "readyProduct" || item.type === "finished_good"
      );
      const rawMaterials = response.data.filter((item) => item.type === "raw_material");
      setFinishedProductsData(finishedProducts);
      setRawMaterialData(rawMaterials);
    } catch (error) {
      console.error("Error fetching Inventory Items:", error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>Total Finished Products: {totalFinishedProducts}</h5>
                  <h5>Total Raw Materials: {totalRawMaterials}</h5>
                  <h5 className="mt-2">Total Products in Inventory: {totalFinishedProducts + totalRawMaterials}</h5>
                </div>
                <div>
                  <button className="btn btn-primary me-2" onClick={() => navigate("/production/orders")}>
                    <i className="bx bxs-chevron-left me-1 font-size-14"></i>
                    <span className="font-size-16">Orders</span>
                  </button>
                  <button
                    className={`btn ${view === "finishedProducts" ? "btn-outline-primary" : "btn-primary"} me-2`}
                    onClick={() => setView("finishedProducts")}
                  >
                    Finished Products
                  </button>
                  <button
                    className={`btn ${view === "rawMaterials" ? "btn-outline-primary" : "btn-primary"} me-2`}
                    onClick={() => setView("rawMaterials")}
                  >
                    Raw Materials
                  </button>
                  <button
                    className={`btn ${chartType === "bar" ? "btn-outline-primary" : "btn-primary"} me-2`}
                    onClick={() => setChartType("bar")}
                  >
                    Bar Chart
                  </button>
                  <button
                    className={`btn ${chartType === "pie" ? "btn-outline-primary" : "btn-primary"}`}
                    onClick={() => setChartType("pie")}
                  >
                    Pie Chart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {chartType === "bar" && barChartSeries[0].data.length > 0 ? (
                  <Chart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
                ) : chartType === "pie" && pieChartSeries.length > 0 ? (
                  <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={350} />
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
