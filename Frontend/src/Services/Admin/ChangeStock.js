import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const changeProductStockAdmin = async (id, inStock) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINCHANGESTOCK(id, inStock), {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    return data; 
  } catch (error) {
    throw new Error('Stock update failed: ' + error.message);
  }
};
