import React, { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const FetchManufacturers = ({ firmId, onManufacturersFetched }) => {
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_URL}/Manufacturer/get-Manufacturers/${firmId}`
        );
        onManufacturersFetched(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchManufacturers();
  }, []); 

  return null; 
};

export default FetchManufacturers;
