import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const updatecart = async (cartitems) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.UPDATECART, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(cartitems), 
    });

    return data; 
  } catch (error) {
    throw new Error('Order placement failed: ' + error.message);
  }
};
