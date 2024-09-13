/**
 * Converts a string to a Date object.
 * If the input string is invalid, it returns null.
 * 
 * @param {string} dateString 
 * @return {Date|null} 
 */
export const convertToDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
      return null;
    }
  
    return date;
  };
  