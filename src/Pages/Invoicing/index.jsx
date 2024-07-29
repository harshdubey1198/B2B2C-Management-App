import React from 'react'

function index() {
  // if userrole=clientadmin -{invoicing[create, view, edit, delete], reports}
  // if userrole=firmadmin -{invoicing[create, view, edit, delete], reports, log generation}
  // if userrole=accountant -{invoicing[create, view, edit, delete], reports, log generation}
  // if userrole=generalemployee -{invoicing[view], reports ,log generation{date and time}}



  return (
    <React.Fragment>
        <div className='page-content'>
            hello invoice
        </div>
    </React.Fragment>
  )
}

export default index