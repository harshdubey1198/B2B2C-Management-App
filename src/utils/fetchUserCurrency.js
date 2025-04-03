import axios from 'axios';

export const fetchUserCurrency = async () => {
  try {
    const response = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const userCurrency = response.currency.code || { code: 'INR' };
    console.log(userCurrency, "currency");
    localStorage.setItem('planCurrency', JSON.stringify(userCurrency));
    console.log('User Currency:', userCurrency);
    
    return userCurrency;
  } catch (error) {
    console.error('Error fetching user currency:', error);
    return { code: 'INR', symbol: '₹' }; 
  }
};
