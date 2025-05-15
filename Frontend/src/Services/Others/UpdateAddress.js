import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const updateAddress = async (addressId, addressData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.UPDATEADDRESS, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ addressId, ...addressData }), 
    });

    return data; // returns the updated address data or success message
  } catch (error) {
    throw new Error('Address update failed: ' + error.message);
  }
};
