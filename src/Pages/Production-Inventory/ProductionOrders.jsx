import React from 'react'
import Breadcrumbs from '../../components/Common/Breadcrumb'

function ProductionOrders() {
  return (
    <React.Fragment>
        <div className='page-content'>
            <Breadcrumbs title='Production & Inventory' breadcrumbItem='Production Orders' />
        </div>
    </React.Fragment>
  )
}

export default ProductionOrders