import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';


export const loginAdmin = async (credentials) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINLOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(credentials),
    });

    return data; // Should contain admin info or token
  } catch (error) {
    throw new Error('Admin login failed: ' + error.message);
  }
};