import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const addAddress = async ( addressData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADDADDRESS, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ ...addressData }), 
    });

    return data; // returns success message or the added address data
  } catch (error) {
    throw new Error('Address addition failed: ' + error.message);
  }
};
