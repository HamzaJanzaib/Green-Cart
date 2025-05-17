import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const updatecart = async (cartItems) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.UPDATECART, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ cartItems }),
    });

    return data; 
  } catch (error) {
    throw new Error('Cart update failed: ' + error.message);
  }
};
