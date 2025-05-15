import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const getOrders = async () => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.GETALLORDERS, {
      method: 'GET', 
      credentials: 'include',
    });

    return data;    
  } catch (error) {
    throw new Error('Failed to retrieve orders: ' + error.message);
  }
};
