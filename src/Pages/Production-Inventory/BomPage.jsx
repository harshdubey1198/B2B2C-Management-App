import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { getBoms } from '../../apiServices/service';
import { Table, Button, Input } from 'reactstrap';

function BomPage() {
  const [boms, setBoms] = useState([]);
  const [filteredBoms, setFilteredBoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  const fetchBoms = async () => {
    try {
      const result = await getBoms();
      setBoms(result.data);
      setFilteredBoms(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBoms();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = boms.filter((bom) =>
      bom.productName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBoms(filtered);
    setCurrentPage(1); 
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBoms.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBoms.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <div className='page-content'>
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Bill Of Materials" />

        <div className='mt-3'>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Product Name"
          />
        </div>

        <div className='table-responsive mt-2'>
          <Table bordered>
            <thead>
              <tr>
                <th>BOM Name</th>
                <th>Materials</th>
                <th>Created By</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((bom, index) => (
                <tr key={index}>
                  <td>{bom.productName}</td>
                  <td>
                    <div className="d-flex flex-column">
                      {bom.rawMaterials.map((material, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                          <span className="material-name">{material.itemId.name}</span>
                          <span>
                            {material.variants.length > 0 ? (
                              <>
                                <span className="badge bg-info me-1">
                                  Variant: {material.variants[0].optionLabel} - {material.variants[0].quantity}
                                </span>
                                <span className="text-muted">(Total: {material.quantity})</span>
                              </>
                            ) : (
                              <span>{material.quantity}</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>{bom.createdBy.firstName + " " + bom.createdBy.lastName}</td>
                  {/* <td>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="pagination-controls d-flex gap-2 mt-1 mb-3">
          {pageNumbers.map((number) => (
            <Button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "btn-primary" : "btn-secondary"}
            >
              {number}
            </Button>
          ))}
        </div>

      </div>
    </React.Fragment>
  );
}

export default BomPage;
