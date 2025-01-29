import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import { getInventoryItems } from '../../apiServices/service';

function ProductionReports() {
  const [finishedProductsData, setFinishedProductsData] = useState([]);
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [view, setView] = useState('rawMaterials');

  const fetchItems = async () => {
    try {
      const response = await getInventoryItems();
      const finishedProducts = response.data.filter(
        (item) => item.type === 'readyProduct' || item.type === 'finished_goods'
      );
      const rawMaterials = response.data.filter((item) => item.type === 'raw_material');
      setFinishedProductsData(finishedProducts);
      setRawMaterialData(rawMaterials);
    } catch (error) {
      console.error('Error fetching Inventory Items:', error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const totalFinishedProducts = finishedProductsData.reduce((sum, product) => sum + parseFloat(product.quantity || 0), 0);
  const totalRawMaterials = rawMaterialData.reduce((sum, material) => sum + parseFloat(material.quantity || 0), 0);

  // Finished Products Chart (combining readyProduct & finished_goods)
  const finishedProductsChartData = finishedProductsData.reduce((acc, product) => {
    acc[product.name] = (acc[product.name] || 0) + parseFloat(product.quantity || 0);
    return acc;
  }, {});

  const finishedProductsChartOptions = {
    chart: { type: 'pie' },
    labels: Object.keys(finishedProductsChartData).map((name) => {
      const quantity = finishedProductsChartData[name];
      const percentage = ((quantity / totalFinishedProducts) * 100).toFixed(2);
      return `${name} (${quantity} - ${percentage}%)`;
    }),
    title: { text: 'Finished Products Breakdown' },
  };

  const finishedProductsChartSeries = Object.values(finishedProductsChartData);

  // Raw Materials Chart
  const rawMaterialChartData = rawMaterialData.reduce((acc, material) => {
    acc[material.name] = (acc[material.name] || 0) + parseFloat(material.quantity || 0);
    return acc;
  }, {});

  const rawMaterialsChartOptions = {
    chart: { type: 'pie' },
    labels: Object.keys(rawMaterialChartData).map((name) => {
      const quantity = rawMaterialChartData[name];
      const percentage = ((quantity / totalRawMaterials) * 100).toFixed(2);
      return `${name} (${quantity} - ${percentage}%)`;
    }),
    title: { text: 'Raw Materials Breakdown' },
  };

  const rawMaterialsChartSeries = Object.values(rawMaterialChartData);

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
                  <button className="btn btn-primary me-2" onClick={() => navigate('/production/orders')}>
                    <i className="bx bxs-chevron-left me-1 font-size-14"></i>
                    <span className="font-size-16">Orders</span>
                  </button>
                  <button className={`btn ${view === 'finishedProducts' ? 'btn-primary' : 'btn-outline-primary'} me-2`} onClick={() => setView('finishedProducts')}>
                    Finished Products
                  </button>
                  <button className={`btn ${view === 'rawMaterials' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('rawMaterials')}>
                    Raw Materials
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {view === 'finishedProducts' && finishedProductsChartSeries.length > 0 ? (
                  <Chart options={finishedProductsChartOptions} series={finishedProductsChartSeries} type="pie" height={350} />
                ) : view === 'rawMaterials' && rawMaterialsChartSeries.length > 0 ? (
                  <Chart options={rawMaterialsChartOptions} series={rawMaterialsChartSeries} type="pie" height={350} />
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
