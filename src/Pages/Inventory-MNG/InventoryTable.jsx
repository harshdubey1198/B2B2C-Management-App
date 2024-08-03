// import React, { useState } from 'react';
// import { Card, CardBody, Col } from 'reactstrap';
// import Breadcrumbs from '../../components/Common/Breadcrumb';

// const inventoryData = [
//   {
//     id: 1,
//     name: "Item 1",
//     description: "Description for Item 1",
//     quantity: 100,
//     supplier: "Supplier A",
//     price: 25.50,
//     category: "Category 1"
//   },
//   {
//     id: 2,
//     name: "Item 2",
//     description: "Description for Item 2",
//     quantity: 10,
//     supplier: "Supplier B",
//     price: 30.00,
//     category: "Category 2"
//   },
//   {
//     id: 3,
//     name: "Item 3",
//     description: "Description for Item 3",
//     quantity: 100,
//     supplier: "Supplier A",
//     price: 25.50,
//     category: "Category 1"
//   },
//   {
//     id: 4,
//     name: "Item 4",
//     description: "Description for Item 4",
//     quantity: 150,
//     supplier: "Supplier B",
//     price: 30.00,
//     category: "Category 2"
//   },
//   {
//     id: 5,
//     name: "Item 5",
//     description: "Description for Item 5",
//     quantity: 11,
//     supplier: "Supplier A",
//     price: 25.50,
//     category: "Category 1"
//   },
//   {
//     id: 6,
//     name: "Item 6",
//     description: "Description for Item 6",
//     quantity: 350,
//     supplier: "Supplier B",
//     price: 30.00,
//     category: "Category 2"
//   },
// ];

// function InventoryTable() {
//   const [hoveredItemId, setHoveredItemId] = useState(null);

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Breadcrumbs title="Inventory Management" breadcrumbItem="Inventory Table" />
//         <p className='mm-active'>
//           This is the Inventory Table page. 
//           Here you can view and manage your inventory items.
//         </p>
//         <Col lg={12}>
//           <Card>
//             <CardBody>
//               <div className="table-responsive">
//                 <table className="table table-bordered mb-0">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Description</th>
//                       <th>Quantity</th>
//                       <th>Supplier</th>
//                       <th>Price</th>
//                       <th>Category</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {inventoryData.map(item => (
//                       <tr 
//                         key={item.id} 
//                         onMouseEnter={() => setHoveredItemId(item.id)}
//                         onMouseLeave={() => setHoveredItemId(null)}
//                       >
//                         <td>{item.name}</td>
//                         <td>{item.description}</td>
//                         <td>{item.quantity}</td>
//                         <td>{item.supplier}</td>
//                         <td>${item.price.toFixed(2)}</td>
//                         <td>{item.category}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {hoveredItemId && (
//                 <div className="hover-details">
//                   <h5>Item Details:</h5>
//                   <ul>
//                     {inventoryData.find(item => item.id === hoveredItemId) && (
//                       <>
//                         <li>Name: {inventoryData.find(item => item.id === hoveredItemId).name}</li>
//                         <li>Description: {inventoryData.find(item => item.id === hoveredItemId).description}</li>
//                         <li>Quantity: {inventoryData.find(item => item.id === hoveredItemId).quantity}</li>
//                         <li>Supplier: {inventoryData.find(item => item.id === hoveredItemId).supplier}</li>
//                         <li>Price: ${inventoryData.find(item => item.id === hoveredItemId).price.toFixed(2)}</li>
//                         <li>Category: {inventoryData.find(item => item.id === hoveredItemId).category}</li>
//                       </>
//                     )}
//                   </ul>
//                 </div>
//               )}
//             </CardBody>
//           </Card>
//         </Col>
//       </div>
     
//     </React.Fragment>
//   );
// }

// export default InventoryTable;











import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';

function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('inventoryItems')) || [];
    setInventoryData(storedData.map(item => ({
      ...item,
      price: Number(item.price) // Ensure price is a number
    })));
  }, []);
  console.log(inventoryData)
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Inventory Management" breadcrumbItem="Inventory Table" />
        <p className='mm-active'>
          This is the Inventory Table page. 
          Here you can view and manage your inventory items.
        </p>
        <Col lg={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Supplier</th>
                      <th>Price</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map(item => (
                      <tr 
                        key={item.id} 
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        style={{ cursor: 'pointer' }} // Optional: Add pointer cursor to indicate hover
                      >
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.supplier}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {hoveredItemId && (
                <div className="hover-details">
                  <h5>Item Details:</h5>
                  <ul>
                    {inventoryData.find(item => item.id === hoveredItemId) && (
                      <>
                        <li>Name: {inventoryData.find(item => item.id === hoveredItemId).name}</li>
                        <li>Description: {inventoryData.find(item => item.id === hoveredItemId).description}</li>
                        <li>Quantity: {inventoryData.find(item => item.id === hoveredItemId).quantity}</li>
                        <li>Supplier: {inventoryData.find(item => item.id === hoveredItemId).supplier}</li>
                        <li>Price: ${inventoryData.find(item => item.id === hoveredItemId).price.toFixed(2)}</li>
                        <li>Category: {inventoryData.find(item => item.id === hoveredItemId).category}</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
}

export default InventoryTable;

