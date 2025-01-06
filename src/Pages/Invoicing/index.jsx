import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Container } from 'reactstrap';
import { getFirmById } from '../../apiServices/service';
import CreateInvoiceTrader from './createInvoiceTrader';
import CreateInvoiceDirect from './createInvoiceDirect';

const Index = () => {
  const [firmDetails, setFirmDetails] = useState(null);

  const fetchFirmDetails = async () => {
    try {
      const response = await getFirmById();
      setFirmDetails(response[0]);
      console.log(response[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFirmDetails();
  }, []);

  const renderInvoiceType = () => {
    if (!firmDetails?.firmSpecified) return null;

    if (firmDetails.firmSpecified.includes('Invoice-Trader')) {
      return <CreateInvoiceTrader />;
    } else if (firmDetails.firmSpecified.includes('Direct-Sales')) {
      return <CreateInvoiceDirect />;
    }
    return null;
  };

  return (
   <>
        {renderInvoiceType()}
    </>
  );
};

export default Index;
