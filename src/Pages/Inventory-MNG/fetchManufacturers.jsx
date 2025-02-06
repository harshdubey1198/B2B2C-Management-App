import React, { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const FetchManufacturers = ({ firmId, onManufacturersFetched, triggerManufacturer }) => {
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_URL}/Manufacturer/get-Manufacturers/${firmId}`
        );
        onManufacturersFetched(response.data || []);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchManufacturers();
  }, [triggerManufacturer]); 

  return null; 
};

export default FetchManufacturers;
