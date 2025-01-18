import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

function ProductionReports() {
  const [readyProductData, setReadyProductData] = useState([]);
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [view, setView] = useState('rawMaterials');

  useEffect(() => {
    const readyProducts = JSON.parse(localStorage.getItem('readyProducts')) || [];
    setReadyProductData(readyProducts);

    const rawMaterials = JSON.parse(localStorage.getItem('rawMaterials')) || [];
    setRawMaterialData(rawMaterials);
  }, []);

  const totalReadyProducts = readyProductData.reduce(
    (sum, product) => sum + parseFloat(product.quantity || 0),
    0
  );

  const totalRawMaterials = rawMaterialData.reduce(
    (sum, material) => sum + parseFloat(material.quantity || 0),
    0
  );

  const productCategoryData = readyProductData.reduce((acc, product) => {
    acc[product.name] = (acc[product.name] || 0) + parseFloat(product.quantity || 0);
    return acc;
  }, {});

  const readyProductsChartOptions = {
    chart: { type: 'pie' },
    labels: Object.keys(productCategoryData).map((name) => {
      const quantity = productCategoryData[name];
      const percentage = ((quantity / totalReadyProducts) * 100).toFixed(2);
      return `${name} (${quantity} - ${percentage}%)`;
    }),
    title: { text: 'Ready Products Breakdown' },
  };

  const readyProductsChartSeries = Object.values(productCategoryData);

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
                  <h5>Total Ready Products: {totalReadyProducts}</h5>
                  <h5>Total Raw Materials: {totalRawMaterials}</h5>
                  <h5 className="mt-2">Total Products in Inventory: {totalReadyProducts + totalRawMaterials}</h5>
                </div>
                <div>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate('/production/orders')}
                  >
                    <i className="bx bxs-chevron-left me-1 font-size-14"></i>
                    <span className="font-size-16">Orders</span>
                  </button>
                  <button
                    className={`btn ${view === 'readyProducts' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                    onClick={() => setView('readyProducts')}
                  >
                    Ready Products
                  </button>
                  <button
                    className={`btn ${view === 'rawMaterials' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setView('rawMaterials')}
                  >
                    Raw Materials
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {view === 'readyProducts' ? (
                  <Chart
                    options={readyProductsChartOptions}
                    series={readyProductsChartSeries}
                    type="pie"
                    height={350}
                  />
                ) : (
                  <Chart
                    options={rawMaterialsChartOptions}
                    series={rawMaterialsChartSeries}
                    type="pie"
                    height={350}
                  />
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
