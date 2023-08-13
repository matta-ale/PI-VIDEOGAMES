const  isValidReleaseDate = (dateString) => {
    
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!regex.test(dateString)) {
      return false; 
    }
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      year < 1900 || 
      year > 9999 || 
      month < 1 || month > 12 ||
      day < 1 || day > 31
    ) {
      return false; 
    }
    return true; 
  }

  module.exports = isValidReleaseDate;
  