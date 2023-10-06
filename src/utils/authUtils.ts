import axios from './axiosConfig'; // or wherever your axios instance is configured

const logout = async () => {
  try {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('jwt_token');
    
    // Add the JWT token to the request headers
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Call the logout API
    await axios.post('/auth/login/logout', {}, config);

    // Remove the token from local storage
    localStorage.removeItem('jwt_token');

    // You can also clear user-related state here, if any

    // Redirect to the login page or update the UI
    // You can also return true to indicate the operation was successful
    return true;
  } catch (error) {
    console.log('Logout failed:', error);
    return false;
  }
};

export default logout;
