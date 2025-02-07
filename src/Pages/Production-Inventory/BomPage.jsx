import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { createBom, getBoms, getBrandsmain, getInventoryItems, getItemCategoriesmain, getItemSubCategories, getTaxes, getVendorsmain } from '../../apiServices/service';
import { Table, Button, Input} from 'reactstrap';
import BomCreateModal from '../../Modal/ProductionModals/BomCreateModal';
import FirmSwitcher from '../Firms/FirmSwitcher';
import { toast } from 'react-toastify';

function BomPage() {
  const [boms, setBoms] = useState([]);
  const [items, setItems] = useState([]);
  const [bomModal, setBomModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [taxes , setTaxes] = useState([]);
  const [taxId , setTaxId] = useState([]);
  const [ selectedTaxTypes , setSelectedTaxTypes] = useState([]);
  const [filteredBoms, setFilteredBoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const authuser = JSON.parse(localStorage.getItem('authUser')) || {};
  const firmId = authuser?.response?.adminId || '';
  const userRole = authuser?.response?.role || '';
  console.log("userRole", userRole);
  const createdBy = authuser?.response?._id || '';
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [loading, setLoading] = useState(false);
  const trigger = 0;
  const effectiveFirmId = userRole === "client_admin" ? selectedFirmId : firmId;
  // console.log("effectiveFirmId", effectiveFirmId);
  // console.log("estimatedCost", estimatedCost);
  // console.log("sellingPrice", sellingPrice);



  const [formData, setFormData] = useState({
    productName: '',
    rawMaterials: [],
    wastagePercentage: 0,
    firmId: firmId,
    createdBy: createdBy,
    categoryId: '',
    subCategoryId: '',
    vendor: '',
    sellingPrice: 0,
    brand: '',
    qtyType: '',
    taxId: '',
    selectedTaxTypes: [],
    // costPrice: estimatedCost,
  });

  useEffect(() => {
    if (userRole === "client_admin" && !selectedFirmId) return;
    fetchBoms();
}, [trigger, selectedFirmId]);

const fetchBoms = async () => {
    setLoading(true);
    try {
        const result = await getBoms(effectiveFirmId);
        setBoms(result.data || []);
        setFilteredBoms(result.data);
    } catch (err) {
        console.error("Error fetching BOMs:", err);
        // toast.error("Failed to fetch BOMs.");
    }
    setLoading(false);
};


  const fetchItems = async () => {
    try {
      const result = await getInventoryItems();
      // console.log(result.data);
      setItems(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await getItemCategoriesmain(effectiveFirmId);
      const filterOnlyparent = result.data.filter((cat) => cat.parentId === null);
      setCategories(filterOnlyparent);
      // console.log(filterOnlyparent);
      } catch (err) {
      console.error(err);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const result = await getItemSubCategories(categoryId);
      setSubCategories(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchVendors = async () => { 
    try {
      const result = await getVendorsmain(effectiveFirmId);
      setVendors(result.data || []);
      // console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  };
const fetchBrands = async () => {
    try {
      const result = await getBrandsmain(effectiveFirmId);
      setBrands(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  
  const fetchTaxes = async () => {
    try {
      const result = await getTaxes();
      setTaxes(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBoms();
    fetchItems();
    fetchCategories();
    fetchVendors();
    fetchTaxes();
    fetchBrands();
  }, []);

  const toggleBomModal = () => setBomModal(!bomModal);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = boms.filter((bom) =>
      bom.productName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBoms(filtered);
    setCurrentPage(1); 
}

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBoms || [].slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  if (filteredBoms && Array.isArray(filteredBoms)) {
    for (let i = 1; i <= Math.ceil(filteredBoms.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 

  const handleMaterialChange = (materialIndex, field, value) => {
    const materials = [...formData.rawMaterials];
    materials[materialIndex] = { ...materials[materialIndex], [field]: value };
    setFormData({ ...formData, rawMaterials: materials });
    setEstimatedCost(calculateTotalCostPrice());
    setSellingPrice(minimumSellingPrice(estimatedCost));

  };
  
  const handleVariantChange = (materialIndex, variantIndex, field, value) => {
    const materials = [...formData.rawMaterials];
    const variants = [...(materials[materialIndex].variants || [])];
    
    // Add optionLabel dynamically if the field being updated is variantId
    if (field === 'variantId') {
      const selectedMaterial = items.find((item) => item._id === materials[materialIndex].itemId);
      const selectedVariant = selectedMaterial?.variants.find((v) => v._id === value);
      variants[variantIndex] = { 
        ...variants[variantIndex], 
        [field]: value, 
        optionLabel: selectedVariant?.optionLabel || '' 
      };
    } else {
      variants[variantIndex] = { 
        ...variants[variantIndex], 
        [field]: value 
      };
    }
  
    materials[materialIndex].variants = variants;
    setFormData({ ...formData, rawMaterials: materials });
    setEstimatedCost(calculateTotalCostPrice());
    setSellingPrice(minimumSellingPrice(estimatedCost));
  };
  
  const addMaterialField = () => {
    setFormData({
      ...formData,
      rawMaterials: [
        ...formData.rawMaterials,
        { itemId: '', quantity: '', wastePercentage: '', variants: [] },
      ],
    });
  };
  
  const removeMaterialField = (index) => {
    const materials = formData.rawMaterials.filter((_, i) => i !== index);
    setFormData({ ...formData, rawMaterials: materials });
  };
  
  const addVariantField = (materialIndex) => {
    const materials = [...formData.rawMaterials];
    const variants = [...(materials[materialIndex].variants || [])];
    variants.push({ variantId: '', optionLabel: '', quantity: '', wastePercentage: '' });
    materials[materialIndex].variants = variants;
    setFormData({ ...formData, rawMaterials: materials });
  };
  
  const removeVariantField = (materialIndex, variantIndex) => {
    const materials = [...formData.rawMaterials];
    const variants = materials[materialIndex].variants.filter((_, i) => i !== variantIndex);
    materials[materialIndex].variants = variants;
    setFormData({ ...formData, rawMaterials: materials });
  };
  
  

  //calculate the sum of costprice of all the materials
  const calculateTotalCostPrice = () => {
    let totalCost = 0;

    formData.rawMaterials.forEach(material => {
        const selectedMaterial = items.find(item => item._id === material.itemId);
        if (selectedMaterial) {
            let materialCost = selectedMaterial.costPrice;

            if (material.variants?.length > 0) {
                material.variants.forEach(variant => {
                    const selectedVariant = selectedMaterial.variants.find(v => v._id === variant.variantId);
                    if (selectedVariant) {
                        let combinedCost = materialCost + selectedVariant.price;
                        totalCost += combinedCost * variant.quantity;
                    }
                });
            } else {
                totalCost += materialCost * material.quantity;
            }
        }
    });

    return totalCost.toFixed(2);
};


const minimumSellingPrice = (costPrice) => {
  let minimumPrice = 0;
  // without tax 
  minimumPrice = costPrice * 1;
  // console.log("minimumPrice", minimumPrice);
  return minimumPrice.toFixed(2);
};


  const saveBom = async () => {
    console.log('BOM Data:', formData);
     try{
        const result = await createBom(formData);
        console.log(result);
        
        if (result.message==="bom created successfully"){
        fetchBoms();
        setFormData({
          productName: '',
          rawMaterials: [],
          wastagePercentage: 0,
          createdBy: createdBy,
          firmId: firmId,
          categoryId: '',
          subCategoryId: '',
          sellingPrice: 0,
          vendor: '',
          brand: '',
          
        });}
    } 
    catch(err){
        console.error(err);
    }
  

    toggleBomModal();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Production & Inventory" breadcrumbItem="Bill Of Materials" />
        <div className='d-flex gap-2'>
          <Button color="primary" onClick={toggleBomModal} style={{fontSize:"10.5px",lineHeight:"1", minWidth:'105px'}}>
            Add BOM
          </Button>
          {userRole==="client_admin" && (
            <FirmSwitcher
                selectedFirmId={selectedFirmId}
                onSelectFirm={setSelectedFirmId}
            />
                )}
        </div>
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
                  {currentItems.length > 0 ? (
                    currentItems.map((bom, index) => (
                      <tr key={index}>
                        <td>{bom.productName}</td>
                        <td>
                          <div className="d-flex flex-column">
                            {bom.rawMaterials.map((material, idx) => (
                              <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                                <span className="material-name">
                                  {material?.itemId?.name} 
                                </span>
                                <span>
                                  {material.variants.length > 0 ? (
                                    <>
                                      <span className="badge bg-info me-1">
                                        Variant: {material.variants[0].optionLabel} - {material.variants[0].quantity}
                                      </span>
                                      <span className="text-muted">(Total: {material.quantity || material.variants[0].quantity})</span>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">No BOMs available</td>
                    </tr>
                  )}
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
            
            <BomCreateModal
             isOpen={bomModal}
             toggle={toggleBomModal}
             formData={formData}
             setFormData={setFormData}
             saveBom={saveBom}
             handleMaterialChange={handleMaterialChange}
             handleVariantChange={handleVariantChange}
             addMaterialField={addMaterialField}
             removeMaterialField={removeMaterialField}
             addVariantField={addVariantField} 
             removeVariantField={removeVariantField}
             calculateTotalCostPrice={calculateTotalCostPrice}
             categories={categories} 
             subCategories={subCategories}
             vendors={vendors} 
             brands={brands} 
             taxes={taxes}
             taxId={taxId} 
             selectedTaxTypes={selectedTaxTypes}
             items={items} 
             fetchSubCategories={fetchSubCategories}
             fetchBoms={fetchBoms}
             fetchBrands={fetchBrands}
             fetchVendors={fetchVendors}
             fetchTaxes={fetchTaxes}
             fetchItems={fetchItems}
             fetchCategories={fetchCategories}
             minimumSellingPrice={minimumSellingPrice}
             setSellingPrice={setSellingPrice}
             firmId={effectiveFirmId}
/>
      </div>
    </React.Fragment>
  );
}

export default BomPage;
